<template>
  <v-container>
    <v-data-table
      id="favourite-movies-table"
      :headers="headers"
      :items="favouriteMovies"
      :items-per-page="10"
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
    user: {
    },
  },
  setup(props, { root }) {
    const { star } = useStarMovie(root);
    const { headers, footerProps } = useMoviesTable();

    const favouriteMovies = computed(() => root.$store.getters.favouriteMovies);

    const loadFavouriteMovies = () => {
      root.$store.dispatch('loadFavouriteMovies');
    };

    loadFavouriteMovies();

    return {
      favouriteMovies,
      headers,
      footerProps,
      star,
      loadFavouriteMovies,
    };
  },
});
</script>
