import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_BASE = 'https://jsonmock.hackerrank.com/api/movies/search/';

export default new Vuex.Store({
  state: {
    movies: {
      page: 1,
      per_page: 0,
      total: 0,
    },
    moviesLoading: false,
    favouriteMovies: [],
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_MOVIES_LOADING(state, moviesLoading) {
      state.moviesLoading = moviesLoading;
    },
    SET_FAVOURITE_MOVIES(state, favouriteMovies) {
      state.favouriteMovies = favouriteMovies;
    },
  },
  actions: {
    searchMovies({ commit }, params: { page: number, title: string }) {
      commit('SET_MOVIES_LOADING', true);
      axios.get(API_BASE, { params })
        .then((response) => {
          const favourites: any[] = JSON.parse(localStorage.getItem('favourites') ?? '[]');
          const { data } = response;
          for (let i = 0; i < data.data.length; i += 1) {
            const movie = data.data[i];
            if (favourites.findIndex((item) => item.imdbID === movie.imdbID) !== -1) {
              movie.starred = 1;
            } else {
              movie.starred = 0;
            }
          }
          commit('SET_MOVIES', data);
        })
        .finally(() => {
          commit('SET_MOVIES_LOADING', false);
        });
    },
    starMovie({ commit }, params: { movie: any, star: boolean }) {
      const favourites: any[] = JSON.parse(localStorage.getItem('favourites') ?? '[]');
      const index = favourites.findIndex((item: any) => item.imdbID === params.movie.imdbID);
      if (params.star) {
        if (index === -1) {
          favourites.push(params.movie);
        }
      } else if (index !== -1) {
        favourites.splice(index, 1);
      }
      localStorage.setItem('favourites', JSON.stringify(favourites));
    },
    loadFavouriteMovies({ commit }) {
      const favourites: any[] = JSON.parse(localStorage.getItem('favourites') ?? '[]');
      commit('SET_FAVOURITE_MOVIES', favourites);
    },
  },
  getters: {
    movies: (state: any) => state.movies,
    moviesLoading: (state: any) => state.moviesLoading,
    favouriteMovies: (state: any) => state.favouriteMovies,
  },
});
