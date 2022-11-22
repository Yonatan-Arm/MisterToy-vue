<template>
    <section class="main-layout" >
        <toy-filter @filter="setFilter"> </toy-filter>
        <router-link to="/toy/edit/" class="add-toy">Add New Toy</router-link>
        <toy-list :toys="toys" @removeToy="removeToy" class="main-cards"></toy-list>
        <p v-if="isLoading">Loading...</p>

    </section>
</template>

<script>

import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'

export default {
name:'toy-app',
    data() {
        return {
             filterBy: null,
        }
    },
    computed: {
        toys() {
            return this.$store.getters.getToys
        },
        isLoading() {
            return this.$store.getters.isLoading
        }
    },
    methods: {
        removeToy(toyId) {
            this.$store.dispatch({type:'removeToy',toyId})
                .then(()=>{
                    // console.log('success')
                })
                .catch(() => {
                    console.log('Error')
                })
        },
      setFilter(filterBy) {
      this.$store.dispatch({ type: 'setFilter', filterBy })
          .then(()=>{
                    // console.log('success')
                })
                .catch(() => {
                    console.log('Error')
                })
        },


    },
      components: {
    toyList,
    toyFilter,
  },
}
</script>

<style>

</style>