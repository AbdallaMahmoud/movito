import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Movies from '@/views/Movies.vue';
import BrowseMovies from '@/components/BrowseMovies.vue';
import FavouriteMovies from '@/components/FavouriteMovies.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Movies',
    component: Movies,
    redirect: '/browse',
    children: [
      {
        path: '/browse',
        name: 'Browse Movies',
        component: BrowseMovies,
      },
      {
        path: '/favourites',
        name: 'Favourite Movies',
        component: FavouriteMovies,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
