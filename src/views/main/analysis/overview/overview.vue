<template>
  <div class="overview">
    <contentCard title="关于">
      <div class="c-left">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、VueCli、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </contentCard>
    <contentCard title="技术栈" class="row">
      <TextLink :text-arrs="technologyStacks" />
    </contentCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import contentCard from '@/components/card'
import TextLink from '@/components/link'
import { technologyStacks } from './config/technologyStacks'
export default defineComponent({
  components: { contentCard, TextLink },
  name: 'overview',
  setup() {
    return { technologyStacks }
  }
})
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
