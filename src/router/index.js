import Vue from 'vue'
import Router from 'vue-router'
const Login = (r) => require(['@/components/Login'], r)
const Signup = (r) => require(['@/components/Signup'], r)
const Dashboard = (r) => require(['@/components/Dashboard'], r)
const Home = (r) => require(['@/components/Home'], r)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]
    }
  ]
})
