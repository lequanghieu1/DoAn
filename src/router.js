import ProductList from './components/ProductList.vue'
import Index from './components/index.vue'
import Login from './components/Login.vue'
import DetailOrder from './components/orderDetail.vue'
import Register from './components/Register.vue'
import Admin from './components/Admin.vue'
import Page404 from './components/404.vue'
export const routes = [
    { path: '/', name: 'vuetify', component: Login },
    { path: '/register', name: 'Register', component: Register },
    {
        path: '/admin', name: 'admin', component: Admin, meta: {
            requiresAuth: true, auth: 'admin'

        }
    },
    {
        path: '/detail/:id', name: 'DetailOrder', component: DetailOrder, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user', name: 'user', component: Index, children: [
            { path: '', name: 'index', component: ProductList },

        ], meta: {
            requiresAuth: true, auth: 'user'
        }
    },
    {
        path: '/*', name: 'Page404', component: Page404
    },

]