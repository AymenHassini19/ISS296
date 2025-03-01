<template>
  <div class="users-container">
    <h1>Users List</h1>
    <v-container>
      <v-row>
        <v-col v-for="user in users" :key="user.email" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>{{ user.email }}</v-card-title>
            <v-card-subtitle>{{ user.isAdmin ? 'Admin' : 'User' }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import users from '@/assets/data/Users.js';

const usersList = ref(users);
</script>

<style scoped>
.users-container {
  padding: 20px;
}

.v-card {
  margin-bottom: 20px;
}
</style>
