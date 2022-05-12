<template>
  <section class="serie mt-3">
    <div class="container-fluid">
      <div class="title_serie">
        <h2 class="my-2">Serie</h2>
        <select
          name="pages"
          id="pages"
          :value="numberPageSerie"
          @input="$emit('input', $event.target.value)"
          @change="$emit('selectnumberPageSerie')">
          <option :value="n" v-for="n in series_data.total_pages" :key="n">
            {{ n }}
          </option>
        </select>
      </div>
      <div class="row g-1 py-3" v-if="series.length > 0">
        <CardSeries
          :serie="serie"
          :index="index"
          v-for="(serie, index) in series"
          :key="serie.id" />
      </div>
      <div v-else class="no_response"><h3>😰Nessun Risultato😰</h3></div>
    </div>
  </section>
</template>

<script>
import CardSeries from "./CardSeriesComponent.vue";
import state from "@/state";

export default {
  name: "SectionSerieComponent",
  components: {
    CardSeries,
  },
  props: {
    numberPageSerie: String,
  },
  computed: {
    series() {
      return state.series;
    },
    series_data() {
      return state.films_data.tv;
    },
  },
};
</script>

<style lang="scss" scoped>
.title_serie {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.25rem 1rem;
  border-radius: 50rem;
  column-gap: 0.5rem;
  background-color: black;
  color: red;
  box-shadow: 0 0 4px red;
  select {
    margin-top: 0.35rem;
    background-color: lightgray;
    color: red;
    border-radius: 50rem;
    padding-left: 0.25rem;
    font-weight: 600;
    option {
      font-weight: 600;
    }
  }
}
.row {
  flex-wrap: nowrap;
  overflow-y: auto;
}
.no_response {
  width: fit-content;
  padding: 0.25rem 1rem;
  margin: 3rem auto;
  border-radius: 50rem;
  background-color: black;
  color: red;
  box-shadow: 0 0 4px red;
  h3 {
    margin-bottom: 0;
  }
}
:focus-visible {
  outline: none;
}
</style>
