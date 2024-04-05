<template>
    <div class="container">
        <div class="row">
            <h2>Lista de Tareas</h2>
            <div class="col-12">
                <p v-if="!edit">Agregar Tarea</p>
                <p v-else>Editar tarea id: {{ taskToEdit.id }}</p>
                <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                        <label class="visually-hidden" for="inputName">Nombre</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="inputName" placeholder="Nombre"
                                v-model="newTask.text">
                        </div>
                    </div>

                    <div class="col-12">
                        <label class="visually-hidden" for="selectCategories">Categoría</label>
                        <select class="form-select" id="selectCategories" v-model="newTask.category_id">
                            <option value="">Seleccione categoría</option>
                            <option v-for="category in categoriesStore.categories" :key="category.id"
                                :value="category.id">{{ category.name }}</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <button type="button" class="btn btn-primary" :disabled="validation" @click="addTask"
                            v-if="!edit">Agregar</button>
                        <div v-else>
                            <button type="button" class="btn btn-primary mx-2" :disabled="validation"
                                @click="updateTask">Actualizar</button>
                            <button type="button" class="btn btn-primary mx-2" @click="cancelEdit">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-12">
                <table class="table" v-if="tasksStore.tasks.length > 0">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Finalizada</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in tasksStore.tasks" :key="task.id">
                            <th scope="row">{{ task.id }}</th>
                            <td>{{ task.text }}</td>
                            <td>
                                {{ categoriesStore.getCategory(task.category_id).name }}
                            </td>
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" :checked="task.finished"
                                        @click="changeStatus(task)">
                                </div>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary" @click="editTask(task)"
                                    :disabled="edit">Editar</button>
                                <button type="button" class="btn btn-primary" @click="tasksStore.deleteTask(task.id)"
                                    :disabled="edit">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5 v-else>No se han asignado Tareas</h5>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useTasksStore } from '../stores/tasksStore';
import { useAuthStore } from '@/modules/auth/stores/authStore';
import { useCategoriesStore } from '@/modules/categories/stores/categoriesStore';
import { useRouter } from 'vue-router'

const router = useRouter()
const tasksStore = useTasksStore()
const categoriesStore = useCategoriesStore()
const authStore = useAuthStore()
const edit = ref(false)
const taskToEdit = ref({})
onBeforeMount(() => {
    if (categoriesStore.categories.length <= 0) router.push({ name: 'categories' })
    if (authStore.token == '') router.push({ name: 'login' })
    tasksStore.getTasks()
})

//const tasks = ref([])
const newTask = ref({
    text: '',
    category_id: ''
})

const addTask = () => {
    tasksStore.addTask(newTask.value)
    newTask.value.text = ''
    newTask.value.category_id = ''
}

const editTask = (task) => {
    edit.value = true
    taskToEdit.value = task
    newTask.value.text = taskToEdit.value.text
    newTask.value.category_id = taskToEdit.value.category_id
    //tasksStore.updateTask(id)
}

const updateTask = () => {
    tasksStore.updateTask(newTask.value, taskToEdit.value.id)
    cancelEdit()
}

const cancelEdit = () => {
    edit.value = false
    taskToEdit.value = {}
    newTask.value.text = ''
    newTask.value.category_id = ''
}

const changeStatus = (task) => {
    let status = !task.finished
    tasksStore.changeStatusTask(status, task.id)
}

const validation = computed(() => {
    return newTask.value.text == '' ||
        newTask.value.category_id === ''
        ? true
        : false
})
</script>

<style lang="scss" scoped></style>