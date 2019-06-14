import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import login from '../components/pages/login'
import index from '../components/pages/index'
import adminParent from '../components/pages/adminParent'
import adminlist from '../components/pages/adminlist'
import admincreate from '../components/pages/admincreate'
import userlist from '../components/pages/userlist'
import userParent from '../components/pages/userParent'
import usercreate from '../components/pages/usercreate'
import inform from '../components/pages/inform'
import informParent from '../components/pages/informParent'
import informcreate from '../components/pages/informcreate'
import device from '../components/pages/device'
import deviceParent from '../components/pages/deviceParent'
import devicecreate from '../components/pages/devicecreate'
import welcome from '../components/common/welcome'
export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path:'',
          component:welcome
        },
        {
          path:'',
          redirect:'welcome'
        },
        // 二级路由管理员管理 
        {
          path: 'adminParent',
          component: adminParent,
          children: [
            {
              path: '',
              component: adminlist,
              name: '管理员列表页'
            },
            {
              path: 'admincreate/:id',
              component: admincreate,
              name: '添加/修改管理员'
            },
          ]
        },


        // 二级路由用户管理
        {
          path: 'userParent',
          component: userParent,
          children: [
            {
              path: '',
              component: userlist,
              name: '用户列表页'
            },
            {
              path: 'usercreate/:id',
              component: usercreate,
              name: "添加/修改用户"
            },
          ]
        },
        // 二级路由通知
        {
          path: 'informParent',
          component: informParent,
          children: [
            {
              path: '',
              component: inform,
              name: '通知列表页'
            },
            {
              path: 'informcreate/:id',
              component: informcreate,
              name: '添加/修改通知'
            }
          ]
        },
        // 二级路由设备管理
        
        {
          path: 'deviceParent',
          component: deviceParent,
          children: [
            {
              path: '',
              component: device,
              name: '设备列表页'
            },
            {
              path: 'devicecreate/:id',
              component: devicecreate,
              name: '添加/修改设备'
            }
          ]
        },
      ]
    },
    {
      path: "*",
      redirect: '/login'
    }
  ]
})
