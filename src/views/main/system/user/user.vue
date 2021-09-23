<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></PageContent>
    <PageModel
      ref="pageModelRef"
      pageName="users"
      :defaultInfo="defaultInfo"
      :modelConfig="modalConfigRef"
    ></PageModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent, PageModel },
  setup() {
    // const userCount = computed(() => store.state.system.userCount)
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    //动态添加角色和部门列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modelConfig
    })
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel(newCallback, editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      defaultInfo,
      pageModelRef,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
