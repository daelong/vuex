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
            <tr class="even">
                <td @click="() => { selectedItem = item; visible.modal = true;}">{{item.index + 1}}</td>
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
              @click="test(item)"
              class="btn"
              color="primary"
            >
              Delete
            </v-btn>
            </td>
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
      <exam-7-modal v-if="visible.modal" :item="selectedItem" v-model="visible.modal"></exam-7-modal>
      <exam-7-input v-if="visible.input" v-model="visible.input"></exam-7-input>
      <exam-7-update v-if="visible.update" :item="selectedItem" v-model="visible.update"></exam-7-update>
    </div>
</template>
<script>
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
    test(item){
        this.$store.commit('deleteItem', item)
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