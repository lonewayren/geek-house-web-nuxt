import Vue from 'vue'
import Router from 'vue-router'
import BookList from './pages/book/List'
import BookDetail from './pages/book/Detail'
import BookIndex from './pages/book/Index'
import MovieList from './pages/movie/List'
import MovieDetail from './pages/movie/Detail'
import MovieIndex from './pages/book/Index'
import SchoolList from './pages/school/List'
import SchoolDetail from './pages/school/Detail'
import SchoolIndex from './pages/school/Index'
import SocietylList from './pages/society/List'
import SocietyDetail from './pages/society/Detail'
import SocietyIndex from './pages/society/Index'
Vue.use(Router)

export function createRouter () {
  let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: '首页',
        meta: {
          bread: '首页',
          title: '极客学舍'
        },
        // component: Home,
        redirect: '/book'
      },
      {
        path: '/book',
        name: '图书',
        meta: {
          bread: '图书',
          title: '图书列表-极客学舍'
        },
        component: BookIndex,
        redirect: '/book/list',
        children: [
          {
            path: 'list',
            name: '图书列表',
            meta: {
              bread: '列表',
              title: '图书列表-极客学舍'
            },
            component: BookList
          },
          {
            path: 'detail/:id',
            name: '图书详情',
            meta: {
              bread: '详情',
              title: '图书详情-极客学舍'
            },
            component: BookDetail
          }
        ]
      },
      {
        path: '/html/book/:id',
        name: '图书详情',
        meta: {
          bread: '详情',
          title: '图书详情-极客学舍'
        },
        component: BookDetail
      },
      {
        path: '/movie',
        name: '电影',
        meta: {
          bread: '电影',
          title: '电影列表-极客学舍'
        },
        component: MovieIndex,
        redirect: '/movie/list',
        children: [
          {
            path: 'list',
            name: '电影列表',
            meta: {
              bread: '列表',
              title: '电影列表-极客学舍'
            },
            component: MovieList
          },
          {
            path: 'detail/:id',
            name: '电影详情',
            meta: {
              bread: '详情',
              title: '电影详情-极客学舍'
            },
            component: MovieDetail
          }
        ]
      },
      {
        path: '/school',
        name: '校招',
        meta: {
          bread: '校招',
          title: '校招-极客学舍'
        },
        component: SchoolIndex,
        redirect: '/school/list',
        children: [
          {
            path: 'list',
            name: '校招列表',
            meta: {
              bread: '招聘',
              title: '校招列表-极客学舍'
            },
            component: SchoolList
          },
          {
            path: 'detail/:id',
            name: '校招详情',
            meta: {
              bread: '详情',
              title: '校招详情-极客学舍'
            },
            component: SchoolDetail
          }
        ]
      },
      {
        path: '/society',
        name: '社招',
        meta: {
          bread: '社招',
          title: '社招-极客学舍'
        },
        component: SocietyIndex,
        redirect: '/society/list',
        children: [
          {
            path: 'list',
            name: '社招列表',
            meta: {
              bread: '列表',
              title: '社招列表-极客学舍'
            },
            component: SocietylList
          },
          {
            path: 'detail/:id',
            name: '社招详情',
            meta: {
              bread: '详情',
              title: '社招详情-极客学舍'
            },
            component: SocietyDetail
          }
        ]
      }
    ]
  })

  return router
}
