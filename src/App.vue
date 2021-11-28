<template>
  <v-app>
    <v-app-bar
      app
      dark
      dense
      color="primary"
    >
      <div class="d-flex align-center">
        <h1 class="ml-16">Movito</h1>
      </div>
    </v-app-bar>

    <v-main class="pt-16">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
