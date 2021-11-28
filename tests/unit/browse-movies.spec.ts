import { expect } from 'chai';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import VueCompositionAPI from '@vue/composition-api';
import Vuex from 'vuex';
import vuetify from '@/plugins/vuetify';
import BrowseMovies from '@/components/BrowseMovies.vue';
import router from '@/router';
import App from '@/App.vue';

declare const global: any;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueCompositionAPI);

describe('BrowseMovies.vue', () => {
  let actions;
  let store: any;
  let getters: any;

  beforeEach(() => {
    global.requestAnimationFrame = (cb: any) => cb();
    const state = {
      movies: {
        page: 0,
        per_page: 10,
        total: 1,
        data: [{
          Title: 'Waterland',
          Year: '1997',
          imdbID: 'tt1234',
        }],
      },
      moviesLoading: false,
      favouriteMovies: [],
    };
    actions = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      searchMovies: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      starMovie: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loadFavouriteMovies: () => {},
    };
    getters = {
      movies: () => state.movies,
      moviesLoading: () => state.moviesLoading,
      favouriteMovies: () => state.favouriteMovies,
    };
    store = new Vuex.Store({
      state,
      actions,
      getters,
    });
  });

  it('Renders movies from state successfully', () => {
    const wrapper = mount(BrowseMovies, {
      store,
      localVue,
      vuetify,
      router,
      propsData: {},
      render: (h) => h(App),
    });
    expect(wrapper.find('#movies-table').text()).to.include('Waterland');
    expect(wrapper.findAll('#movies-table tbody tr').length).to.eq(1);
  });
});
