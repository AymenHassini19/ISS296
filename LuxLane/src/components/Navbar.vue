<template>
  <nav class="navbar custom-navbar">
    <!-- Left Side: Logo & Home Button -->
    <div class="navbar-left">
      <a class="navbar-brand" @click.prevent="goHome">LuxLane</a>
      <v-btn icon variant="plain" class="home-button" @click.prevent="goHome">
        <v-icon class="home-icon">mdi-home</v-icon>
      </v-btn>
    </div>

    <!-- Middle: Dropdown Menus & Search Bar -->
    <div class="navbar-middle">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="gradient-button">
            Brands
            <v-icon class="ml-2">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list class="glassmorphic-menu">
          <v-list-item v-for="(brand, index) in brands" :key="index" @click="navigateToBrand(brand)">
            <v-list-item-title>{{ brand }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="gradient-button">
            Categories
            <v-icon class="ml-2">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list class="glassmorphic-menu">
          <v-list-item v-for="(category, index) in categories" :key="index" @click="navigateToCategory(category)">
            <v-list-item-title>{{ category }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="gradient-button">
            Support
            <v-icon class="ml-2">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list class="glassmorphic-menu">
          <v-list-item v-for="(item, index) in supportItems" :key="index" @click="navigateToSupport(item.route)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Search Bar (unchanged) -->
      <v-text-field
        v-model="searchQuery"
        placeholder="Search for a luxury car..."
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
        class="search-bar"
        @keyup.enter="handleSearch"
      ></v-text-field>
    </div>

    <!-- Right Side: User Profile/Login -->
    <div class="navbar-right">
      <v-menu v-if="isLoggedIn" open-on-hover>
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props" :src="userPhoto" size="40" ></v-avatar>

        </template>
        <v-list class="glassmorphic-menu">
          <v-list-item @click="settingsDialog = true">
            <v-icon class="mr-2">mdi-cog</v-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToBookings">
            <v-icon class="mr-2">mdi-calendar-check</v-icon>
            <v-list-item-title>Bookings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-icon class="mr-2">mdi-logout</v-icon>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else class="gradient-button" @click="goToLogin">Login</v-btn>
    </div>
  </nav>

  <!-- Settings Modal (Updated) -->
  <v-dialog
    v-model="settingsDialog"
    max-width="500px"
    persistent
    @click:outside="settingsDialog = false"
  >
    <v-card class="settings-card slide-in">
      <v-card-title>
        <span class="text-h5">User Settings</span>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <h3 class="settings-section">Profile</h3>
        <div class="profile-section">
          <v-avatar size="80">
            <img :src="userPhoto || defaultUserImage" alt="User Photo" />
          </v-avatar>
          <v-btn class="upload-button" small @click="uploadPhoto">Change Photo</v-btn>
        </div>
        <v-text-field v-model="userName" label="Change Name" variant="outlined"></v-text-field>

        <h3 class="settings-section">Bio</h3>
        <v-textarea v-model="bio" label="Tell us about yourself" variant="outlined"></v-textarea>

        <h3 class="settings-section">Appearance</h3>
        <v-switch v-model="darkMode" label="Dark Mode" @change="toggleDarkMode"></v-switch>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="white" class="gradientCbtn-button" @click="settingsDialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="white" class="gradientSC-button" @click="saveSettings">Save Changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import defaultUserImage from '@/assets/default_user.png';

const router = useRouter();
const searchQuery = ref("");

const isLoggedIn = ref(false);
const userPhoto = ref("");

// Check login status on mount
onMounted(() => {
  updateLoginStatus();
  window.addEventListener('storage', updateLoginStatus); 
  const storedPhoto = localStorage.getItem("userPhoto");
  userPhoto.value = storedPhoto && storedPhoto !== "null" ? storedPhoto : defaultUserImage;
});

// Computed property to dynamically check login state
const updateLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('loggedInUser');
};

// Logout function
const logout = () => {
  localStorage.removeItem('loggedInUser');
  window.dispatchEvent(new Event('storage')); // Notify other components
  router.push('/login');
};

// Navigation Functions
const goHome = () => router.push("/");
const handleSearch = () => {
  if (searchQuery.value.trim())
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`);
};
const navigateToCategory = (category) =>
  router.push(`/category/${category.toLowerCase().replace(/\s+/g, "-")}`);
const navigateToBrand = (brand) =>
  router.push(`/brand/${brand.toLowerCase().replace(/\s+/g, "-")}`);
const navigateToSupport = (route) => router.push(route);

// User Authentication (Mock Data)



const settingsDialog = ref(false);

// Settings Data
const userName = ref("John Doe");
const bio = ref("");
const darkMode = ref(false);

// Settings Actions
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode", darkMode.value);
};
const saveSettings = () => {
  console.log("Settings saved!");
  settingsDialog.value = false;
};
const uploadPhoto = () => {
  alert("Photo upload feature coming soon!");
};

// User Actions
const goToBookings = () => router.push("/bookings");

const goToLogin = () => router.push("/login");

// Dynamic Data
const brands = ref([
  "Rolls-Royce",
  "Bentley",
  "Aston Martin",
  "Lamborghini",
  "Ferrari",
  "McLaren",
  "Porsche",
  "Mercedes",
  "BMW",
  "Range Rover",
]);
const categories = ref(["Supercar", "Convertible", "SUV", "Sedan"]);
const supportItems = ref([
  { title: "FAQ", route: "/faq" },
  { title: "Contact", route: "/contact" },
]);
</script>

<style scoped>
/* ✅ Navbar Styling */
.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
}

/* ✅ Navbar Sections */
.navbar-left,
.navbar-middle,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* ✅ Logo */
.navbar-brand {
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

/* ✅ Home Icon */
.home-icon {
  font-size: 24px;
  color: white;
  transition: 0.3s ease-in-out;
}
.home-button:hover .home-icon {
  color: #ffcc00;
  text-shadow: 0px 0px 10px rgba(255, 204, 0, 0.8);
}

/* ✅ Dropdown Buttons */
.gradient-button {
  background: linear-gradient(135deg, #1c1c1c, #111111);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.gradient-button:hover {
  background: linear-gradient(135deg, #ff4b2b, #ff416c);
  box-shadow: 0px 0px 10px rgba(255, 75, 43, 0.8);
  transform: scale(1.05);
}

/* ✅ Search Bar (unchanged) */
.search-bar {
  width: 500px;
  height: 55px;
  max-width: 250px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
}
.search-bar ::placeholder {
  color: white;
}

/* ✅ Glassmorphic Dropdown */
.glassmorphic-menu {
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(5px);
  border-radius: 8px;
}

/* ✅ Dropdown Items */
.v-list-item:hover {
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

/* ✅ User Profile */
.v-avatar {
  cursor: pointer;
}

/* ✅ Settings Modal */ 
.settings-card {
  background: #1e1d1d;
  padding: 20px;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* ✅ Slide-in Animation for Modal */
.slide-in {
  animation: slideIn 0.3s ease-out;
}
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Additional styling for modal sections */
.settings-section {
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0 5px;
}
.profile-section {
  display: flex;
  align-items: center;
  gap: 15px;
}
.upload-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 5px;
}

/* ✅ Override Modal Scrim for Blurry, Dark Background */
.v-dialog__scrim {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.6) !important;
}
/* ✅ gradiance for save changes button of settings */
.gradientSC-button {
    background: linear-gradient(135deg, #111111, #111111);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .gradientSC-button:hover {
    background: linear-gradient(135deg, #1ee60c, #07c71e);
    box-shadow: 0px 0px 10px rgba(6, 171, 6, 0.8);
    transform: scale(1.05);
  }

  /* ✅ gradiance for save changes button of settings */
  .gradientCbtn-button {
      background: linear-gradient(135deg, #111111, #111111);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .gradientCbtn-button:hover {
      background: linear-gradient(135deg, #e41616, #dd0909);
      box-shadow: 0px 0px 10px rgba(190, 2, 2, 0.8);
      transform: scale(1.05);
    }
</style>
