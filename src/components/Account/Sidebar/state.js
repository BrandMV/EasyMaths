import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const sidebar_width = 18
export const sidebar_width_collapsed = 4.8
export const sidebarWidth = computed(
    () => `${collapsed.value ? sidebar_width_collapsed : sidebar_width}rem`
)