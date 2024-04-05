<template>
    <div class="container">
        <form>
            <h1>Registro</h1>
            <div class="mb-3">
                <label for="inputName" class="form-label">Name</label>
                <input type="text" class="form-control" id="inputName" v-model="loginForm.name">
            </div>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail" v-model="loginForm.email">
            </div>
            <div class="mb-3">
                <label for="inputPass" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="inputPass" v-model="loginForm.password">
            </div>
            <div class="mb-3">
                <label for="inputPass" class="form-label">Confirme contraseña</label>
                <input type="password" class="form-control" id="inputPass" v-model="loginForm.password_confirmation">
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-primary mx-2" :disabled="validation"
                    @click="authStore.register(JSON.stringify(loginForm))">login</button>
                <button type="button" class="btn btn-primary mx-2" @click="clear()">clear</button>
            </div>
            <router-link to="/login">¿Tiene cuenta?</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/authStore'
const authStore = useAuthStore()
const loginForm = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const validation = computed(() => {
    return loginForm.value.name == '' ||
        loginForm.value.email == '' ||
        loginForm.value.password == '' ||
        loginForm.value.password_confirmation == ''
        ? true
        : false
})

const clear = () => {
    loginForm.value.name = ''
    loginForm.value.email = ''
    loginForm.value.password = ''
    loginForm.value.password_confirmation = ''
}


</script>

<style scoped></style>