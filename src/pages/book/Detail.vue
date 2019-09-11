<template>
  <div class="style-detail">
    <div>
      <BookDownloadDrawer :links="book.links" />
      <a-card
        hoverable
        key="qrcode"
        style="border-radius: 8px"
        :body-style="{ padding: '5px', background: '#ffffff00', 'text-align': 'center' }"
      >
        <h2 class="style-h3">{{ book.title }}</h2>
        <br />
        <img :src="attachImageUrl(book.cover)" class="style-cover" />
        <a-divider dashed orientation="left">内容简介</a-divider>
        <p class="style-p">{{ book.description }}</p>
      </a-card>
    </div>
  </div>
</template>

<script>
import BookDownloadDrawer from '../../components/BookDownloadDrawer';
export default {
  name: 'BookDetail',
  components: {
    BookDownloadDrawer
  },
  data() {
    const book = {
      cover: '',
      title: '',
      links: '',
      description: '',
    };
    return {
      book
    };
  },
  asyncData(context) {
    return context.$axios({
      url: `/api/e-book/${context.params.id}`,
      methods: 'get',
      params: context.query
    }).then(response => {
      return {book: response}
    });
  },
  head () {
    return {
      title: this.book.title ? this.book.title + '-' + this.$route.meta.title: this.$route.meta.title,
      meta: [
        { hid: 'description', name: 'description', content: this.book.description }
      ]
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.fetchBookDetail(this.$route.params.id, this.$route.query);
      },
      deep: true
    }
  },
  methods: {
    fetchBookDetail(id, kwargs) {
      this.$axios({
        url: `/api/e-book/${id}`,
        methods: 'get',
        params: kwargs
      }).then(response => {
        this.book = response;
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
  width: 40%;
  height: 40%;
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
