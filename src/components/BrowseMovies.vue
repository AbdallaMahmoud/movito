<template>
  <v-container>
    <v-layout row class="mt-2  px-4">
      <v-flex grow class="pr-2">
        <v-text-field
          outlined
          dense
          id="search-input"
          v-model="searchKeywords"
          @keydown.enter="search"
          @keydown.esc="closeSearch"
          label="Type search keywords, then click search or press enter."
        ></v-text-field>
      </v-flex>
      <v-flex shrink>
        <v-btn
          @click="search"
          color="success"
          :disabled="!searchKeywords"
        ><v-icon>mdi-magnify</v-icon> Search</v-btn>
      </v-flex>
    </v-layout>
    <v-chip
      v-if="searchedKeywords"
      class="ma-2"
      @click:close="closeSearch"
      close
    >
      {{ searchedKeywords }}
    </v-chip>
    <v-data-table
      id="movies-table"
      :server-items-length="movies.total"
      :items="movies.data"
      :headers="headers"
      :options.sync="options"
      :loading="moviesLoading"
      :disable-pagination="moviesLoading"
      @update:options="updateOptions"
      :disable-sort="true"
      :footer-props="footerProps"
      dense
    >
      <template v-slot:item.star="{ item }">
        <v-rating
          v-model="item.starred"
          :length="1"
          color="red lighten-3"
          background-color="grey lighten-1"
          clearable
          small
          @input="star(item)"
        ></v-rating>
      </template>
      <template v-slot:item.Year="{ item }">
        <v-chip
          color="success"
          dark
          small
          class="font-weight-bold"
        >
          {{ item.Year }}
        </v-chip>
      </template>
      <template v-slot:item.imdbID="{ item }">
        <v-chip
          color="purple"
          dark
          small
          class="font-weight-bold"
        >
          {{ item.imdbID }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import useStarMovie from '@/features/useStarMovie';
import useMoviesTable from '@/features/useMoviesTable';

export default defineComponent({
  props: {
  },
  setup(props, { root }) {
    const { star } = useStarMovie(root);
    const { headers, footerProps } = useMoviesTable();

    const movies = computed(() => root.$store.getters.movies);
    const moviesLoading = computed(() => root.$store.getters.moviesLoading);
    const searchKeywords = ref('');
    const searchedKeywords = ref('');
    const loading = ref(true);

    const options = computed(() => ({
      page: movies.value.page,
      itemsPerPage: movies.value.per_page,
    }));

    const searchMovies = (params: any) => {
      root.$store.dispatch('searchMovies', params);
    };

    const updateOptions = (newOptions: any) => {
      searchMovies({
        page: newOptions.page,
        Title: searchKeywords.value,
      });
    };

    const search = () => {
      if (!searchKeywords.value) {
        return;
      }
      searchedKeywords.value = searchKeywords.value;
      searchMovies({
        page: options.value.page,
        Title: searchKeywords.value,
      });
    };

    const closeSearch = () => {
      searchKeywords.value = '';
      searchedKeywords.value = '';
      updateOptions({ value: { page: 0 } });
    };

    search();

    return {
      movies,
      moviesLoading,
      options,
      searchKeywords,
      searchedKeywords,
      loading,
      headers,
      footerProps,
      searchMovies,
      updateOptions,
      closeSearch,
      search,
      star,
    };
  },
});
</script>
