<template>
  <v-container>
    <h2>Browse Amazing Movie!</h2>
    <v-tabs :value="$route.path">
      <v-tab href="/browse">Browse</v-tab>
      <v-tab href="/favourites">Favourites</v-tab>
    </v-tabs>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    user: {
    },
  },
  setup(props, { root }) {
    const movies = computed(() => root.$store.getters.movies);
    const favouriteMovies = computed(() => root.$store.getters.favouriteMovies);
    const moviesLoading = computed(() => root.$store.getters.moviesLoading);
    const searchKeywords = ref('');
    const searchedKeywords = ref('');

    const options = computed(() => ({
      page: movies.value.page,
      itemsPerPage: movies.value.per_page,
    }));

    const searchMovies = (params: any) => {
      root.$store.dispatch('searchMovies', params);
    };

    const starMovie = (params: any) => {
      root.$store.dispatch('starMovie', params);
    };

    const loadFavouriteMovies = () => {
      root.$store.dispatch('loadFavouriteMovies');
    };

    const updateOptions = (newOptions: any) => {
      searchMovies({
        page: newOptions.page,
        Title: searchKeywords.value,
      });
    };

    const search = () => {
      searchedKeywords.value = searchKeywords.value;
      searchMovies({
        page: options.value.page,
        Title: searchKeywords.value,
      });
    };

    const star = (movie: any) => {
      starMovie({
        movie,
        star: !!movie.starred,
      });
    };

    const closeSearch = () => {
      searchKeywords.value = '';
      searchedKeywords.value = '';
      updateOptions({ value: { page: 0 } });
    };

    search();
    loadFavouriteMovies();

    return {
      movies,
      moviesLoading,
      favouriteMovies,
      searchMovies,
      updateOptions,
      closeSearch,
      search,
      star,
      starMovie,
      loadFavouriteMovies,
      options,
      searchKeywords,
      searchedKeywords,
      loading: true,
      headers: [
        { text: '', value: 'star' },
        { text: 'Title', value: 'Title' },
        { text: 'Year', value: 'Year' },
        { text: 'imdbID', value: 'imdbID' },
      ],
    };
  },
});
</script>
