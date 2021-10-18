<script>
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue'
export default {
    name: "Sidebar",
    props:{},
    components: { SidebarLink },
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth }
    }
    
}
</script>

<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <div class="title">
            <h1>
                <span v-if="collapsed">
                    <div>E</div>
                    <div>M</div>
                </span>
                <span v-else>Easy Maths</span>
            </h1>    
        </div>
        
        <SidebarLink to="/" icon="fas fa-tasks">Mi progreso</SidebarLink>
        <SidebarLink to="/" icon="fas fa-graduation-cap">Aprende</SidebarLink>
        <SidebarLink to="/profile" icon="fas fa-cog">Mi cuenta</SidebarLink>

        <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar"><i class="fas fa-angle-double-left"></i></span>

        <span class="logout-icon"><i class="fas fa-sign-out-alt" ></i></span>
        
    </div>
</template>



<style>
    :root {
        --sidebar-bg-color: #181824;
        --sidebar-item-hover: rgba(255, 255, 255, 0.1);;
    }
    
</style>

<style scoped>
    .sidebar{
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        background: var(--sidebar-bg-color);
        float: left;
        position: fixed;
        z-index: 1;
        padding: 0.5rem;
        left: 0;
        top: 0;
        bottom: 0;
        transition: 0.3s all ease-out;
    }
    .title{
        position: fixed;
        font-size: 1.5rem;
        top: 10rem;
    }
    
    .collapse-icon{
        position: absolute;
        top: 2rem;
        padding: 0.75rem;
        color: white;
        transition: 0.3s all ease-out;
        font-size: 2.4rem;
    }
    .logout-icon{
        position: absolute;
        bottom: 5rem;
        right: 8rem;
        color: white;
        transition: 0.3s all ease-out;
        font-size: 2.4rem;
    }
    .rotate-180{
        transform: rotate(180deg);
        transition: 0.3s linear;
    }
</style>

