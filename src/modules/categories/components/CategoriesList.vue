<template>
    <div class="container">
        <div class="row">
            <h2>Categorías</h2>
            <p>Debe agregar categorías antes de agregar una <strong>tarea</strong></p>
            <div class="col-12">
                <div class="col-12">
                    <label for="inputName">Agregar nueva categoría</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="inputName"
                            placeholder="Ingrese el nombre y presione enter" v-model="newCategory.name"
                            @keyup.enter="addCategory">
                    </div>
                </div>
            </div>
            <div class="col-12">
                <table class="table" v-if="categoriesStore.categories.length > 0">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Categoria</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in categoriesStore.categories" :key="index">
                            <th scope="row">{{ category.id }}</th>
                            <td>{{ category.name }}
                            </td>
                            <td>
                                <button type="text" class="btn btn-primary mx-2"
                                    @click="categoriesStore.deleteCategory(category.id)">Borrar</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5 v-else> No Se han agregado categorías</h5>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useCategoriesStore } from '../stores/categoriesStore.js'
import { useAuthStore } from '@/modules/auth/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()

onBeforeMount(() => {
    if (authStore.token == '') router.push({ name: 'login' })
    categoriesStore.getCategories()
})
const newCategory = ref({ name: '' })
const addCategory = () => {
    //categories.value.push(newCategory.value);
    categoriesStore.addCategory(newCategory.value)
    newCategory.value.name = '';
}
</script>

<style lang="scss" scoped></style>