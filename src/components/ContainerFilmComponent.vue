<template>
  <div class="container-fluid">
    <h2 class="text-white my-2">Film</h2>
    <select
      name="pages"
      id="pages"
      :value="numberPageFilm"
      @input="$emit('input', $event.target.value)"
      @change="$emit('selectnumberPageFilm')"
    >
      <option :value="n" v-for="n in films_data.total_pages" :key="n">
        {{ n }}
      </option>
    </select>
    <div class="row g-1 py-3" v-if="films.length > 0">
      <CardFilm      
        :film="film"
        :index="index"
        v-for="(film, index) in films"
        :key="film.id"
      />
    </div>
    <div v-else class="no_response">Non abbiamo questo tipo di film</div>
  </div>
</template>

<script>
import CardFilm from "./CardFilmComponent.vue";
import state from "@/state";

export default {
  name: "ContainerFilmComponent",
  components: {
    CardFilm,
  },
  props: {
    numberPageFilm: String,
  },
  computed: {
    films() {
      return state.films;
    },
    films_data() {
      return state.films_data.film;
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  flex-wrap: nowrap;
  overflow-y: auto;
}
.no_response{
    color: white;
    font-size: 80px;
}
</style>