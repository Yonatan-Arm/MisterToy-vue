<template>
    <header class="app-header">
        <div class="logo text-center">MisterToy</div>
        <nav class="links">
            <router-link to="/">Home</router-link> |
            <router-link to="/toy">Toy</router-link> |
            <router-link to="/about">About</router-link>|
            <router-link to="/toy/dashboard">dashboard</router-link>|
            <router-link to="/login">login</router-link>
        <span class="span-user"> User : {{loggedinUser}}</span>
        </nav>
    </header>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
name:'app-header',
computed:{
           loggedinUser() {
          const user= this.$store.getters.loggedinUser;
          return user?.username
     },

}
}
</script>

<style>
.span-user{
    margin: 50px
}

</style>