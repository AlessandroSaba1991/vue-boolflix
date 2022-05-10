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
      <div class="container-fluid">
        <div class="row justify-content-center g-1">
          <div class="col_" v-for="(film, index) in films" :key="film.id" >
            <div class="card_film">
              <div class="img" >
                <img
                  :src="'https://image.tmdb.org/t/p/w342' + film.poster_path"
                  :alt="film.title"
                />
              </div>
              <div  class="description_film">
                <p><strong>Titolo: </strong> {{ film.title || film.name }}</p>
                <p><strong>Titolo originale: </strong>{{ film.original_title || film.original_name }}</p>
                <img
                  :src="
                    'https://flagcdn.com/32x24/' + flagsFilm(index) + '.png'
                  "
                  alt=""
                />

                <p style="color: gold">
                  <strong class="text-white">Voto: </strong>
                  <font-awesome-icon
                    v-for="n in starSystem(index)"
                    :key="n"
                    icon="fa-solid fa-star"
                  />
                  <font-awesome-icon
                    v-for="number in maxStars - starSystem(index)"
                    :key="'r' + number"
                    icon="fa-regular fa-star"
                  />
                </p>
                <p><strong>Overview: </strong>{{film.overview}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      maxStars: 5,
      
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
          this.films = [
            ...responses[0].data.results,
            ...responses[1].data.results,
          ];
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

    starSystem(index) {
      return Math.ceil(this.films[index].vote_average / 2);
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
main{
  background-color: gray;
  padding: 3rem 1rem;
}
.col_{
  width: fit-content;
}
.card_film{
  overflow-y: auto;
  width: 342px;
  height: 513px;
  border: 1px solid white;
  background-color: black;
  color: white;
  .img{
    img{
      height: 100%;
      width: 100%;
    }

  }
  .description_film{
    
    padding: 2rem 0;
    display: none;
    p,
    img{
      margin-top: 0.25rem;
      margin-bottom: 0;
    }
    
  }
}
.card_film:hover .img{
  display: none;
}
.card_film:hover .description_film{
  display: block;
}
</style>
