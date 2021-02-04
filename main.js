import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//引入全局组件（这里引用，文档里全部可以使用）
// 分割线
import divider from './components/common/divider.vue'
Vue.component('divider', divider)
// 无内容
import noThing from './components/common/no-thing.vue'
Vue.component('no-thing', noThing)


//引入js
import $C from './common/config.js'
Vue.prototype.$C = $C

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
