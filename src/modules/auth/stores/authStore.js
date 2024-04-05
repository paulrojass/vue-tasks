import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const url = `${import.meta.env.VITE_API_URL}`
    const user = ref({})
    const token = ref('')
    const register = async (params) => {
      await axios
        .post(`${url}/register`, params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log(response)
          if (response.data.status) {
            user.value = response.data.user
            token.value = `Bearer ${response.data.token}`
            router.push({ path: '/tasks' })
          }
        })
        .catch((error) => {
          responseError(error)
        })
    }
    const login = async (params) => {
      await axios
        .post(`${url}/login`, params, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log(response)
          if (response.data.status) {
            user.value = response.data.user
            token.value = `Bearer ${response.data.token}`
            router.push({ path: '/tasks' })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
    const logout = async () => {
      await axios
        .get(`${url}/logout`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: token.value
          }
        })
        .then((response) => {
          console.log(response)
          if (response.data.status) {
            user.value = {}
            token.value = ''
            router.push({ path: '/login' })
          }
        })
        .catch((error) => {
          responseError(error)
        })
    }
    const responseError = (error) => {
      console.log('error login')
      console.log(error.response)
    }
    return { user, token, register, login, logout }
  },
  { persist: true }
)
