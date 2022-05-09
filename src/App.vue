<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="@/assets/img/boolflix.png" alt="logo boolflix" />
      </div>
      <form action="#" method="get" @submit.prevent="searchFilm">
        <label for="search" class="text-white">
          Inserisci la tua ricerca:
        </label>
        <input type="text" name="search" id="search" v-model="searchText" />
        <button type="submit">Cerca</button>
      </form>
    </header>
    <main>
      <ul>
        <li v-for="(film, index) in films" :key="film.id">
          <img
            :src="'https://image.tmdb.org/t/p/w185/' + film.poster_path"
            :alt="film.title"
          />
          <h3>{{ film.title || film.name }}</h3>
          <p>{{ film.original_title || film.original_name }}</p>
          <img
            :src="'https://flagcdn.com/32x24/' + flagsFilm(index) + '.png'"
            alt=""
          />

          <p style="color:gold">
            <font-awesome-icon 
              v-for="n in starSystemSolid(index)"
              :key="n"
              icon="fa-solid fa-star"
            />
            <font-awesome-icon 
              v-for="number in starSystemRegular(index)"
              :key="'r' + number"
              icon="fa-regular fa-star"
            />
          </p>
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
      starSolid: 0,
      starRegular: 0,
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
          this.films = [...responses[0].data.results,...responses[1].data.results];
          this.searchText = "";
        })
      );
    },
    flagsFilm(index) {
      if (this.films[index].original_language === "en") {
        this.films[index].original_language = "gb";
      } else if (this.films[index].original_language === "ja") {
        this.films[index].original_language = "jp";
      } else if (this.films[index].original_language === "el") {
        this.films[index].original_language = "gr";
      }
      return this.films[index].original_language;
    },
    
    starSystemSolid(index) {
      const numberStar = parseInt(this.films[index].vote_average / 2).toFixed(0);
      const max = 5;
     let starSolid = 0     
      for (let i = 0; i < max; i++) {
        if (parseInt(numberStar) >= i) {          
          starSolid += 1;
        } 
      }
      return starSolid
    },
    starSystemRegular(index) {
      const numberStar = parseInt(this.films[index].vote_average / 2).toFixed(0);
      const max = 5;
     let starRegular = 0     
      for (let i = 0; i < max; i++) {
        if (parseInt(numberStar) < i) {          
          starRegular += 1;
        } 
      }
      return starRegular
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
