import Vue from 'vue'

const state = Vue.observable({
    films_data:[],
    films:[],
    cast:[],
    genres:[],
    selectGenre:"0",
    boolean:false ,
    
})

export default state