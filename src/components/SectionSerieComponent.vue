<template>
<section class="serie">
  <div class="container-fluid" >
    <h2 class="text-white my-2">Serie</h2>
    <select
      name="pages"
      id="pages"
      :value="numberPageSerie"
      @input="$emit('input', $event.target.value)"
      @change="$emit('selectnumberPageSerie')"
    >
      <option :value="n" v-for="n in series_data.total_pages" :key="n">
        {{ n }}
      </option>
    </select>
    <div class="row g-1 py-3" v-if="series.length > 0">
      <CardSeries
        :serie="serie"
        :index="index"
        v-for="(serie, index) in series"
        :key="serie.id"
      />
    </div>
    <div v-else class="no_response">Non abbiamo questo tipo di serie</div>
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
.row {
  flex-wrap: nowrap;
  overflow-y: auto;
}
.no_response{
    color: white;
    font-size: 80px;
}
</style>
