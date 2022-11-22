<template>
<app-header></app-header>
<router-view></router-view>
<app-footer></app-footer>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
export default {
  name:'app',
  components: {
    appHeader,
    appFooter,
  },
    created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
}
</script>



<style>

</style>
