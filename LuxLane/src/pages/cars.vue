<template>
  <div class="cars-container">
    <h1>Cars List</h1>
    <v-container>
      <v-row>
        <v-col v-for="car in carsList" :key="car.carId" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>{{ car.brand }} {{ car.model }}</v-card-title>
            <v-card-subtitle>Year: {{ car.year }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="6"><strong>Seats:</strong> {{ car.seats }}</v-col>
                <v-col cols="6"><strong>Convertible:</strong> {{ car.isConvertible ? 'Yes' : 'No' }}</v-col>
                <v-col cols="6"><strong>Price/Day:</strong> ${{ car.pricePerDay }}</v-col>
                <v-col cols="6">
                  <strong>Availability:</strong>
                  <v-chip :color="car.isAvailable ? 'green' : 'red'" dark>
                    {{ car.isAvailable ? 'Available' : 'Unavailable' }}
                  </v-chip>
                </v-col>
                <v-col cols="12"><strong>Location:</strong> {{ car.location }}</v-col>
              </v-row>
              <v-card-actions>
                <v-btn color="primary" variant="plain" block @click="goToCarDetails(car.carId)">View More Details</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import cars from '@/assets/data/Cars.js';

const carsList = ref(cars);
const router = useRouter();

const goToCarDetails = (carId) => {
  router.push(`/car/${carId}`);
};
</script>

<style scoped>
.cars-container {
  padding: 20px;
}

.v-card {
  margin-bottom: 20px;
}
</style>
