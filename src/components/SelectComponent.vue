<template>
  <div class="select">
    <label for="genre">Seleziona un genere</label>
    <select
      name="genre"
      id="genre"
      :disabled="ableSelect"
      :value="typeGenreFilms"
      @input="$emit('input', $event.target.value)"
      @change="$emit('selectGenreFilms')">
      <option value="0" selected>All</option>
      <option :value="genre.id" v-for="genre in genreList" :key="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SelectComponent",
  props: {
    typeGenreFilms: String,
    ableSelect: Boolean,
  },
  data() {
    return {
      genreList: [],
    };
  },
  methods: {
    callGenre() {
      const genreFilm = axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT"
      );
      const genreTV = axios.get(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT"
      );
      Promise.all([genreFilm, genreTV]).then((responses) => {
        const array = [
          ...responses[0].data.genres,
          ...responses[1].data.genres,
        ];
        const array_json = array.map((genre) => JSON.stringify(genre));
        const array_unica = [...new Set(array_json)];
        this.genreList = array_unica.map((genre) => JSON.parse(genre));
      });
    },
  },
  mounted() {
    this.callGenre();
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: fixed;
  right: 2rem;
  top: 6.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: red;
  border-radius: 50rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 0 4px red;
  select {
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
:focus-visible {
  outline: none;
}
</style>