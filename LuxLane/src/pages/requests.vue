<template>
  <div class="requests-container">
    <h1>Requests List</h1>
    <v-container>
      <v-row>
        <v-col v-for="request in requestsList" :key="request.bookingId" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>Booking ID: {{ request.bookingId }}</v-card-title>
            <v-card-subtitle>Status: {{ request.status }}</v-card-subtitle>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Pickup Date & Time</v-list-item-title>
                  <v-list-item-subtitle>{{ request.pickupDate }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Pickup Location</v-list-item-title>
                  <v-list-item-subtitle>{{ request.pickupLocation }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Return Date & Time</v-list-item-title>
                  <v-list-item-subtitle>{{ request.returnDate }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Return Location</v-list-item-title>
                  <v-list-item-subtitle>{{ request.returnLocation }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Payment Method</v-list-item-title>
                  <v-list-item-subtitle>{{ request.paymentMethod }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="acceptRequest(request.bookingId)">Accept</v-btn>
              <v-btn color="error" @click="denyRequest(request.bookingId)">Deny</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import requests from '@/assets/data/Requests.js';

const requestsList = ref(requests);

const acceptRequest = (bookingId) => {
  const request = requestsList.value.find(req => req.bookingId === bookingId);
  if (request) {
    request.status = 'Accepted';
  }
};

const denyRequest = (bookingId) => {
  const request = requestsList.value.find(req => req.bookingId === bookingId);
  if (request) {
    request.status = 'Denied';
  }
};
</script>

<style scoped>
.requests-container {
  padding: 20px;
}
</style>
