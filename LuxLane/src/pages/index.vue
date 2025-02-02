<template>
  <div class="video-container">
    <video autoplay loop muted class="home-video">
      <source :src="homeVideo" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="overlay-text">
      <h1>Welcome to the #1 Luxury Car Rental in Tunisia</h1>
    </div>
  </div>
  <div class="cars-list">
    <div v-for="car in cars" :key="car.carId" class="car-detail">
      <h2>{{ car.brand }} {{ car.model }}</h2>
      <p>Year: {{ car.year }}</p>
      <p>Seats: {{ car.seats }}</p>
      <p>Convertible: {{ car.isConvertible ? 'Yes' : 'No' }}</p>
      <p>Price per Day: {{ car.pricePerDay }}</p>
      <p>Availability: {{ car.isAvailable ? 'Available' : 'Not Available' }}</p>
      <p>Location: {{ car.location }}</p>
    </div>
  </div>
</template>

<script setup>
  import homeVideo from '@/assets/home-video.mp4';
  import cars from '@/assets/data/Cars.js';

</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.home-video {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  text-align: center;
  width: 100%;
}

.overlay-text h1 {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.cars-list {
  position: relative;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
}

.car-detail {
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.car-detail h2 {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.car-detail p {
  color: white;
}
</style>
