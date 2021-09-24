<template>
  <div class="dashboard">
    <!-- 1.顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <StatisticalPanel :panelData="item"></StatisticalPanel>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :md="8" :lg="6" :xl="6">
        <contentCard title="分类商品数量(饼图)">
          <PieEchart :pieData="categoryGoodsCount"></PieEchart>
        </contentCard>
      </el-col>
      <el-col :md="8" :lg="12" :xl="12">
        <contentCard title="不同城市商品销量">
          <MapEchart :mapData="addressGoodsSale"></MapEchart>
        </contentCard>
      </el-col>
      <el-col :md="8" :lg="6" :xl="6">
        <contentCard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="categoryGoodsCount"></RoseEchart>
        </contentCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :md="12" :lg="12" :xl="12">
        <contentCard title="分类商品的销量">
          <LineEchart v-bind="categoryGoodsSale"></LineEchart>
        </contentCard>
      </el-col>
      <el-col :md="12" :lg="12" :xl="12">
        <contentCard title="分类商品的收藏">
          <BarEchart v-bind="categoryGoodsFavor"></BarEchart>
        </contentCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import contentCard from '@/components/card'
import {
  PieEchart,
  RoseEchart,
  MapEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts'
import StatisticalPanel from '@/components/statistical-panel'
export default defineComponent({
  name: 'dashboard',
  components: {
    contentCard,
    RoseEchart,
    PieEchart,
    MapEchart,
    LineEchart,
    BarEchart,
    StatisticalPanel
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    // 获取数据
    const topPanelData = computed(() => store.state.dashboard.topPanelDatas)
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;
  .content-row {
    margin-top: 20px;
  }
}
</style>
