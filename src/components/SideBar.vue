<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-5 d-none d-sm-inline">Menú</span>
      </a>
      <div class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white">
        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Avatar" class="rounded-circle me-2" width="40"
          height="40">
        <div>
          <span class="fs-5 d-none d-sm-inline">{{ authStore.user.name }}</span>
          <br>
          <span class="d-none d-sm-inline">{{ authStore.user.email }}</span>
        </div>
      </div>
      <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        <li class="nav-item">
          <router-link to="/tasks" class="nav-link align-middle px-0">
            <span class="ms-1 d-none d-sm-inline">Tareas</span>
          </router-link>
        </li>
        <li>
          <router-link to="/categories" class="nav-link align-middle px-0">
            <span class="ms-1 d-none d-sm-inline">Categorías</span>
          </router-link>
        </li>
        <li>
          <a href="javascript:void(0)" @click="authStore.logout" class="nav-link align-middle px-0">
            <span class="ms-1 d-none d-sm-inline">Cerrar Sesión</span>
          </a>
        </li>
        <!-- <li>
                            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                <i class="fs-4 bi-speedometer2"></i>
                                <span class="ms-1 d-none d-sm-inline">Panel de Control</span>
                            </a>
                            <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="#" class="nav-link px-0">
                                        <span class="d-none d-sm-inline">Elemento</span> 1
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0">
                                        <span class="d-none d-sm-inline">Elemento</span> 2
                                    </a>
                                </li>
                            </ul>
                        </li> -->
        <!-- Agrega más elementos de menú según tus necesidades -->
      </ul>
      <!-- Opcional: Agrega un dropdown para el perfil del usuario -->
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/modules/auth/stores/authStore'
const authStore = useAuthStore()
</script>

<style scoped></style>
