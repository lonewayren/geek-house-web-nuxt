import Vue from 'vue'
import { notification } from 'ant-design-vue'
notification.config({duration: 2})

Vue.prototype.$notification = notification
Vue.use(notification)
export default notification
