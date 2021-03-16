<template>
  <div class="main">
      <v-app id="app">
           <v-data-table
           dense
    :headers="headers"
    :items="items"
    :items-per-page="25"
    hide-default-footer
    >
     <template v-slot:item="{ item }">
            <tr class="even" @click="() => { selectedItem = item; visible.modal = true}">
                <td>{{item.index + 1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.brewery_type}}</td>
                <td>{{item.country}}</td>
                <td>{{item.website_url}}</td>
            </tr>
            </template>
    </v-data-table>
      <v-pagination
      v-model="page"
      :length="10"
    ></v-pagination>
      </v-app>
      <exam-5-modal v-if="visible.modal" :item="selectedItem" v-model="visible.modal"></exam-5-modal>
    </div>
</template>
<script>
import Exam5Modal from './Exam5Modal';

export default {
  name: 'App',
  components: {
    Exam5Modal
  },
  data(){
    return{
      // selectedItem: {}
    }
  },
  computed:{
    items(){
      return this.$store.getters.items
    },
    headers(){
      return this.$store.getters.headers
    },
    page:{
      get(){
        return this.$store.getters.page
        },
      set(value){
        this.$store.commit('changePage', value)
        this.getData();
      }
    },
    visible(){
        return this.$store.getters.visible
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.$store.dispatch('fetchData');
    },
  },
};
</script>

<style scoped>
.main{
  width: 100%;
}
table{
  width: 100%;
}
.column {
    cursor: pointer;
}
.even:nth-child(even){
  background-color: #c7ecee;
}
.even:hover{
    cursor: pointer;
    background-color: #bdc3c7;
}
.column.asc::after {
  content: '↑';
}
.column.desc::after {
  content: '↓';
}
.btn{
}
</style>