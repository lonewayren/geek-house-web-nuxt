<template>
  <div class="style-detail">
    <div>
      <BookDownloadDrawer :links="movie.links" source-type="movie"/>
        <a-card
          hoverable
          key="qrcode"
          style="border-radius: 8px"
          :body-style="{ padding: '5px', background: '#ffffff00', 'text-align': 'center' }"
        >
          <div>
            <h2 class="style-h3">{{ movie.title }}</h2>
            <a-row type="flex" justify="start">
              <a-col span="14">
                <img :src="attachImageUrl(movie.cover)" class="style-cover" />
              </a-col>
              <a-col span="10">
                <a-row>
                  <a-col span="6" align="right">
                    <p>语言: </p>
                  </a-col>
                  <a-col span="17" offset="1" align="left">
                    {{movie.language}}
                  </a-col>
                </a-row>
                <a-row>
                  <a-col span="6" align="right">
                    <p>地区: </p>
                  </a-col>
                  <a-col span="17" offset="1" align="left">
                    {{movie.area}}
                  </a-col>
                </a-row>
                <a-row>
                  <a-col span="6" align="right">
                    <p>年代: </p>
                  </a-col>
                  <a-col span="17" offset="1" align="left">
                    {{movie.age}}
                  </a-col>
                </a-row>
                <a-row>
                  <a-col span="6" align="right">
                    <p>导演: </p>
                  </a-col>
                  <a-col span="17" offset="1" align="left">
                    {{movie.star}}
                  </a-col>
                </a-row>
                <a-row>
                  <a-col span="6" align="right">
                    <p>上映: </p>
                  </a-col>
                  <a-col span="17" offset="1" align="left">
                    {{movie.online_date}}
                  </a-col>
                </a-row>
                <a-row>
                  <a-col span="6" align="right">
                    <p>短评: </p>
                  </a-col>
                  <a-col span="17" offset="1" align="left">
                    <span >
                     <a :href="movie.comments">
                       <a-icon type="message" />
                     </a>
                    </span>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
            <a-row>
              <br />
              <a-divider dashed orientation="left">内容简介</a-divider>
              <p class="style-p">{{ movie.description }}</p>
            </a-row>
          </div>
        </a-card>
    </div>
  </div>
</template>

<script>
import BookDownloadDrawer from '../../components/BookDownloadDrawer';
export default {
  name: 'MovieDetail',
  components: {
    BookDownloadDrawer
  },
  data() {
    const movie = {
      cover: '',
      title: '',
      star: '',
      language: '',
      age: '',
      area: '',
      score: 0,
      online_date: '',
      comments: '',
      category: [],
      links: '',
      description: '',
    };
    const formItemLayout = {
      labelCol: { span: 1 },
      wrapperCol: { span: 1,offset:0 },
    };
    return {
      movie
    };
  },
  asyncData(context) {
    return context.$axios({
      url: `/api/movie/${context.params.id}`,
      methods: 'get',
      params: context.query
    }).then(response => {
      return {movie: response}
    });
  },
  head () {
    return {
      title: this.movie.title ? this.movie.title + '-' + this.$route.meta.title: this.$route.meta.title,
      meta: [
        { hid: 'description', name: 'description', content: this.movie.description }
      ]
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.fetchMovieDetail(this.$route.params.id, this.$route.query);
      },
      deep: true
    }
  },
  methods: {
    fetchMovieDetail(id, kwargs) {
      this.$axios({
        url: `/api/movie/${id}`,
        methods: 'get',
        params: kwargs
      }).then(response => {
        this.movie = response;
      });
    },
    attachImageUrl(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\//g,
          'https://images.weserv.nl/?url='
        );
      }
    }
  }
};
</script>

<style scoped>
.style-detail {
  /*padding: 10px 0px 10px 20px;*/
}
.style-h3 {
  padding: 20px;
  text-align: left;
}
.style-cover {
  min-width: 10rem;
  min-height: 13rem;
  width: 30%;
  height: 30%;
}
.style-p {
  padding: 0px 20px;
  text-indent: 2em;
  text-align: left;
}
.style-buttonCard {
  margin-top: 10px;
}
.style-qrcode {
  padding: 0 10px;
  margin-top: 10px;
}
</style>
