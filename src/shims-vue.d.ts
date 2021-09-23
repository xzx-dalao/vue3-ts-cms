/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//声明
declare let $store: any
declare let $filters: any
declare module '*.json'
