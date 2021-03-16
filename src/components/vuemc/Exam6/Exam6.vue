<template>
  <div class="main">
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
        <tr class="odd" v-for="(item, index) in tasks.models" :key="index" @click="() => { selectedItem = item; visible.modal = true;}">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.brewery_type}}</td>
            <td>{{item.country}}</td>
            <td>{{item.website_url}}</td>
        </tr>
      </tbody>
      </table> 
        <v-btn
            color="blue darken-1"
            text
            @click="visible.input = true"
          >
            Add Item
          </v-btn>
      <exam-6-modal v-if="visible.modal" :item="selectedItem" v-model="visible.modal"></exam-6-modal>
      <exam-6-input v-if="visible.input" v-model="visible.input" @submit="addItem"></exam-6-input>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<script>
import { tasks } from '@/assets/scripts/mc';
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
      tasks: tasks,
        selectedItem: {},
       visible: {
        modal: false,
        input: false,
      },
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
     addItem(item){
      this.tasks.add(item);
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