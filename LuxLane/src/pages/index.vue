<template>
  <!-- ✅ Modern Hero Section with Video Background -->
  <div class="hero-section">
    <video autoplay loop muted class="hero-video">
      <source :src="homeVideo" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="hero-overlay">
      <h1>Drive Luxury. Experience Perfection.</h1>
      <p>Premium Luxury Car Rentals in Tunisia</p>
    </div>
  </div>

  <!-- ✅ Luxury Deal of the Day -->
  <v-container class="fade-in text-center">
    <h2 class="section-title">Luxury Deal of the Day</h2>
    <v-card v-if="dealOfTheDay" class=" car-card card_margin mx-auto " height="450px" width="400px">
      <v-img :src="getImage(dealOfTheDay.images[0])" class="deal-image" @click="goToCarDetails(dealOfTheDay.carId)" />
      <v-card-title>{{ dealOfTheDay.brand }} {{ dealOfTheDay.model }}</v-card-title>
      <v-card-subtitle>Now only ${{ dealOfTheDay.pricePerDay }}/day</v-card-subtitle>
      <v-card-text>
        <p>Seats: {{ dealOfTheDay.seats }} | Convertible: {{ dealOfTheDay.isConvertible ? 'Yes' : 'No' }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="goToCarDetails(dealOfTheDay.carId)">View Deal</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

  <!-- ✅ Featured Cars Carousel -->
  <v-container class="fade-in text-center">
    <h2 class="section-title">Our Featured Luxury Cars</h2>
    <v-carousel show-arrows="hover" height="600px" cycle hide-delimiter-background>
      <v-carousel-item v-for="(carGroup, index) in displayedCars" :key="index">
        <v-row justify="center">
          <v-col v-for="car in carGroup" :key="car.carId" cols="12" sm="6" md="4">
            <v-card class="car-card card_margin ">
              <v-carousel cycle height="180px" hide-delimiters show-arrows-on-hover>
                <v-carousel-item v-for="(image, i) in car.images" :key="i">
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
      </v-carousel-item>
    </v-carousel>
  </v-container>

  <!-- ✅ Meet Our Sponsors Section -->
  <h1 class="section-title text-center">Meet Our Sponsors</h1>

  <!-- ✅ Sponsors Section with Blurry Background -->
  <div class="sponsor-section">
    <div class="sponsor-overlay">
      <img v-for="(sponsor, index) in sponsors" :key="index" :src="sponsor.image" :alt="sponsor.name" class="sponsor-image" />
    </div>
  </div>
</template>

<script setup>
import homeVideo from '@/assets/home-video.mp4';
import cars from '@/assets/data/Cars.js';
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dealOfTheDay = ref(null);

const loadCarsFromLocalStorage = () => {
  const storedCars = localStorage.getItem('carsList');
  return storedCars ? JSON.parse(storedCars) : cars;
};

const carsList = ref(loadCarsFromLocalStorage());

const displayedCars = computed(() => {
  let groups = [];
  for (let i = 0; i < carsList.value.length; i += 3) {
    groups.push(carsList.value.slice(i, i + 3));
  }
  return groups;
});

// ✅ Dynamic Sponsors List
const sponsors = ref([
  { name: "Sponsor 1", image: new URL("@/assets/sponsers/sponsor1.png", import.meta.url).href },
  { name: "Sponsor 2", image: new URL("@/assets/sponsers/sponsor2.png", import.meta.url).href },
  { name: "Sponsor 3", image: new URL("@/assets/sponsers/sponsor3.png", import.meta.url).href }
]);

onMounted(() => {
  dealOfTheDay.value = carsList.value[Math.floor(Math.random() * carsList.value.length)];
});

const goToCarDetails = (carId) => {
  router.push(`/car/${carId}`);
};

const getImage = (path) => {
  if (!path) return "";
  return new URL(path.replace("@/", "/src/"), import.meta.url).href;
};
</script>

<style scoped>
/* ✅ Hero Section with Video Background */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
}

.hero-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 30px;
  text-align: center;
  width: 80%;
  border-radius: 10px;
}

/* ✅ Sponsor Section with Blurry Background */
.sponsor-section {
  padding: 50px;
  position: relative;
}

.sponsor-overlay {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
  padding: 50px;
  display: flex;
  justify-content: center;
  gap: 200px; /* Increased gap for more spacing */
  flex-wrap: wrap;
}

.sponsor-image {
  width: 120px;
  height: auto;
  transition: transform 0.3s ease;
}

.sponsor-image:hover {
  transform: scale(1.1);
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

/* ✅ Center Titles */
.section-title {
  text-align: center;
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
