/**
 * Created by XD on 2017/3/8.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const movielist = resolve => {
    require.ensure(['./components/movieList.vue'], () => {
        resolve(require('./components/movieList.vue'))
    })
}
const movieDetail = resolve => {
    require.ensure(['./components/movieDetail.vue'], () => {
        resolve(require('./components/movieDetail.vue'))
    })
}
export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'movielist',
            component: movielist
        },
        {
            path: '/moviedetail/:id',
            name: 'moviedetail',
            component: movieDetail
        }
    ]
});
