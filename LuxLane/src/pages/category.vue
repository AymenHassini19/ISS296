<template> 
    <v-container class="category-container fade-in">
      <h2 class="section-title text-center">{{ displayCategory }}s</h2>
      <v-row>
        <v-col v-for="car in filteredCars" :key="car.carId" cols="12" sm="6" md="4">
          <v-card class="car-card card_margin">
            <v-carousel cycle height="200px" hide-delimiters show-arrows-on-hover>
              <v-carousel-item v-for="(image, index) in car.images" :key="index">
                <v-img :src="getImage(image)" class="car-image" @click="goToCarDetails(car.carId)" />
              </v-carousel-item>
            </v-carousel>
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
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="plain" block @click="goToCarDetails(car.carId)">View More Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import cars from '@/assets/data/Cars.js';

const route = useRoute();
const router = useRouter();

// ✅ Normalize strings: lowercase and replace spaces with hyphens
const normalize = (str) => str.toLowerCase().replace(/\s+/g, '-');

// ✅ categoryParam reflects the current category from the URL
const categoryParam = computed(() => route.params.category);

// ✅ Display formatted category title
const displayCategory = computed(() => {
  const cp = categoryParam.value || '';
  return cp.charAt(0).toUpperCase() + cp.slice(1);
});

// ✅ Filter cars based on category
const filteredCars = computed(() => {
  return cars.filter(car => normalize(car.category) === categoryParam.value);
});

// ✅ Watch for category changes to handle dynamic routing
watch(() => route.params.category, (newCategory, oldCategory) => {
  console.log(`Category changed from ${oldCategory} to ${newCategory}`);
});

// ✅ Navigate to the Car Details page
const goToCarDetails = (carId) => {
  router.push(`/car/${carId}`);
};

// ✅ Resolve image paths
const getImage = (path) => {
  if (!path) return "";
  return new URL(path.replace("@/", "/src/"), import.meta.url).href;
};
</script>
  
<style scoped>
.category-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.section-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin: 40px 0;
}

.car-card {
  transition: transform 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.car-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 4px 15px rgba(255, 75, 43, 0.8);
}

.car-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}

/* ✅ Fade-in Effect */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card_margin {
  margin-top: 50px;
}
</style>
