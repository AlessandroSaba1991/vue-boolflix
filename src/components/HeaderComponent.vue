<template>
  <header>
    <Logo />
    <Form
      v-model="searchText"
      @searchFilm="searchFilm"
      :searchText="searchText"
    />
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
          this.castList(state.films);
          
        })
      );
    },
    castList(array) {
      array.forEach((film) => {
        if (film.title) {
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT`
            )
            .then((response) => {
              const full_cast = response.data.cast;
              const cast_5 = full_cast.filter((person) => person.order < 5);
              state.cast.push(cast_5);
            });
        } else {
          axios
            .get(
              `https://api.themoviedb.org/3/tv/${film.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
            )
            .then((response) => {
              const full_cast = response.data.cast;
              const cast_5 = full_cast.filter((person) => person.order < 5);
              state.cast.push(cast_5);
            });
        }
      });
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