<template>
  <a-layout>
    <a-layout-header class="header">
      <img class="logo" src="../assets/logo.svg" alt="" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :selected-keys="selectKeys"
        @click="switchMenu"
        class="header-menu"
      >
        <a-menu-item key="book">
          <icon-font title="icon-ebook" type="icon-ebook" style="font-size: 20px"></icon-font>
          书籍
        </a-menu-item>
        <a-menu-item key="movie">
          <icon-font title="icon-movie" type="icon-movie" style="font-size: 20px"></icon-font>
          电影
        </a-menu-item>
        <a-menu-item key="school">
          <icon-font title="icon-school" type="icon-school" style="font-size: 20px"></icon-font>
          招聘
        </a-menu-item>
<!--        <a-menu-item key="society">-->
<!--          <icon-font title="icon-society" type="icon-society" style="font-size: 20px"></icon-font>-->
<!--          社招-->
<!--        </a-menu-item>-->
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script>
export default {
  name: 'Header',
  data() {
    const collapsed = false;
    return { collapsed };
  },
  computed: {
    selectKeys() {
      if (this.$route.matched.length) {
        const key = this.$route.matched[0].path.split('/')[1];
        return [key];
      }
      return [];
    }
  },
  methods: {
    switchMenu({ keyPath }) {
      let route = keyPath.join('/');
      if (route === 'blog') {
        route = 'http://blog.loneway.ren/blog/';
        window.location.href = route;
      } else {
        this.$router.push('/' + route);
      }
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style scoped>
.header {
  height: 20vh;
  background: #707055 url('../assets/banner.webp');
  background-repeat: no-repeat;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  padding: 10px;
  width: 100%;
  line-height: 55px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header-menu {
  background: rgba(208, 185, 185, 0.19);
  font-weight: 900;
}
.logo {
  vertical-align: top;
  width: 100vw;
  max-width: 500px;
  height: 10vh;
}
</style>
