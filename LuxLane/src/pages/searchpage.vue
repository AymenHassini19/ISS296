<template>
    <v-container>
      <h2 class="search-title">Search Results for "{{ searchQuery }}"</h2>
  
      <!-- Loading Screen -->
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p>Loading results...</p>
        </v-col>
      </v-row>
  
      <!-- Search Results -->
      <v-row v-else-if="filteredCars.length > 0">
        <v-col v-for="car in filteredCars" :key="car.carId" cols="12" sm="6" md="4">
          <v-card class="car-card">
            <!-- Image Carousel (Does NOT Navigate) -->
            <v-carousel cycle height="200px" hide-delimiters show-arrows="hover">
              <v-carousel-item v-for="(image, index) in car.images" :key="index">
                <v-img :src="getImage(image)" class="car-image" @click="goToCarDetails(car.carId)"></v-img>
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
              <v-card-actions>
            <v-btn color="primary" variant="plain" block @click="goToCarDetails(car.carId)">View More Details</v-btn>
          </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- No Results Screen -->
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <h1>No results found</h1>
          <p>Try searching for something else, or explore these suggestions:</p>
          <v-chip-group>
            <v-chip v-for="(suggestion, index) in randomSuggestions" :key="index" @click="searchAgain(suggestion)">
              {{ suggestion }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import cars from "@/assets/data/Cars.js";
  
  const route = useRoute();
  const router = useRouter();
  const searchQuery = ref(route.query.q || ""); 
  const loading = ref(true);
  
  // Suggested searches if no results are found
  const suggestions = ["Ferrari", "Lamborghini", "Rolls-Royce", "Convertible", "Luxury SUV"];
  const randomSuggestions = ref([]);
  
  // Update search query when route changes
  watch(() => route.query.q, (newQuery) => {
    searchQuery.value = newQuery || "";
  });
  
  // Simulate loading effect
  onMounted(() => {
    randomSuggestions.value = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
  
  // Filtered search results
  const filteredCars = computed(() => {
    if (!searchQuery.value) return cars;
  
    const search = searchQuery.value.toLowerCase();
    return cars.filter(car => 
      car.brand.toLowerCase().includes(search) ||
      car.model.toLowerCase().includes(search) ||
      car.location.toLowerCase().includes(search)
    );
  });

  
  // Redirect to CarDetails page
  const goToCarDetails = (carId) => {
    router.push(`/car/${carId}`);
  };
  
  // Search again when clicking suggestions
  const searchAgain = (query) => {
    router.push({ path: "/search", query: { q: query } });
  };
  
  // Function to resolve image paths
  const getImage = (path) => {
    if (!path) return "";
    return new URL(path.replace("@/", "/src/"), import.meta.url).href;
  };
  </script>
  
  <style scoped>
  .search-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* ✅ Car Card */
  .car-card {
    transition: transform 0.3s ease;
    cursor: pointer;
    overflow: hidden;
  }
  
  .car-card:hover {
    transform: scale(1.03);
    box-shadow: 0px 4px 15px rgba(255, 75, 43, 0.8);
  }
  
  /* ✅ Image Styling */
  .car-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    cursor: pointer;
  }

  
  
  /* ✅ No Results Section */
  .v-chip-group {
    margin-top: 10px;
  }
  
  
  
  
  </style>
  