<template>
  <div class="department">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="department"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></PageContent>
    <PageModel
      ref="pageModelRef"
      pageName="department"
      :defaultInfo="defaultInfo"
      :modelConfig="modalConfigRef"
    ></PageModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // modal配置信息
    const store = useStore()
    const modalConfigRef = computed(() => {
      const parentIdItem = modelConfig.formItems.find(
        (item) => item.field === 'parentId'
      )
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modelConfig
    })

    // 处理modal的hook
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel()

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      defaultInfo,
      pageModelRef,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
