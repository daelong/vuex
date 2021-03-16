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
        <tr class="odd" v-for="(item, index) in tasks.models" :key="index" >
            <td @click="() => { selectedItem = item; visible.modal = true;}">{{index+1}}</td>
            <td @click="() => { selectedItem = item; visible.modal = true;}">{{item.name}}</td>
            <td @click="() => { selectedItem = item; visible.modal = true;}">{{item.brewery_type}}</td>
            <td @click="() => { selectedItem = item; visible.modal = true;}">{{item.country}}</td>
            <td @click="() => { selectedItem = item; visible.modal = true;}">{{item.website_url}}</td>
              <td><v-btn
                  @click="() => { selectedItem = item; visible.update = true;}"
                  class="btn"
                  color="primary"
                >
                  Edit
                </v-btn>
            </td>
             <td><v-btn
              @click="tasks.remove(item)"
              class="btn"
              color="primary"
            >
              Delete
            </v-btn>
            </td>
        </tr>
      </tbody>
      </table> 
        <v-btn
            color="blue darken-1"
            class="btn"
            text
            @click="visible.input = true"
          >
            Add Item
          </v-btn>
      <exam-7-modal v-if="visible.modal" :item="selectedItem" v-model="visible.modal"></exam-7-modal>
      <exam-7-input v-if="visible.input" v-model="visible.input" @submit="addItem"></exam-7-input>
      <exam-7-update v-if="visible.update" :item="selectedItem" v-model="visible.update" @submit="updateItem"></exam-7-update>
      </v-app>
  </div>
</template>
<script>
import { tasks } from '@/assets/scripts/mc';
import Exam7Modal from './Exam7Modal';
import Exam7Input from './Exam7Input';
import Exam7Update from './Exam7Update';

export default {
  name: 'App',
  components: {
    Exam7Modal,
    Exam7Input,
    Exam7Update
  },
  data(){
    return{
      tasks: tasks,
        selectedItem: {},
       visible: {
        modal: false,
        input: false,
        update: false,
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
    },
    updateItem(item){
      item.save('save complete');
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
    width: 10%;
}
</style>