<template>
  <div class="main">
      <v-app id="app">
    <table>
      <thead>
        <tr>
          <th>index</th>
          <th
          v-for="col in column"
          :key="col.key"
            class="column"
          :class="sortBy === col.key ? orderBy : null"
          @click="onSort(col.key)"
          >
            {{col.text}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd" v-for="(item, index) in tasks.models" :key="index" @click="() => { selectedItem = item; visible = true;}">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.brewery_type}}</td>
            <td>{{item.country}}</td>
            <td>{{item.website_url}}</td>
        </tr>
      </tbody>
      </table> 
        <v-pagination
      v-model="page"
      :length="10"
      ></v-pagination>
    </v-app>
      <exam-5-modal v-if="visible" :item="selectedItem" v-model="visible"></exam-5-modal>
  </div>
</template>
<script>
import { tasks } from '@/assets/scripts/mc';
import Exam5Modal from './Exam5Modal';

export default {
  name: 'App',
  components: {
    Exam5Modal
  },
  data(){
    return{
      tasks: tasks,
      selectedItem: {},
      page: 1,
      visible: false,
      column: [
          {
            key: 'name',
            text: 'Name'
          },
          {
            key: 'brewery_type',
            text: 'Type'
          },
          {
            key: 'country',
            text: 'Country'
          },
          {
            key: 'website_url',
            text: 'website_url'
          },
        ],
      sortBy: null,
      orderBy: null,
    }
  },  
  mounted(){
    console.log(this.tasks);
  },
  computed:{
 
  },
  methods:{
     onSort(key){
        if (this.sortBy !== key) {
          this.sortBy = key;
          this.orderBy = 'asc';
          this.tasks.sort('name');
        } else if (this.orderBy === 'asc') {
          this.tasks.models.reverse();
          this.orderBy = 'desc'; 
        } else if (this.orderBy === 'desc') {
          this.orderBy = null;
          this.sortBy = null;
          this.tasks.sort('id');
        }
    },
  },
   watch:{
    page: function(){
      //vuetify로 pagination을 사용할 때 어쩔수 없이 v-model을 이용해야함 그러면 data값을 사용해서 값을 바꿔줘야함.
      this.tasks.setOption('page', this.page);
      this.tasks.fetch();
    //  this.tasks.set('page', this.page);
    //  this.tasks.fetch();
    }
  }
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
.odd:nth-child(even){
  background-color: #c7ecee;
}
.odd:hover{
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