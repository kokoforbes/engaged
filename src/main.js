import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor'

Vue.use(RichTextEditorPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
