<template>
  <form action="#" method="get" @submit.prevent="$emit('searchFilm')">
    <label for="search" class="text-white"> Inserisci la tua ricerca: </label>
    <input
      type="text"
      name="search"
      id="search"
      pattern="\s*(\S\s*){1,}"
      :value="searchText"
      @input="$emit('input', $event.target.value)"
      required/>
    <button type="submit">Cerca</button>
  </form>
</template>

<script>
export default {
  name: "FormComponent",
  props: {
    searchText: String,
  },
};
</script>

<style>
</style>