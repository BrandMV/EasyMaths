<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collapsed } from './state'

export default {
    props:{
        to: { type: String, required: true },
        icon: { type: String, required: true },
    },
    setup(props){
        const route = useRoute()
        const isActive = computed(() => route.path == props.to)
        return { isActive, collapsed }
    },

    
}
</script>

<template>
    <router-link :to="to" class="link" :class="{ active: isActive }">
       <i class="icon" :class="icon"></i>
       <transition name="fade">
            <span v-if="!collapsed">
                <slot />   
            </span> 
       </transition>
    </router-link>
</template>

<style>
    .link:first-child{
        margin-top: 6rem;
    }
    .link{
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        font-weight: 400;
        user-select: none;
        margin: 4rem auto;
        border-radius: 0.25rem;
        padding: 2rem 0;
        height: 1.5rem;
        width: 100%;
        color: white;
        text-decoration: none;
    }

    .fade-enter-active, .fade-leave-active{
        transition: opacity 0.1s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }

    .link:hover{
        background: var(--sidebar-item-hover);
    }
    .link.active{
        background: var(--sidebar-item-hover);
    }
    .link .icon{
        flex-shrink: 0;
        width: 2.4rem;
        margin-right: 2rem;
        margin-left: 1rem;
    }
</style>