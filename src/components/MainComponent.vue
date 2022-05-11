<template>
  <main>
    <div class="container-fluid" v-if="films.length > 0">
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
      <div class="row g-1 py-3">
        <CardFilm
          :film="film"
          :index="index"
          v-for="(film, index) in films"
          :key="film.id"
        />
      </div>
    </div>
    <div class="container-fluid" v-if="series.length > 0">
      <h2 class="text-white my-2">Serie</h2>
      <select name="pages" id="pages" :value="numberPageSerie"
        @input="$emit('input', $event.target.value)"
        @change="$emit('selectnumberPageSerie')">
        <option :value="n" v-for="n in series_data.total_pages" :key="n">
          {{ n }}
        </option>
      </select>
      <div class="row g-1 py-3">
        <CardSeries
          :serie="serie"
          :index="index"
          v-for="(serie, index) in series"
          :key="serie.id"
        />
      </div>
    </div>
  </main>
</template>

<script>
import CardFilm from "./CardFilmComponent.vue";
import CardSeries from "./CardSeriesComponent.vue";
import state from "@/state";

export default {
  name: "MainComponent",
  components: {
    CardFilm,
    CardSeries,
  },
  props:{
    numberPageFilm:String,
    numberPageSerie:String
  },
  computed: {
    films() {
      return state.films;
    },
    series() {
      return state.series;
    },
    films_data() {
      return state.films_data.film;
    },
    series_data() {
      return state.films_data.tv;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  height: calc(100vh - 118px);
  padding: 3rem 1rem;
  background-color: gray;
  overflow-x: auto;
  .row {
    flex-wrap: nowrap;
    overflow-y: auto;
  }
}
</style>
