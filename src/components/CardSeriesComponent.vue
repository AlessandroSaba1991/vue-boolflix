<template>
  <div class="col_">
    <div class="card_serie">
      <div class="img">
        <img :src="placeholderImage(serie.poster_path)" :alt="serie.name" />
      </div>
      <!-- /.img -->
      <div class="description_serie">
        <!-- TITOLO -->
          <h5>Titolo</h5>
        <p>
          {{ serie.name }}
        </p>
        <!-- TITOLO ORIGINALE -->
          <h5>Titolo originale</h5>
        <p>
          {{ serie.original_name }}
        </p>
        <!-- GENERE -->
          <h5>Genere</h5>
        <p>
          <span v-for="(genre, i) in genres[index]" :key="genre.id">
            {{ i + 1 }}: {{ genre.name }}.
            <br>
          </span>
        </p>
        <!-- BANDIERA -->
          <h5>Lingua</h5>
        <p class="d-flex justify-content-center">
          <img
            :src="'https://flagcdn.com/32x24/' + flagsFilm(serie) + '.png'"
            alt=""
          />
        </p>
        <!-- STELLINE -->
          <h5>Voto</h5>
        <p style="color: gold">
          <font-awesome-icon
            v-for="n in starSystem(serie)"
            :key="n"
            icon="fa-solid fa-star"
          />
          <font-awesome-icon
            v-for="number in maxStars - starSystem(serie)"
            :key="'r' + number"
            icon="fa-regular fa-star"
          />
        </p>
        <!-- CAST -->
          <h5>Cast</h5>
        <p>
          <span v-for="person in cast[index]" :key="person.id">
            "{{ person.name }}" </span
          >.
        </p>
        <!-- OVERVIEW -->
          <h5>Overview</h5>
        <p>
          {{ serie.overview }}
        </p>
      </div>
      <!-- /.description_film -->
    </div>
    <!-- /.card_film -->
  </div>
</template>

<script>
import state from '@/state'

export default {
    name:'CardSeriesComponent',
props: {
    serie: Object,
    index: Number,
  },
  data() {
    return {
      maxStars: 5,
      imgPlaceholder: "https://cringemdb.com/img/movie-poster-placeholder.png",
    };
  },
  computed: {
    cast() {
      return state.castSeries;
    },
    genres() {
      return state.genresSeries;
    },
  },
  methods: {
    flagsFilm(object) {
      switch (object.original_language) {
        case "en":
          object.original_language = "gb";
          break;
        case "ja":
          object.original_language = "jp";
          break;
        case "el":
          object.original_language = "gr";
          break;
        case "ko":
          object.original_language = "kp";
          break;
        case "zh":
          object.original_language = "cn";
          break;
        case "hi":
          object.original_language = "in";
          break;
          case "kv":
          object.original_language = "ru";
          break;
           case "cs":
          object.original_language = "cz";
          break;            
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
  .card_serie {
    overflow-y: auto;
    width: 342px;
    height: 513px;
    text-align: center;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px red;
    background-color: black;
    color: white;
    .img {
      height: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .description_serie {
      padding: 2rem 0.5rem;
      display: none;
      h5 {
        color: red;
      }
      h5,
      img {
        margin-top: 0.25rem;
        margin-bottom: 0;
      }
    }
  }
}
.card_serie:hover .img {
  display: none;
}
.card_serie:hover .description_serie {
  display: block;
}
::-webkit-scrollbar-track {
  background-color: black;
}
</style>