import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/utils',
    component: Layout,
    redirect: '/utils/tree',
    name: 'Tree',
    meta: { title: 'Utils', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/utils/tree'),
        meta: { title: 'Tree', icon: 'table' }
      }
    ]
  },

  {
    path: '/hik',
    component: Layout,
    redirect: '/hik/index',
    name: 'Hik',
    meta: { title: '??????', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'font',
        name: 'font',
        component: () => import('@/views/hik/font'),
        meta: { title: 'font', icon: 'table' }
      },
      {
        path: 'index',
        name: 'component',
        component: () => import('@/views/hik/component'),
        meta: { title: 'Hik', icon: 'table' }
      },
      {
        path: 'drag',
        name: 'drag',
        component: () => import('@/views/hik/drag'),
        meta: { title: '????????????', icon: 'table' }
      },
      {
        path: 'g2table',
        name: 'g2table',
        component: () => import('@/views/hik/g2table'),
        meta: { title: 'g2table', icon: 'table' }
      },
      {
        path: 'cache',
        name: 'cache',
        component: () => import('@/views/hik/cache'),
        meta: { title: 'cache', icon: 'table' }
      },
      {
        path: 'color',
        name: 'color',
        component: () => import('@/views/hik/color'),
        meta: { title: 'color', icon: 'table' }
      },
      {
        path: 'fold',
        name: 'fold',
        component: () => import('@/views/hik/fold'),
        meta: { title: 'fold', icon: 'table' }
      },
      {
        path: 'interval',
        name: 'interval',
        component: () => import('@/views/hik/interval'),
        meta: { title: '?????????', icon: 'table' }
      },
      {
        path: 'intervalStack',
        name: 'intervalStack',
        component: () => import('@/views/hik/intervalStack'),
        meta: { title: '???????????????', icon: 'table' }
      },
      {
        path: 'intervalGroup',
        name: 'intervalGroup',
        component: () => import('@/views/hik/intervalGroup/index'),
        meta: { title: '???????????????', icon: 'table' }
      },
      {
        path: 'intervalGroupPlot',
        name: 'intervalGroupPlot',
        component: () => import('@/views/hik/intervalGroupPlot'),
        meta: { title: '???????????????Plot', icon: 'table' }
      },
      {
        path: 'tabHidden',
        name: 'tabHidden',
        component: () => import('@/views/hik/tabHidden'),
        meta: { title: '????????????', icon: 'table' }
      },
      {
        path: 'scroll',
        name: 'scroll',
        component: () => import('@/views/hik/scrollChar'),
        meta: { title: '????????????', icon: 'table' }
      },
      {
        path: 'scroll2',
        name: 'scroll2',
        component: () => import('@/views/hik/scroll2/index'),
        meta: { title: '????????????2', icon: 'table' }
      }
    ]
  },

  {
    path: '/js',
    component: Layout,
    redirect: '/js/event',
    name: 'JS',
    meta: { title: 'JS', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'js',
        name: 'js',
        component: () => import('@/views/js/event'),
        meta: { title: 'js', icon: 'table' }
      },
      {
        path: 'close',
        name: 'close',
        component: () => import('@/views/js/close'),
        meta: { title: '??????????????????', icon: 'table' }
      }
    ]
  },

  {
    path: '/directive',
    component: Layout,
    redirect: '/directive/drag',
    name: 'directive',
    meta: { title: 'directive', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'directive',
        name: 'directive',
        component: () => import('@/views/directive/drag'),
        meta: { title: 'drag', icon: 'table' }
      }
    ]
  },

  {
    path: '/canvas',
    component: Layout,
    redirect: '/canvas/bezierCurves',
    name: 'canvas',
    meta: { title: 'canvas', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'canvas',
        name: 'canvas',
        component: () => import('@/views/canvas/bezierCurves'),
        meta: { title: 'bezierCurves', icon: 'table' }
      }
    ]
  },

  {
    path: '/element',
    component: Layout,
    redirect: '/element/checkbox',
    name: 'element',
    meta: { title: 'element??????', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'checkbox',
        name: 'checkbox',
        component: () => import('@/views/element/checkbox-disabled'),
        meta: { title: 'checkbox', icon: 'table' }
      }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/element/table',
    name: 'element',
    meta: { title: 'table??????', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/table/scroll'),
        meta: { title: 'scroll', icon: 'table' }
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
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
