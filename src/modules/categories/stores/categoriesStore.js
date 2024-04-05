import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/modules/auth/stores/authStore'

const authStore = useAuthStore()

export const useCategoriesStore = defineStore(
  'categories',
  () => {
    const url = `${import.meta.env.VITE_API_URL}/categories`
    const categories = ref([])
    const getCategories = async () => {
      await axios
        .get(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: authStore.token
          }
        })
        .then(function (response) {
          if (response.data.status) {
            categories.value = response.data.categories
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    }
    const addCategory = async (category) => {
      await axios
        .post(url, category, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: authStore.token
          }
        })
        .then(function (response) {
          if (response.data.status) {
            getCategories()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    const deleteCategory = async (id) => {
      await axios
        .delete(`${url}/${id}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: authStore.token
          }
        })
        .then(function (response) {
          if (response.data.status) {
            getCategories()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    const getCategory = (id) => {
      return categories.value.find((category) => category.id == id)
    }
    return {
      categories,
      getCategories,
      addCategory,
      deleteCategory,
      getCategory
    }
  },
  { persist: true }
)
