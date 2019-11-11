<template>
  <a-card>
    <a-list
      :grid="{ gutter: 16, xs: 2, sm: 2, md: 4, lg: 6, xl: 6, xxl: 8 }"
      :data-source="movieList"
      :pagination="{
        simple: true,
        onChange: changePage,
        showQuickJumper: true,
        pageSize: pageSize,
        current: currentPage,
        total: movieListTotal
      }"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card
          hoverable
          :key="index"
          :loading="loading"
          @click="getMovieDetail(item)"
          :body-style="{
            padding: '5px',
            height: '120px',
            background: '#ffffff00'
          }"
        >
          <div slot="cover" style="text-align:center">
            <img
              :alt="item.title"
              :src="attachImageUrl(item.cover)"
              style="height:180px;width: 90%;padding-top: 10px"
            />
          </div>
          <template class="ant-card-actions" slot="actions" style="text-align: center">
            <div>
              <div>
                <a-tag >{{item.age}}</a-tag>
                <a-tag >{{item.category[0]['name']}}</a-tag>
              </div>
              <div>
                <a-rate :value="item.score/2" allowHalf disabled style="fontSize: 10px"/>
              </div>
            </div>
          </template>
          <a-card-meta style="padding: 0px;margin: 0px">
            <p
              slot="title"
              :title="item.title"
              style="font-size: 14px;color: #00a67c;margin-bottom: 0;;white-space: normal;
                  border-bottom: #afa991 dashed 1px;
                  height: 25px;
                  text-align: center;
                  overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"
            >
              {{ item.title }}
            </p>
            <p
              slot="description"
              :title="item.description"
              style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;text-indent: 2em"
            >
              {{ item.description }}
            </p>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>
export default {
  components: {},
  name: 'MovieList',
  data() {
    return {
      movieList: [],
      movieListTotal: 0,
      loading: false,
      pageSize: 24
    };
  },
  mounted() {
    this.fetchmovieList({ ...this.$route.query, size: this.pageSize });
  },
  head () {
    return {
      title: this.$route.meta.title,
      meta: [
      ]
    }
  },
  computed: {
    currentPage() {
      return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.loading = true;
        this.fetchmovieList({ ...this.$route.query, size: this.pageSize });
        this.loading = false;
      },
      deep: true
    }
  },
  methods: {
    // 图片防盗链问题解决
    attachImageUrl(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\//g,
          'https://images.weserv.nl/?url='
        );
      }
    },
    changePage(page) {
      this.$router.push({ query: { ...this.$route.query, page: page } });
    },
    fetchmovieList(kwargs) {
      this.$axios({
        url: '/api/movie',
        methods: 'get',
        params: kwargs
      }).then(result => {
        const { count, results } = result;
        this.movieList = results;
        this.movieListTotal = count;
      });
    },
    getMovieDetail(item) {
      this.$router.push({name: '电影详情', params: {id: item.id}});
    }
  }
};
</script>

<style scoped></style>
