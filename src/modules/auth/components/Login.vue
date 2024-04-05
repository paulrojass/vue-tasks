<template>
    <div class="container">
        <form>
            <h1>Acceso</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" v-model="loginForm.email">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="loginForm.password">
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-primary mx-2" :disabled="validation"
                    @click="authStore.login(JSON.stringify(loginForm))">login</button>
                <button type="button" class="btn btn-primary mx-2" @click="clear()">clear</button>
            </div>
            <router-link to="/register">¿Desea registrarse?</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/authStore'
const authStore = useAuthStore()
const loginForm = ref({
    email: '',
    password: ''
});

const validation = computed(() => {
    return loginForm.value.email == '' ||
        loginForm.value.password == ''
        ? true
        : false
});

const clear = () => {
    loginForm.value.email = '';
    loginForm.value.password = '';
}

</script>

<style scoped></style>