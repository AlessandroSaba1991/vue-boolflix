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
      Promise.all([requestLinkFilms, requestLinkSeries]).then((responses) => {
        const array = [
          ...responses[0].data.results,
          ...responses[1].data.results,
        ];
        this.searchText = "";
        state.films = array;
        this.castList(state.films);
      });
    },
    castList(array) {
      array.forEach((film) => {
        if (film.title) {
          const linkCastFilm = axios.get(
            `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT`
          );
          const linkGenereFilm = axios.get(
            `https://api.themoviedb.org/3/movie/${film.id}?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
          );
          Promise.all([linkCastFilm, linkGenereFilm]).then((responses) => {
            console.log(responses);
            const full_cast = responses[0].data.cast;
            const cast_5 = full_cast.filter((person) => person.order < 5);
            state.cast.push(cast_5);
            const full_film = responses[1].data;
            state.genres.push(full_film.genres);
          });
        } else {
          const linkCastTV = axios.get(
            `https://api.themoviedb.org/3/tv/${film.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
          );
          const linkGenereTV = axios.get(
            `https://api.themoviedb.org/3/tv/${film.id}?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
          );
          Promise.all([linkCastTV, linkGenereTV]).then((responses) => {
            console.log(responses);
            const full_cast = responses[0].data.cast;
            const cast_5 = full_cast.filter((person) => person.order < 5);
            state.cast.push(cast_5);
            const full_film = responses[1].data;
            state.genres.push(full_film.genres);
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