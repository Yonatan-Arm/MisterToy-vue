<template>
    <section v-if="toyToEdit" class="edit-layout flex">

        <form @submit.prevent="save" class="toy-edit flex">
            <span>{{title}}</span>

           <label> name:
            <el-input type="text" placeholder="name" v-model="toyToEdit.name" />
             </label>
             <label> price:
            <el-input type="number" placeholder="price" min="0" v-model="toyToEdit.price" />
             </label>
             <label> labels:
                   <select-filter @ChangeFilter="setLabels"> </select-filter>     
             </label>
            <button>Save</button>
        </form>

        <router-link to="/toy/">Back</router-link>
    </section>
</template>

<script>
import { toyService } from "../services/toy-service.js"
import selectFilter from "../components/multi-select-filter.vue";

export default {
    data() {
        return {
            toyToEdit: {
                name:'',
                price:0,
                labels:[],
                owner: '',
            }
        }
    },
    computed:{
            toyId() {
            return this.$route.params.toyId
        },
            title() {
            return (this.toyId) ? 'Toy Edit' : 'Toy Add'
        },
         loggedinUser() {
           return this.$store.getters.loggedinUser;
     },
    },
    methods: {
        save() {
      this.$store.dispatch({ type: 'saveToy', toyToSave: this.toyToEdit })
      this.toyToEdit = toyService.getEmptyToy()
        this.$router.push('/toy');
    },
    setLabels(label){
     label.forEach((lab) =>{
    if (this.toyToEdit.labels.includes(lab)) return 
    else  this.toyToEdit.labels.push(lab)
     })
    }

    
      
    },
   async created() {
        if (this.$route.params.toyId) {
            const toy = await toyService.getById(this.$route.params.toyId)
                 this.toyToEdit = toy
        } else {
            this.toyToEdit = toyService.getEmptyToy()
        }
         this.toyToEdit.owner= this.loggedinUser
    },
    components:{
            selectFilter,
    }
}
</script>

<style>

</style>