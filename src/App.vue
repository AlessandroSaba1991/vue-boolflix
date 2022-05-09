<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="@/assets/img/boolflix.png" alt="logo boolflix">
      </div>
      <form action="#" method="get" @submit.prevent="searchFilm">
        <label for="search" class="text-white">Inserisci la tua ricerca: </label>
        <input type="text" name="search" id="search" v-model="searchText">
        <button type="submit">Cerca</button>
      </form>
    </header>
    <main>
      <ul>
        <li v-for="film in films" :key="film.id">
          <h3>{{film.title}}</h3>
          <p>{{film.original_title}}</p>
          <p>{{film.original_language}}</p>
          <p>{{film.vote_average}}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'App',
  data(){
    return{
      searchText:'',
      films:null
    }
  },
  methods:{
    searchFilm(){
      
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f3afd7059da19eddb0348a3bc5186e80&language=it-IT&query=${this.searchText}&page=1&include_adult=false`)
      .then(response => {
        this.films=response.data.results
      })
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style';
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(26, 24, 24);
  padding: 1rem;
}
</style>
