<template>
  <div class="goods">
    <PageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="{ row }">
        <el-image
          style="width: 60px; height: 60px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="{ row }">{{ '¥' + row.oldPrice }}</template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
