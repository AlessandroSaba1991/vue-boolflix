<template>
  <form action="#" method="get" @submit.prevent="$emit('searchFilm')">
    <input
      type="text"
      name="search"
      id="search"
      pattern="\s*(\S\s*){1,}"
      :value="searchText"
      @input="$emit('input', $event.target.value)"
      required
    />
    <button type="submit" class="btn rounded-pill">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </button>
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

<style lang="scss" scoped>
form {
  display: flex;
  input {
    border-radius: 50rem;
    padding-left: 0.75rem;
    border: none;
    margin-right: 0.5rem;
    font-weight: 700;
  }
  button {
    padding: 0.15rem 1rem;
    background-color: gray;
    color: red;
    border: none;
    transition: all 500ms;
    &:hover {
      box-shadow: inset 0 0 0 2px red;
      color: red;
    }
  }
}
.btn:focus{
  box-shadow: none;
}
:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px red;
}
</style>