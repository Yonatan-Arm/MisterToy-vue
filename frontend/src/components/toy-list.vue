<template>
    <ul>
             <toy-preview @removeToy="removeToy" v-for="toy in toys" :toy="toy" :key="toy._id" />
    </ul>
</template>

<script>
import toyPreview from "./toy-preview.vue"
export default {
name:'toy-list',
props:{
toys: {
    type:Array,
},
},
      components: {
    toyPreview,
  },
  methods:{
      removeToy(toyId) {
          this.$emit('removeToy',toyId)
      }
  }
}
</script>

<style>

</style>