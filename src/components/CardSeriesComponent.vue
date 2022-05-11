<template>
  <div class="col_">
    <div class="card_serie">
      <div class="img">
        <img :src="placeholderImage(serie.poster_path)" :alt="serie.name" />
      </div>
      <!-- /.img -->
      <div class="description_serie">
        <!-- TITOLO -->
        <p>
          <strong>Titolo: </strong>
          {{ serie.name }}
        </p>
        <!-- TITOLO ORIGINALE -->
        <p>
          <strong>Titolo originale: </strong>
          {{ serie.original_name }}
        </p>
        <!-- GENERE -->
        <p>
          <strong>Genere: </strong>
          <br />
          <span v-for="(genre, i) in genres[index]" :key="genre.id">
            {{ i + 1 }}: {{ genre.name }}.
            <br />
          </span>
        </p>
        <!-- BANDIERA -->
        <p class="d-flex align-items-center">
          <strong class="me-2">Lingua: </strong>
          <img
            :src="'https://flagcdn.com/32x24/' + flagsFilm(serie) + '.png'"
            alt=""
          />
        </p>
        <!-- STELLINE -->
        <p style="color: gold">
          <strong class="text-white">Voto: </strong>
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
        <p>
          <strong>Cast : </strong>
          <span v-for="person in cast[index]" :key="person.id">
            "{{ person.name }}" </span
          >.
        </p>
        <!-- OVERVIEW -->
        <p>
          <strong>Overview: </strong>
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
    .description_serie {
      padding: 2rem 0.5rem;
      display: none;
      p,
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
</style>