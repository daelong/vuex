<template>
    <v-app id="app">
        <div class="main">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                {{selectedItem.name}}
                </v-card-title>
                <v-card-text>
                    <div>brewery_type:  {{selectedItem.brewery_type}}</div>
                    <div>country:  {{selectedItem.country}}</div>
                    <div>state:   {{selectedItem.state}}</div>
                    <div>city:  {{selectedItem.city}}</div>
                    <div>phone:  {{selectedItem.phone}}</div>
                    <div>website_url:  <a :href="item.website_url">{{selectedItem.website_url}}</a></div>
                    <div></div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="$emit('input', false)"
                    >
                        close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-app>
</template>
name, brewery_type, country, state, city, phone, website_url
<script>
export default {
   props:{
        item: {},
        value: Boolean,
    },
    data(){
        return{
            selectedItem: {}
        }
    },
    mounted(){
        this.selectedItem = this.item;
    }
}
</script>
<style scoped>
.main{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    background: rgba(0, 0, 0, 0.25);
    /* width: 100%;
    height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>