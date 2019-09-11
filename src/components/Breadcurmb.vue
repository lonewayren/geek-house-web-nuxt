<template>
  <client-only>
    <div>
      <a-row>
        <a-col :span="12">
          <a-breadcrumb :routes="routes">
            <template slot="itemRender" slot-scope="{ route }">
            <span v-if="routes.indexOf(route) === routes.length - 1">
              {{ route.name }}
            </span>
              <router-link v-else :to="route.path">
                {{ route.name }}
              </router-link>
            </template>
          </a-breadcrumb>
        </a-col>
        <a-col v-if="this.$route.path.startsWith('/book')" :span="12">
          <a-input-search
            placeholder="搜索想看的书"
            @search="onSearch"
            enter-button="查找"
            size="small"
          ></a-input-search>
        </a-col>
      </a-row>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Breadcurmb',
  data() {
    return {
      searchValue: ''
    };
  },
  computed: {
    routes() {
      let BreadcurmbList = [{ name: '首页', path: '/' }];
      this.$route.matched.forEach(function(item) {
        if (item.path !== '') {
          BreadcurmbList.push({
            name: item.name,
            path: item.path
          });
        }
      });
      return BreadcurmbList;
    }
  },
  methods: {
    onSearch(value) {
      this.$router.push({ path: '/book', query: { search: value } });
    }
  }
};
</script>

<style scoped></style>
