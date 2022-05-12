<template>
  <div id="app">
    <header>
      <Logo />
      <Nav />
      <Form
        v-model.trim="searchText"
        @searchFilm="newSearchFilm"
        :searchText="searchText"
      />
    </header>
    <main v-if="loading">
      <Select
        :ableSelect="ableSelect"
        :typeGenreFilms="typeGenreFilms"
        v-model="typeGenreFilms"
        @selectGenreFilms="CastAndGenereList(films, series)"
      />
      <SectionFilm
        :numberPageFilm="numberPageFilm"
        v-model="numberPageFilm"
        @selectnumberPageFilm="selectPageFilm"
      />
      <SectionSerie
        :numberPageSerie="numberPageSerie"
        v-model="numberPageSerie"
        @selectnumberPageSerie="selectPageSerie"
      />
    </main>
    <div v-else class="initial"><h2>😂Esegui una ricerca😂</h2></div>
  </div>
</template>

<script>
import Logo from "./components/LogoComponent.vue";
import Nav from "./components/NavComponent.vue";
import Form from "./components/FormComponent.vue";
import Select from "./components/SelectComponent.vue";
import SectionFilm from "./components/SectionFilmComponent.vue";
import SectionSerie from "./components/SectionSerieComponent.vue";
import axios from "axios";
import state from "@/state";

export default {
  name: "App",
  components: {
    Logo,
    Nav,
    Form,
    Select,
    SectionFilm,
    SectionSerie,
  },
  data() {
    return {
      searchText: "",
      typeGenreFilms: "0",
      films_data: [],
      films: null,
      series: null,
      ableSelect: true,
      numberPageFilm: "1",
      numberPageSerie: "1",
      loading: false,
    };
  },
  methods: {
    newSearchFilm() {
      this.numberPageFilm = "1";
      this.numberPageSerie = "1";
      this.searchFilm();
    },
    selectPageFilm() {
      this.searchText = state.lastCall;
      this.searchFilm();
    },
    selectPageSerie() {
      this.searchText = state.lastCall;
      this.searchFilm();
    },
    searchFilm() {
      state.boolean = true;
      this.ableSelect = false;
      /* CHIAMATA FILM */
      const requestLinkFilms = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=${this.numberPageFilm}`
      );
      /* CHIAMATA SERIE */
      const requestLinkSeries = axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=${this.numberPageSerie}`
      );
      Promise.all([requestLinkFilms, requestLinkSeries]).then((responses) => {
        this.films_data = { film: responses[0].data, tv: responses[1].data };
        state.lastCall = this.searchText;
        this.searchText = "";
        this.films = this.films_data.film.results;
        this.series = this.films_data.tv.results;
        state.films_data = this.films_data;
        state.films = this.films;
        state.series = this.series;
        this.loading = true;
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

<style lang="scss">
@import "@/assets/scss/style";
#app {
  background-color: gray;
  height: 100vh;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(26, 24, 24);
  padding: 1rem;
  box-shadow: 0 1px 4px red;
}
main {
  position: relative;
  height: calc(100vh - 118px);
  padding: 3rem 1rem;
  margin-top: 0.5rem;
  margin-right: 0.25rem;
  background-color: gray;
  overflow-x: auto;
}
.initial {
  width: fit-content;
  padding: 0.25rem 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50rem;
  background-color: black;
  color: red;
  box-shadow: 0 0 4px red;
  h2 {
    margin-bottom: 0;
  }
}
::-webkit-scrollbar {
  width: 8px;
  margin-right: 0.5rem;
}
::-webkit-scrollbar:horizontal {
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: gray;
}

::-webkit-scrollbar-thumb {
  background-color: red;
  border-radius: 50rem;
}
::-webkit-scrollbar-button {
  display: none;
}
</style>
