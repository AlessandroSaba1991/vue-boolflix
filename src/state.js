import Vue from 'vue'

const state = Vue.observable({
    films_data:[],
    films:[],
    series:[],
    castFilms:[],
    genresFilms:[],
    castSeries:[],
    genresSeries:[],
    selectGenreFilms:"0",
    selectGenreSeries:"0",
    lastCall:''
    
})

export default state