<template>
  <div class="content">
    <baseTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          type="primary"
          v-if="isCreate"
          size="medium"
          @click="handleNewClick"
        >
          {{ contentTableConfig.newBtnTitle ?? '新建数据' }}</el-button
        >
      </template>
      <template #status="{ row }">
        <el-button
          plain
          size="mini"
          v-if="row.enable"
          :type="row.enable ? 'success' : 'danger'"
        >
          {{ row.enable ? '启用' : '禁用' }}</el-button
        >
        <el-button
          plain
          size="mini"
          v-if="row.status"
          :type="row.status ? 'success' : 'danger'"
        >
          {{ row.status ? '上架' : '下架' }}</el-button
        >
      </template>
      <template #createAt="{ row }">
        <strong>{{ $filters.formatTime(row.createAt) }}</strong>
      </template>
      <template #updateAt="{ row }">
        <strong>{{ $filters.formatTime(row.updateAt) }}</strong>
      </template>
      <template #handler="{ row }">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="{ row }"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="row"></slot>
        </template>
      </template>
    </baseTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import baseTable from '@/components/baseTable'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  components: { baseTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })
    //2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    //4.获取其他的动态插槽的名字
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    //5按钮操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      console.log(item)

      emit('editBtnClick', item)
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
