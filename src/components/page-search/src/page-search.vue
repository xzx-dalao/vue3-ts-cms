<template>
  <div class="page-search">
    <div class="search">
      <baseForm v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h2>高级检索</h2>
        </template>
        <template #footer>
          <div class="btns">
            <el-button icon="el-icon-refresh" @click="handleResetClick"
              >重置</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleQueryClick"
              >搜索</el-button
            >
          </div>
        </template>
      </baseForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import baseForm from '@/components/baseForm'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    baseForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const handleResetClick = () => {
      //formData.value = formOriginData
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style scoped lang="less">
.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
