<template>
  <div class="col_">
    <div class="card_film">
      <div class="img">
        <img :src="placeholderImage(film.poster_path)" :alt="film.title" />
      </div>
      <div class="description_film">
        <p><strong>Titolo: </strong> {{ film.title || film.name }}</p>
        <p>
          <strong>Titolo originale: </strong
          >{{ film.original_title || film.original_name }}
        </p>
        <img
          :src="'https://flagcdn.com/32x24/' + flagsFilm(film) + '.png'"
          alt=""
        />

        <p style="color: gold">
          <strong class="text-white">Voto: </strong>
          <font-awesome-icon
            v-for="n in starSystem(film)"
            :key="n"
            icon="fa-solid fa-star"
          />
          <font-awesome-icon
            v-for="number in maxStars - starSystem(film)"
            :key="'r' + number"
            icon="fa-regular fa-star"
          />
        </p>
        <p>
          <strong>Cast : </strong>
          <span v-for="person in cast[index]" :key="person.id"> {{person.name}} </span>
        </p>
        <p><strong>Overview: </strong>{{ film.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import state from '@/state'

export default {
  name: "CardFilmComponent",
  props: {
    film: Object,
    index: Number
  },
  data() {
    return {
      maxStars: 5,
      imgPlaceholder: "https://cringemdb.com/img/movie-poster-placeholder.png",
    };
  },
  computed: {
      cast(){
          return state.cast
      }
  },
  methods: {
    flagsFilm(object) {
      if (object.original_language === "en") {
        object.original_language = "gb";
      } else if (object.original_language === "ja") {
        object.original_language = "jp";
      } else if (object.original_language === "el") {
        object.original_language = "gr";
      }
      return object.original_language;
    },
    placeholderImage(item) {
      if (item === null) {
        return this.imgPlaceholder;
      } else {
        return "https://image.tmdb.org/t/p/w342" + item;
      }
    },
    starSystem(object) {
      return Math.ceil(object.vote_average / 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.col_ {
  width: fit-content;
  .card_film {
    overflow-y: auto;
    width: 342px;
    height: 513px;
    border: 1px solid white;
    background-color: black;
    color: white;
    .img {
      height: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .description_film {
      padding: 2rem 0.25rem;
      display: none;
      p,
      img {
        margin-top: 0.25rem;
        margin-bottom: 0;
      }
    }
  }
}
.card_film:hover .img {
  display: none;
}
.card_film:hover .description_film {
  display: block;
}
</style>