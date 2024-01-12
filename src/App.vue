<script setup>
import { userUserStore } from '@/stores/index.js'

const userStore = userUserStore()
</script>

<template>
  <router-view></router-view>

  <hr />
  <hr />
  <hr />
  <hr />
  我是App
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('djiasdaidhya')">登录</el-button>
  <el-button @click="userStore.removeToken">退出</el-button>
</template>

<style scoped></style>
