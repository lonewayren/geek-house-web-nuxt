import Vue from 'vue'
import Router from 'vue-router'
import BookList from './pages/book/List'
import BookDetail from './pages/book/Detail'
import BookIndex from './pages/book/Index'
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
          title: '极客学舍'
        },
        // component: Home,
        redirect: '/book'
      },
      {
        path: '/html/book/:id',
        name: '图书',
        meta: {
          title: '图书列表-极客学舍'
        },
        redirect: '/book/detail/:id'
      },
      {
        path: '/book',
        name: '图书',
        meta: {
          title: '图书列表-极客学舍'
        },
        component: BookIndex,
        redirect: '/book/list',
        children: [
          {
            path: 'list',
            name: '图书列表',
            meta: {
              title: '图书列表-极客学舍'
            },
            component: BookList
          },
          {
            path: 'detail/:id',
            name: '图书详情',
            meta: {
              title: '图书详情-极客学舍'
            },
            component: BookDetail
          }
        ]
      },
      {
        path: '/school',
        name: '校招',
        meta: {
          title: '校招-极客学舍'
        },
        component: SchoolIndex,
        redirect: '/school/list',
        children: [
          {
            path: 'list',
            name: '校招列表',
            meta: {
              title: '校招列表-极客学舍'
            },
            component: SchoolList
          },
          {
            path: 'detail/:id',
            name: '校招详情',
            meta: {
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
          title: '社招-极客学舍'
        },
        component: SocietyIndex,
        redirect: '/society/list',
        children: [
          {
            path: 'list',
            name: '社招列表',
            meta: {
              title: '社招列表-极客学舍'
            },
            component: SocietylList
          },
          {
            path: 'detail/:id',
            name: '社招详情',
            meta: {
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
