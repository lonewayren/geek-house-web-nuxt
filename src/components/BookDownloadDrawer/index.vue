<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      class="download-drawer"
      width="200px"
    >
      <template v-slot:handle>
        <div class="setting-drawer-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'download'"></a-icon>
        </div>
      </template>
      <div>
        <div v-if="links.length">
          <div :key="link.id" v-for="(link, index) in links">
                <a-button
                  @click="showConfirm"
                  type="primary"
                  size="large"
                >{{ getButtonText(link) }}
                </a-button>
                <a-modal
                  title="声明"
                  :visible="confirmVisible"
                  :confirmLoading="confirmLoading"
                  @ok="confirmOk(link)"
                  @cancel="confirmCancel"
                  okText="继续"
                  cancelText="返回"
                >
                  <p>{{confirmMsg}}</p>
                </a-modal>
          </div>
        </div>
        <div v-else>
          <a-form :form="form" @submit="fetchBookLink">
            <a-divider type="horizontal" orientation="left">步骤一</a-divider>
            <p>微信关注《极客学舍》</p>
            <img
              src="../../assets/qrcode.jpg"
              alt="welcome"
              style="height: 128px;width: 128px;"
            />
            <a-divider type="horizontal" orientation="left">步骤二</a-divider>
            <p>回复关键字: <b>验证码</b>，得到六位数字验证码</p>
            <a-divider type="horizontal" orientation="left">步骤三</a-divider>
            <p>填写验证码并提交</p>
            <a-form-item :value="bookCode"
            ><a-input-search
              placeholder="填写验证码"
              @search="fetchBookLink"
              size="small"
              style="width: 150px"
              v-decorator="[
                'code', {
                  rules: [{ required: true, message: '请输入微信得到的验证码!' }]
                }
              ]">
                <a-button
                  slot="enterButton"
                  type="primary"
                >提交</a-button>
              </a-input-search>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: {
    links: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      visible: false,
      confirmVisible: false,
      confirmLoading: false,
      confirmMsg: '该资源来着互联网网盘搜索引擎,非本站存储上传,涉及版权问题由您自行承担,点击继续视为认同本约定;否则请返回',
      bookCode: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    showConfirm () {
      this.confirmVisible = true
    },
    confirmCancel () {
      this.confirmVisible = false
    },
    confirmOk (link) {
      this.confirmLoading = true
      let withCodeLink
      if (link.type === 'bd') {
        withCodeLink = link.secret
          ? `${link.link}?from=qrcode&passwd=${link.secret}`
          : `${link.link}?from=qrcode`
      } else {
        withCodeLink = link.link
      }
      this.confirmLoading = false
      this.confirmVisible = false
      this.$copyText(link.secret || link.link).then(
        () => {
          if (link.secret) {
            let tip_msg = this.getTypeName(link.type)+'密码【'+link.secret+'】已复制,可直接粘贴'
            this.$confirm({
              title: '提示',
              content: tip_msg,
              okText:'知道了',
              okType: 'danger',
              cancelText: '没看见',
              onOk: () => {
                window.open(withCodeLink, '_blank')
              }
            })
          } else {
            window.open(withCodeLink, '_blank')
          }
        },
        () => {
          if (link.secret) {
            let tip_msg = this.getTypeName(link.type) + '下载密码【' + link.secret + '】复制失败,请手动填写'
            this.$confirm({
              title: '提示',
              content: tip_msg,
              okText: '知道了',
              okType: 'primary',
              cancelText: '没看见',
              onOk: () => {
                window.open(withCodeLink, '_blank')
              }
            })
          } else {
            window.open(withCodeLink, '_blank')
          }
        }
      )
    },
    onClose () {
      this.visible = false
    },
    fetchBookLink () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$router.push({ query: { ...this.$route.query, ...values } })
        }
      })
    },
    getButtonText (link) {
      return link.secret ? this.getTypeName(link.type) + ' 密码'+link.secret : this.getTypeName(link.type)
    },
    getTypeName (type) {
      let name
      if (type === 'bd') {
        name = '百度网盘'
      } else if (type === 'wy') {
        name = '腾讯微云'
      } else if (type === 'ty') {
        name = '天翼网盘'
      }
      return name
    },
  }
}
</script>
<style lang="less" >
@import "~ant-design-vue/lib/style/themes/default.less";

.setting-drawer-handle {
  position: absolute;
  top: 65vh;
  right: 200px;
  width: 48px;
  height: 48px;
  background: @primary-color;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
