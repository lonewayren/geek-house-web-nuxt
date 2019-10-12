import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import {
  Icon,
  Button,
  Input,
  Modal,
  message,
  Popconfirm,
  Drawer,
  Menu,
  Col,
  Row,
  List,
  Layout,
  Card,
  BackTop,
  Breadcrumb,
  Badge,
  Divider,
  Form
} from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1232880_rtic4lfgpm.js'
})

Vue.component('icon-font', IconFont)
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(Button)
Vue.use(Input)
Vue.use(Drawer)
Vue.use(Menu)
Vue.use(Col)
Vue.use(Row)
Vue.use(List)
Vue.use(Layout)
Vue.use(Card)
Vue.use(BackTop)
Vue.use(Breadcrumb)
Vue.use(Badge)
Vue.use(Divider)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Popconfirm)
Vue.use(Modal)
Vue.use(message)

Vue.prototype.$confirm = Modal.confirm
