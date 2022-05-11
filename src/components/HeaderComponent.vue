<template>
  <header>
    <Logo />
    <Form
      v-model="searchText"
      @searchFilm="searchFilm"
      :searchText="searchText"
    />
    <Select :ableSelect="ableSelect" v-model="typeGenre" @selectGenre="CastAndGenereList(films)" />
  </header>
</template>

<script>
import Logo from "./LogoComponent.vue";
import Form from "./FormComponent.vue";
import Select from "./SelectComponent.vue";
import axios from "axios";
import state from "@/state";

export default {
  name: "HeaderComponent",
  components: {
    Logo,
    Form,
    Select,
  },
  data() {
    return {
      searchText: "",
      typeGenre: 0,
      films: null,
      ableSelect:true
    };
  },
  methods: {
    searchFilm() {
      this.ableSelect = false
      /* CHIAMATA FILM */
      const requestLinkFilms = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1&include_adult=false`
      );
      /* CHIAMATA SERIE */
      const requestLinkSeries = axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1&include_adult=false`
      );
      Promise.all([requestLinkFilms, requestLinkSeries]).then((responses) => {
        this.films = [
          ...responses[0].data.results,
          ...responses[1].data.results,
        ];
        this.searchText = "";
        state.films = this.films;
        /* PRONTA L'ARRAY FILM LA UTLIZZO PER FARE LE CHIAMATE PER I GENERI E IL CAST*/
        this.CastAndGenereList(state.films);
      });
    },
    CastAndGenereList(array) {
      state.selectGenre = parseInt(this.typeGenre);
      if (state.selectGenre !== 0) {
         array = array.filter((film) =>
          film.genre_ids.includes(state.selectGenre)
        );
      } 
      state.cast = [];
      state.genres = [];
      array.forEach((film) => {
        /* CHIAMATE CAST E GENERE PER FILM */
        if (film.title) {
          const linkCastFilm = axios.get(
            `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT`
          );
          const linkGenereFilm = axios.get(
            `https://api.themoviedb.org/3/movie/${film.id}?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
          );
          Promise.all([linkCastFilm, linkGenereFilm]).then((responses) => {
            this.createCastAndGenreList(responses);
          });
          /* CHIAMATE CAST E GENERE PER SERIE */
        } else {
          const linkCastTV = axios.get(
            `https://api.themoviedb.org/3/tv/${film.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
          );
          const linkGenereTV = axios.get(
            `https://api.themoviedb.org/3/tv/${film.id}?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
          );
          Promise.all([linkCastTV, linkGenereTV]).then((responses) => {
            this.createCastAndGenreList(responses);
          });
        }
      });
    },
    /* SALVATE NELLO STATE */
    createCastAndGenreList(responses) {
      const full_cast = responses[0].data.cast;
      const cast_5 = full_cast.filter((person) => person.order < 5);
      state.cast.push(cast_5);
      const full_film = responses[1].data;
      state.genres.push(full_film.genres);
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