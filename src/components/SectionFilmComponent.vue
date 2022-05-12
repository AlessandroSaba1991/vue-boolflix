<template>
  <section class="film mt-4">
    <div class="container-fluid">
      <div class="title_film">
        <h2 class="my-2">Film</h2>
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
      </div>
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
  </section>
</template>

<script>
import CardFilm from "./CardFilmComponent.vue";
import state from "@/state";

export default {
  name: "SectionFilmComponent",
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
.title_film {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.25rem 1rem;
  border-radius: 50rem;
  column-gap: 0.5rem;
  background-color: black;
  color: red;
  box-shadow: 0 0 4px red;
  select{
    margin-top: 0.35rem;
    background-color: lightgray;
    color: red;
    border-radius: 50rem;
    padding-left: 0.25rem;
    font-weight: 600;
    option{
      font-weight: 600;
    }
  }
}
.row {
  flex-wrap: nowrap;
  overflow-y: auto;
}
.no_response {
  color: white;
  font-size: 80px;
}
:focus-visible {
    outline: none;
}
</style>