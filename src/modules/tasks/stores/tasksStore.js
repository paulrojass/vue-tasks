import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/modules/auth/stores/authStore'

const authStore = useAuthStore()

export const useTasksStore = defineStore('tasks', () => {
  const url = `${import.meta.env.VITE_API_URL}/tasks`
  const tasks = ref([])
  const getTasks = async () => {
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
          tasks.value = response.data.tasks
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const addTask = async (task) => {
    console.log(task)
    await axios
      .post(url, task, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: authStore.token
        }
      })
      .then(function (response) {
        if (response.data.status) {
          getTasks()
        }
      })
      .catch(function (error) {
        // Si hubo algun error mostramos algo
        console.log(error)
      })
  }
  const updateTask = async (task, id) => {
    await axios
      .put(`${url}/${id}`, task, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: authStore.token
        }
      })
      .then(function (response) {
        if (response.data.status) {
          getTasks()
        }
      })
      .catch(function (error) {
        // Si hubo algun error mostramos algo
        console.log(error)
      })
  }
  const changeStatusTask = async (finished, id) => {
    await axios
      .patch(
        `${url}/${id}`,
        { finished: finished },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: authStore.token
          }
        }
      )
      .then(function (response) {
        if (response.data.status) {
          getTasks()
        }
      })
      .catch(function (error) {
        // Si hubo algun error mostramos algo
        console.log(error)
      })
  }
  const deleteTask = async (id) => {
    await axios
      .delete(`${url}/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: authStore.token
        }
      })
      .then(function (response) {
        // Mostramos los datos obtenidos en la consola
        console.log(response)
        if (response.data.status) {
          getTasks()
        }
      })
      .catch(function (error) {
        // Si hubo algun error mostramos algo
        console.log(error)
      })
  }
  return {
    tasks,
    getTasks,
    addTask,
    updateTask,
    changeStatusTask,
    deleteTask
  }
})
