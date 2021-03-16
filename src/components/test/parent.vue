<template>
  <div>
    Parent counter : {{ doubleCounter }} <br>
    <button @click="addCounter">+</button>
    <button @click="subCounter">-</button>
    <!-- Child 컴포넌트를 등록하고 counter 데이터 속성을 props로 전달한다. -->
    <child></child>
  </div>
</template>

<script>
import child from './child';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    child
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'doubleCounter'
    ])
  },
  methods: {
    addCounter() {
      this.$store.dispatch('addCounter', 10);
    },
    subCounter() {
      this.$store.state.counter--;
    }
  }
};
</script>

<style>
button{
  width: 5%;
  background-color: blue;
  color: white;
  padding: 1px;
}
</style>