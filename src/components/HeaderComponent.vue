<template>
  <header>
    <Logo />
    <div class="filter">
      <Form
        v-model.trim="searchText"
        @searchFilm="searchFilm"
        :searchText="searchText"
      />
      <Select
        :ableSelect="ableSelect"
        :typeGenreFilms="typeGenreFilms"
        v-model="typeGenreFilms"
        @selectGenreFilms="CastAndGenereList(films, series)"
      />
    </div>
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
    Select
  },
  data() {
    return {
      searchText: "",
      typeGenreFilms: "0",
      films_data: null,
      films: null,
      series: null,
      ableSelect: true,
    };
  },
  methods: {
    searchFilm() {
      this.ableSelect = false;
      /* CHIAMATA FILM */
      const requestLinkFilms = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1`
      );
      /* CHIAMATA SERIE */
      const requestLinkSeries = axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1`
      );
      Promise.all([requestLinkFilms, requestLinkSeries]).then((responses) => {
        this.films_data = { film: responses[0].data, tv: responses[1].data };
        this.searchText = "";
        this.films = this.films_data.film.results;
        this.series = this.films_data.tv.results;
        state.films_data = this.films_data;
        state.films = this.films;
        state.series = this.series;
        /* PRONTA L'ARRAY FILM LA UTLIZZO PER FARE LE CHIAMATE PER I GENERI E IL CAST*/
        this.CastAndGenereList(state.films, state.series);
      });
    },
    CastAndGenereList(array, array2) {
      this.castGenresFilm(array);
      this.castGenresSeries(array2);
    },
    /* SALVATE NELLO STATE */
    castGenresFilm(array) {
      state.selectGenreFilms = parseInt(this.typeGenreFilms);
      if (state.selectGenreFilms !== 0) {
        array = array.filter((object) =>
          object.genre_ids.includes(state.selectGenreFilms)
        );
      }
      state.films = array;
      state.castFilms = [];
      state.genresFilms = [];
      array.forEach((object) => {
        /* CHIAMATE CAST E GENERE PER FILM */
        const linkCast = axios.get(
          `https://api.themoviedb.org/3/movie/${object.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT`
        );
        const linkGenere = axios.get(
          `https://api.themoviedb.org/3/movie/${object.id}?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
        );
        Promise.all([linkCast, linkGenere]).then((responses) => {
          this.createCastAndGenreList(
            responses,
            state.castFilms,
            state.genresFilms
          );
        });
      });
    },
    castGenresSeries(array) {
      state.selectGenreFilms = parseInt(this.typeGenreFilms);
      if (state.selectGenreFilms !== 0) {
        array = array.filter((object) =>
          object.genre_ids.includes(state.selectGenreFilms)
        );
      }
      state.series = array;
      state.castSeries = [];
      state.genresSeries = [];
      array.forEach((object) => {
        /* CHIAMATE CAST E GENERE PER FILM */
        const linkCast = axios.get(
          `https://api.themoviedb.org/3/tv/${object.id}/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT`
        );
        const linkGenere = axios.get(
          `https://api.themoviedb.org/3/tv/${object.id}?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT`
        );
        Promise.all([linkCast, linkGenere]).then((responses) => {
          this.createCastAndGenreList(
            responses,
            state.castSeries,
            state.genresSeries
          );
        });
      });
    },
    createCastAndGenreList(responses, cast, genre) {
      const full_cast = responses[0].data.cast;
      const cast_5 = full_cast.filter((person) => person.order < 5);
      cast.push(cast_5);
      genre.push(responses[1].data.genres);
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
  .filter {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 0.5rem;
  }
}
</style>