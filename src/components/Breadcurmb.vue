<template>
  <client-only>
    <div>
      <a-row>
        <a-col :span="12">
          <a-breadcrumb :routes="routes">
            <template slot="itemRender" slot-scope="{ route }">
            <span v-if="routes.indexOf(route) === routes.length - 1">
              {{ route.bread }}
            </span>
              <router-link v-else :to="route.path">
                {{ route.bread }}
              </router-link>
            </template>
          </a-breadcrumb>
        </a-col>
        <a-col v-if="this.show_search" :span="12">
          <a-input-search
            :placeholder="this.searchPlaceholder"
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
      searchPlaceholder: '',
      searchSource: '',
      searchValue: ''
    };
  },
  computed: {
    show_search() {
      if (this.$route.path.startsWith('/book')) {
        this.searchPlaceholder = '搜索想看的书'
        this.searchSource = 'book'
        return true
      } else if (this.$route.path.startsWith('/movie')) {
        this.searchPlaceholder = '搜索想看的电影'
        this.searchSource = 'movie'
        return true
      } else {
        this.searchPlaceholder = ''
        this.searchSource = ''
        return false
      }
    },
    routes() {
      let BreadcurmbList = [{ name: '首页', bread: '首页', path: '/' }];
      this.$route.matched.forEach(function(item) {
        if (item.path !== '') {
          BreadcurmbList.push({
            name: item.name,
            bread: item.meta.bread,
            path: item.path
          });
        }
      });
      return BreadcurmbList;
    }
  },
  methods: {
    onSearch(value) {
      this.$router.push({ path: '/'+this.searchSource, query: { search: value } });
    }
  }
};
</script>

<style scoped></style>
