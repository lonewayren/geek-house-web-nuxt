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
          <a-form :key="link.id" v-for="(link, index) in links">
            <a-form-item>
              <a-button
                type="primary"
                icon="download"
                @click="gotoDownload(link)"
              >{{ `${index}-${getTypeName(link.type)}` }}</a-button
              >
            </a-form-item>
          </a-form>
        </div>
        <div v-else>
          <a-form :form="form" @submit="fetchBookLink">
            <a-divider type="horizontal" orientation="left">步骤一</a-divider>
            <p>长按关注《极客学舍》</p>
            <img
              src="../../assets/qrcode.jpg"
              alt="welcome"
              style="height: 128px;width: 128px;"
            />
            <a-divider type="horizontal" orientation="left">步骤二</a-divider>
            <p>回复关键字:'验证码'，得到下载码</p>
            <a-divider type="horizontal" orientation="left">步骤三</a-divider>
            <p>填写下载码并提交</p>
            <a-form-item label="下载密钥" :value="bookCode"
            ><a-input
              v-decorator="[
                'code',
                {
                  rules: [{ required: true, message: '请输入验证码!' }]
                }
              ]"
            ></a-input
            ></a-form-item>
            <a-form-item>
              <a-button type="primary" @click="fetchBookLink">
                提交
              </a-button></a-form-item
            >
          </a-form>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
// import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  // components: { AFormItem },
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
      bookCode: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
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
    gotoDownload (link) {
      let withCodeLink
      if (link.type === 'bd') {
        withCodeLink = link.secret
          ? `${link.link}?from=qrcode&passwd=${link.secret}`
          : `${link.link}?from=qrcode`
      } else {
        withCodeLink = link.link
      }
      this.$copyText(link.secret || link.link).then(
        function () {
          let msg =
            '该资源来着互联网网盘搜索引擎,非本站存储上传,涉及版权问题由您自行承担,点击确认视为认同本约定;否则请返回'
          if (link.secret) {
            msg = '下载密码已复制到剪切板\n' + msg
          }
          alert(msg)
          window.open(withCodeLink, '_blank')
        },
        function () {
          alert('复制失败,请重试')
          window.open(withCodeLink, '_blank')
        }
      )
    }
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
