<template>
  <header>
    <Logo />
    <Form v-model="searchText" @searchFilm="searchFilm" :searchText="searchText" />
  </header>
</template>

<script>
import Logo from "./LogoComponent.vue";
import Form from "./FormComponent.vue";
import axios from "axios";
import state from "@/state";

export default {
  name: "HeaderComponent",
  components: {
    Logo,
    Form,
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    searchFilm() {
      const requestLinkFilms = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1&include_adult=false`
      );
      const requestLinkSeries = axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1&include_adult=false`
      );
      axios.all([requestLinkFilms, requestLinkSeries]).then(
        axios.spread((...responses) => {
          const array = [
            ...responses[0].data.results,
            ...responses[1].data.results,
          ];
          this.searchText = "";
          state.films = array;
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(26, 24, 24);
  padding: 1rem;
}
</style>