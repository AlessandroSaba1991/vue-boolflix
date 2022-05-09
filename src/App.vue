<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="@/assets/img/boolflix.png" alt="logo boolflix" />
      </div>
      <form action="#" method="get" @submit.prevent="searchFilm">
        <label for="search" class="text-white"
          >Inserisci la tua ricerca:
        </label>
        <input type="text" name="search" id="search" v-model="searchText" />
        <button type="submit">Cerca</button>
      </form>
    </header>
    <main>
      <ul>
        <li v-for="(film, index) in films" :key="film.id">
          <h3>{{ film.title }}</h3>
          <p>{{ film.original_title }}</p>
          <img
            :src="'https://flagcdn.com/32x24/' + flags(index) + '.png'"
            alt=""
          />

          <p>{{ film.vote_average }}</p>
        </li>
      </ul>
      <ul>
        <li v-for="(serie, index) in series" :key="serie.id">
          <h3>{{ serie.name }}</h3>
          <p>{{ serie.original_name }}</p>
          <img
            :src="'https://flagcdn.com/32x24/' + flags(index) + '.png'"
            alt=""
          />

          <p>{{ serie.vote_average }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      searchText: "",
      films: null,
      series:null
    };
  },
  methods: {
    searchFilm() {
      const requestLinkFilms = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1&include_adult=false`)
      const requestLinkSeries = axios.get(`https://api.themoviedb.org/3/search/tv?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1&include_adult=false`)
      axios.all([requestLinkFilms, requestLinkSeries]).then(
        axios.spread((...responses) => {
          this.films = responses[0].data.results;
          this.series = responses[1].data.results
          this.searchText = "";
          
        })
      );
    },
    flags(index) {
      if (this.films[index].original_language === "en") {
        this.films[index].original_language = "gb"
      } else if (this.films[index].original_language === "ja") {
        this.films[index].original_language = "jp";
      } else if (this.films[index].original_language === "el") {
        this.films[index].original_language = "gr";
      }
      return this.films[index].original_language;
    },
  },
  components: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/style";
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(26, 24, 24);
  padding: 1rem;
}
</style>
