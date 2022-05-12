<template>
  <nav>
    <ul class="navbar">
      <li v-for="(item, index) in navList" :key="index">
        <a :href="item.link">{{ item.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavComponent",
  data() {
    return {
      navList: [
        {
          link: "#",
          name: "Home",
        },
        {
          link: "#",
          name: "Film",
        },
        {
          link: "#",
          name: "Serie",
        },
        {
          link: "#",
          name: "About",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
  column-gap: 0.5rem;
  a {
    text-decoration: none;
    color: red;
    padding: 0.5rem 0.75rem;
    border-radius: 50rem;
    border: 2px solid transparent;
    transition: all 500ms;
    &:hover {
      border-color: red;
    }
  }
}
</style>