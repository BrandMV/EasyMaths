<template>
    <div>
        <sidebar />
        <div :style="{ 'margin-left': sidebarWidth }">

        </div>

        
    </div>
</template>

<script>
import Sidebar from '../Account/Sidebar/Sidebar.vue'
import { sidebarWidth } from '../Account/Sidebar/state'

export default {
  components: { Sidebar },
  setup() {
      return { sidebarWidth }
  }
    
}
</script>

<style scoped>
    
</style>