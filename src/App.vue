<template>
  <router-view></router-view>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { fb } from './firebase'

export default {
  name: 'App',
  components: {
  },
  setup(){
    const router = useRouter()
    const route = useRoute()

    onBeforeMount(() => {
      fb.auth().onAuthStateChanged((user) => {
        if(!user){
          router.replace('/login')
        } else if (route.path == "/login" || route.path == "/signup" || route.path == "/"){
          router.replace('profile')
        }
      })
    })
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
