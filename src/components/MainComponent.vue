<template>
  <main>
    <div class="container-fluid">
      <select name="pages" id="pages">
        <option :value="n" v-for="n in films_data.total_pages" :key="n" >{{n}}</option>
      </select>
      <div class="row justify-content-center g-1">
        <CardFilm
          :film="film"
          :index="index"
          v-for="(film, index) in films"
          :key="film.id"
        />
      </div>
    </div>
  </main>
</template>

<script>
import CardFilm from "./CardFilmComponent.vue";
import state from "@/state";

export default {
  name: "MainComponent",
  components: {
    CardFilm,
  },
  computed: {
    films() {
      return state.films;
    },
    films_data(){
      return state.films_data.tv
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - 118px);
  background-color: gray;
  padding: 3rem 1rem;
}
</style>
