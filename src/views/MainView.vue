<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <SideBar v-if="authStore.token != ''" />
            <div class="container my-5">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import { useAuthStore } from '@/modules/auth/stores/authStore'
const authStore = useAuthStore()
</script>

<style scoped>
.container {
    display: flex;
}

.content {
    flex: 1;
    padding: 20px;
}
</style>