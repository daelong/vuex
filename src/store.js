// store.js
import Vue from "vue";
import Vuex from "vuex";
// import axios from 'axios';
import API from '@/assets/scripts/api';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // counter: 1
    items: [],
    headers: [
      {
        text: 'Index',
        align: 'start',
        value: 'index'
      },
      {
        text: 'Name',
        value: 'name',
      },
      { text: 'Type', value: 'brewery_type' },
      { text: 'Country', value: 'country' },
      { text: 'Website', value: 'website_url' },  
    ],
    page: 1,
    visible: {
      modal: false,
      input: false,
      update: false,
    },
  },
  getters:{
    items: (state) => state.items,
    headers: (state) => state.headers,
    page: (state) => state.page,
    visible: (state) => state.visible
  },
  mutations:{
    setData: (state, payload) => state.items = payload.map((item, index) => ({...item, index})),
    changePage: (state, payload) => state.page = payload,
    addItem: (state, payload) => {
      state.items.push(payload)
      store.commit('setData', state.items);
    },
    updateItem: (state, payload) => {
      state.items.splice(payload.index, 1, payload)
      store.commit('setData', state.items);
    },
    deleteItem: (state, payload) => {
      console.log(payload);
      state.items.splice(payload.index, 1)
      store.commit('setData', state.items);
    }
  },
  actions:{
    // axios.get('https://api.openbrewerydb.org/breweries').then((res) => context.commit('setData',res.data))
      fetchData: (context) => {
        console.log(context.getters.page);
        return API.fetchAPIData(context.getters.page, 25).then((res) => context.commit('setData', res.data))
      },
      //context 밑에 getters
    }
});