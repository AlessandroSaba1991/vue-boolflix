<template>
  <main>
    <div class="container-fluid">
      <div class="row justify-content-center g-1">
        <CardFilm :film="film" :index="index" v-for="(film,index) in films" :key="film.id" />
      </div>
    </div>
  </main>
</template>

<script>
import CardFilm from './CardFilmComponent.vue'
import state from "@/state";

export default {
  name: "MainComponent",
  components:{
      CardFilm
  }, 
  computed: {
    films() {
      return state.films;
    },
  },
  
};
</script>

<style lang="scss" scoped>
main {
  background-color: gray;
  padding: 3rem 1rem;
}
</style>
