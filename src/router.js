import FoodList from './components/FoodList.vue'
import Index from './components/index.vue'
import Login from './components/Login.vue'
import DetailOrder from './components/orderDetail.vue'
import Register from './components/Register.vue'
export const routes = [
    { path: '/', name: 'vuetify', component: Login },
    { path: '/register', name: 'Register', component: Register },
    {
        path: '/detail/:id', name: 'DetailOrder', component: DetailOrder, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user', name: 'user', component: Index, children: [
            { path: '', name: 'index', component: FoodList },

        ], meta: {
            requiresAuth: true
        }
    }
]