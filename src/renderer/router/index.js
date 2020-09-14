import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import store from '../store'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/main',
    component: Layout,
    children: [
      {
        path: 'home',
        id: 200,
        name: '首页',
        component: () => import('@/views/main/home'),
        meta: { title: '首页', icon: '首页_active' }
      }
    ]
  },
  {
    path: '/pegasus',
    component: Layout,
    children: [
      {
        path: 'channel',
        id: 201,
        name: '频道',
        component: () => import('@/views/pegasus/channel'),
        meta: { title: '频道', icon: '频道_active' }
      }
    ]
  },
  {
    path: '/following',
    component: Layout,
    children: [
      {
        path: 'pegasus',
        id: 202,
        name: '动态',
        component: () => import('@/views/following/channel'),
        meta: { title: '动态', icon: '动态_active' }
      }
    ]
  },
  {
    path: '/mall',
    component: Layout,
    children: [
      {
        path: 'home-main',
        id: 297,
        name: '会员购',
        component: () => import('@/views/mall/home-main'),
        meta: { title: '会员购', icon: '会员购_active' }
      }
    ]
  },
  {
    path: '/user_center',
    component: Layout,
    children: [
      {
        path: 'mine',
        id: 420,
        name: '我的',
        component: () => import('@/views/user_center/mine'),
        meta: { title: '我的', icon: '我的_active' }
      }
    ]
  },
  //
  // {
  //   path: '/main',
  //   component: Layout,
  //   name: 'UserMain',
  //   meta: { title: '主页', icon: '我的_active' },
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'main-home',
  //       component: () => import('@/views/main/home'),
  //       meta: { title: 'home', icon: 'home' }
  //     },
  //     {
  //       path: 'main',
  //       name: 'main-main',
  //       component: () => import('@/views/main/main'),
  //       meta: { title: 'main', icon: 'main' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加了动态菜单
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  if (router.options.isAddDynamicMenuRoutes) {
    // 已经加载过动态菜单
    next()
  } else {
    // 未加载动态菜单
    router.options.isAddDynamicMenuRoutes = true
    store.dispatch('GetTab').then(res => {
      if (res.bottom.length > 4) {
        // 动态插入
        // const addRoutes = []
        // console.log(addRoutes, '这里先执行?')
        // res.bottom.forEach(item => {
        //   const path = item.uri.replace('bilibili:/', '')
        //   const slice = `views${path.slice(0, path.length - 1)}`
        //   const pathItem = path.split('/').filter(s => s && s.trim())
        //   let componentRequire = import(`@/${slice}.vue`)
        //   if (slice === 'views/main/home') {
        //     componentRequire = import('@/views/main/home')
        //     console.log('没进来？？？')
        //   }
        //   const route = {
        //     path: `/${pathItem[0]}`,
        //     component: Layout,
        //     children: [
        //       {
        //         path: pathItem[1],
        //         name: item.name,
        //         component: componentRequire,
        //         meta: { title: item.name, icon: `${item.name}_active` }
        //       }
        //     ]
        //   }
        //   constantRouterMap.push(route)
        //   router.routes = (constantRouterMap)
        //   console.log(constantRouterMap, '我就不信了')
        // })
      }
    }).then(_ => next())
  }
})

export default router

