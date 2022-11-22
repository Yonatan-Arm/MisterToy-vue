<template>
    <h1>Welcome To Mister Toy dashboard</h1>
    <section class="dashboard flex">
        <div class="chart">
        <chart />
        </div>
        <div class="map">
        <map-locatin> </map-locatin>
        </div>

    <img-upload> </img-upload>

    </section>
</template>

<script>
     import chart from '../components/chart.vue'
     import mapLocatin from '../components/map-locations.vue'
     import imgUpload from '../components/img-upload.vue'
export default {
    components:{
        chart, 
        mapLocatin,
        imgUpload

    },
}
</script>

<style>

</style>