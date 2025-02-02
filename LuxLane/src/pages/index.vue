<template>
  <div style="position: relative; width: 100%; height: 100vh; overflow: hidden;">
    <video autoplay loop muted style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: auto;">
      <source src="@/assets/home-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
  import homeVideo from '@/assets/home-video.mp4';
</script>
