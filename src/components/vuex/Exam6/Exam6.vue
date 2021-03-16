<template>
  <div class="main">
      <v-app id="app">
           <v-data-table
           dense
    :headers="headers"
    :items="items"
    :items-per-page="100"
    hide-default-footer
    >
     <template v-slot:item="{ item }">
            <tr class="even" @click="() => { selectedItem = item; visible.modal = true;}">
                <td>{{item.index + 1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.brewery_type}}</td>
                <td>{{item.country}}</td>
                <td>{{item.website_url}}</td>
            </tr>
            </template>
    </v-data-table>
        <v-btn
            class="add-btn"
            color="blue darken-1"
            text
            @click="visible.input = true"
          >
            Add Item
          </v-btn>
      </v-app>
      <exam-6-modal v-if="visible.modal" :item="selectedItem" v-model="visible.modal"></exam-6-modal>
      <exam-6-input v-if="visible.input" v-model="visible.input"></exam-6-input>
    </div>
</template>
<script>
import Exam6Modal from './Exam6Modal';
import Exam6Input from './Exam6Input';

export default {
  name: 'App',
  components: {
    Exam6Modal,
    Exam6Input
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
    }
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
.add-btn{
    width: 10%;
}
</style>