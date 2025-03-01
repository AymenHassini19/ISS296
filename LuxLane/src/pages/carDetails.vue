<template>
    <v-container v-if="car">
      <v-btn color="primary back_btn_margin" class="mb-5 gradient-button" @click="goBack">⬅ Back</v-btn>
  
      <v-row>
        <!-- ✅ Image Gallery -->
        <v-col cols="12" md="6">
          <v-carousel hide-delimiters show-arrows>
            <v-carousel-item
              v-for="(image, index) in car.images"
              :key="index"
              @click="openImage(index)"
            >
              <v-img :src="getImage(image)" class="clickable-image" />
            </v-carousel-item>
          </v-carousel>
        </v-col>
  
        <!-- ✅ Car Details Section -->
        <v-col cols="12" md="6">
          <h1>{{ car.brand }} {{ car.model }}</h1>
          <p><strong>Year:</strong> {{ car.year }}</p>
          <p><strong>Seats:</strong> {{ car.seats }}</p>
          <p><strong>Convertible:</strong> {{ car.isConvertible ? 'Yes' : 'No' }}</p>
          <p><strong>Price per Day:</strong> ${{ car.pricePerDay }}</p>
          <p>
            <strong>Availability: </strong>
            <v-chip :color="car.isAvailable ? 'green' : 'red'" dark>
              {{ car.isAvailable ? 'Available' : 'Unavailable' }}
            </v-chip>
          </p>
          <p><strong>Location:</strong> {{ car.location }}</p>
  
          <!-- ✅ Book This Car Button -->
          <v-btn
            :color="car.isAvailable ? 'success' : 'grey'"
            class="book-button gradientB-button"
            :disabled="!car.isAvailable"
            @click="bookCar"
          >
            Book This Car
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- ✅ Description Section (Now Higher) -->
      <v-row class="description-section">
        <v-col cols="12">
          <h2>Description</h2>
          <p>{{ car.description || 'No description available for this car.' }}</p>
        </v-col>
      </v-row>
  
      <!-- ✅ Contact Us Section -->
      <v-row>
        <v-col cols="12">
          <h2>Contact Us</h2>
          <p>If you have any questions about this car, feel free to contact us.</p>
          <v-btn color="info" href="/contact">Contact Us</v-btn>
        </v-col>
      </v-row>
  
      <!-- ================= Booking Flow Modals ================= -->
  
      <!-- 1. Booking Information Modal -->
<v-dialog v-model="bookingDialog" max-width="500px" transition="fade">
  <v-card class="modal-card booking-card">
    <v-card-title class="booking-title">
      Book {{ car.brand }} {{ car.model }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <!-- ✅ Styled Inputs with Vertical Dots -->
      <div class="input-group">
        <span class="input-dot"></span>
        <v-text-field v-model="pickupDate" label="Pickup Date & Time" type="datetime-local" variant="outlined" />
      </div>
      <div class="input-group">
        <span class="input-dot"></span>
        <v-text-field v-model="pickupLocation" label="Pickup Location" variant="outlined" />
      </div>
      <div class="input-group">
        <span class="input-dot"></span>
        <v-text-field v-model="returnDate" label="Return Date & Time" type="datetime-local" variant="outlined" />
      </div>
      <div class="input-group">
        <span class="input-dot"></span>
        <v-text-field v-model="returnLocation" label="Return Location" variant="outlined" />
      </div>
      <div class="input-group">
        <span class="input-dot"></span>
        <v-textarea v-model="additionalInfo" label="Additional Information" variant="outlined" />
      </div>

      <!-- ✅ Payment Method Selection -->
      <h3 class="payment-title">Select Payment Method</h3>
      <v-radio-group v-model="paymentMethod">
        <v-radio label="Credit Card" value="Credit Card"></v-radio>
        <v-radio label="PayPal" value="PayPal"></v-radio>
        <v-radio label="Apple Pay" value="Apple Pay"></v-radio>
      </v-radio-group>

      <!-- ✅ Error Message Display -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn class="gradientCbtn-button" @click="bookingDialog = false">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="gradientYbtn-button" @click="confirmBooking">Proceed</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- 2. Confirmation Modal -->
<v-dialog v-model="confirmationDialog" max-width="400px" transition="scale">
  <v-card class="modal-card confirmation-card">
    <v-card-title class="confirmation-title">Are you sure?</v-card-title>
    <v-card-text class="confirmation-text">
      You're about to book <strong>{{ car.brand }} {{ car.model }}</strong>. Proceed?
    </v-card-text>
    <v-card-actions>
      <v-btn class="gradientCbtn-button" @click="confirmationDialog = false">No</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="gradientYbtn-button" @click="finalizeBooking">Yes</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- 3. Booking Pending Modal -->
<v-dialog v-model="pendingDialog" max-width="400px">
  <v-card class="modal-card pending-card">
    <v-card-title class="pending-title">Booking Pending</v-card-title>
    <v-card-text>
      <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
      <div class="pending-text">Please wait while we process your booking...</div>
    </v-card-text>
  </v-card>
</v-dialog>

<!-- 4. Booking Error Modal -->
<v-dialog v-model="errorDialog" max-width="400px" transition="scale">
  <v-card class="modal-card error-card">
    <v-card-title class="error-title">Booking Error</v-card-title>
    <v-card-text class="error-text">
      Invalid booking information. Please try again.
    </v-card-text>
    <v-card-actions>
      <v-btn class="gradientCbtn-button" @click="retryBooking">Try Again</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- Booking Successful Modal -->
<<v-dialog v-model="successDialog" max-width="400px" transition="scale">
  <v-card class="modal-card success-card">
    <v-card-title class="success-title">Booking Successful</v-card-title>
    <v-card-text class="success-text">
      Your booking for <strong>{{ car.brand }} {{ car.model }}</strong> has been confirmed!
    </v-card-text>

    <!-- Expandable Booking Details -->
    <v-expand-transition>
      <div v-if="showDetails" class="booking-details">
        <v-list class="bg-transparent">
          <v-list-item prepend-icon="mdi-calendar">
            <v-list-item-title>Pickup Date & Time</v-list-item-title>
            <v-list-item-subtitle>{{ pickupDate }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-map-marker">
            <v-list-item-title>Pickup Location</v-list-item-title>
            <v-list-item-subtitle>{{ pickupLocation }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-calendar">
            <v-list-item-title>Return Date & Time</v-list-item-title>
            <v-list-item-subtitle>{{ returnDate }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-map-marker">
            <v-list-item-title>Return Location</v-list-item-title>
            <v-list-item-subtitle>{{ returnLocation }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item prepend-icon="mdi-credit-card">
            <v-list-item-title>Payment Method</v-list-item-title>
            <v-list-item-subtitle>{{ paymentMethod }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn class="gradientYbtn-button" @click="toggleDetails">
        {{ showDetails ? "Hide Details" : "View Details" }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="gradientYbtn-button" @click="successDialog = false">OK</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>





  
      <!-- ✅ Image Zoom Modal with Navigation -->
      <v-dialog v-model="imageDialog" max-width="80%" persistent @click:outside="closeImage">
        <v-card class="zoomed-image-card">
          <!-- Close Button -->
          <v-btn icon class="close-button" @click="closeImage">
            <v-icon>mdi-close</v-icon>
          </v-btn>
  
          <!-- Image Navigation -->
          <v-btn icon class="prev-button" @click="prevImage" v-if="car.images.length > 1">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
  
          <v-img :src="selectedImage" class="zoomed-image"></v-img>
  
          <v-btn icon class="next-button" @click="nextImage" v-if="car.images.length > 1">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card>
      </v-dialog>
    </v-container>
  
    <!-- ✅ No Car Found -->
    <v-container v-else>
      <h2 class="text-center">Car Not Found</h2>
    </v-container>
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import cars from '@/assets/data/Cars.js';
  
  const route = useRoute();
  const router = useRouter();
  
  const isLoggedIn = ref(true); // Change this based on your actual auth logic
  const car = computed(() => cars.find((c) => c.carId === route.params.id));
  
  // Ensure the page always starts at the top when loaded
  onMounted(() => {
    window.scrollTo(0, 0);
  });
  
  // Booking Modals
const bookingDialog = ref(false);
const confirmationDialog = ref(false);
const pendingDialog = ref(false);
const errorDialog = ref(false);
const successDialog = ref(false);

// Booking Form Data
const pickupDate = ref("");
const pickupLocation = ref("");
const returnDate = ref("");
const returnLocation = ref("");
const additionalInfo = ref("");
const paymentMethod = ref("Credit Card"); // Default payment option
const errorMessage = ref("");

const bookCar = () => {
  if (!isLoggedIn.value) {
    router.push("/login");
  } else {
    bookingDialog.value = true;
  }
};

const confirmBooking = () => {
  if (!pickupDate.value || !pickupLocation.value || !returnDate.value || !returnLocation.value || !paymentMethod.value) {
    errorMessage.value = "Please fill in all required fields.";
    return;
  }
  errorMessage.value = "";
  bookingDialog.value = false;
  confirmationDialog.value = true;
};

const finalizeBooking = () => {
  confirmationDialog.value = false;
  pendingDialog.value = true;

  setTimeout(() => {
    pendingDialog.value = false;

    // Ensure all required fields are filled
    if (!pickupDate.value || !pickupLocation.value || !returnDate.value || !returnLocation.value || !paymentMethod.value) {
      errorDialog.value = true; // Show error modal if validation fails
      return;
    }

    successDialog.value = true; // Booking is successful if validation passes
  }, 5000); // 5-second delay for booking simulation
};

const retryBooking = () => {
  errorDialog.value = false;
  bookingDialog.value = true;
};
  
  // Image Zoom Logic
  const imageDialog = ref(false);
  const selectedImage = ref("");
  const currentImageIndex = ref(0);
  
  const openImage = (index) => {
    currentImageIndex.value = index;
    selectedImage.value = getImage(car.value.images[index]);
    imageDialog.value = true;
  };
  
  const closeImage = () => {
    imageDialog.value = false;
  };
  
  const prevImage = () => {
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--;
      selectedImage.value = getImage(car.value.images[currentImageIndex.value]);
    }
  };
  
  const nextImage = () => {
    if (currentImageIndex.value < car.value.images.length - 1) {
      currentImageIndex.value++;
      selectedImage.value = getImage(car.value.images[currentImageIndex.value]);
    }
  };
  
  // Function to resolve image paths
  const getImage = (path) => {
    return new URL(path.replace("@/", "/src/"), import.meta.url).href;
  };
  
  const goBack = () => {
    router.go(-1);
  };

  const showDetails = ref(false);

    const toggleDetails = () => {
    showDetails.value = !showDetails.value;
    };
  </script>
  
  <style scoped>
  /* ✅ CarDetails Page Styles */
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.2rem;
    margin: 5px 0;
  }
  
  .book-button {
    margin-top: 20px;
    width: 100%;
  }
  
  /* ✅ Disabled Button Styling */
  .v-btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* ✅ Gradient Button */
  .gradient-button {
    background: linear-gradient(135deg, #1c1c1c, #1c1c1c);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .gradient-button:hover {
    background: linear-gradient(135deg, #1166c8, #1212ca);
    box-shadow: 0px 0px 10px rgba(58, 29, 248, 0.8);
    transform: scale(1.05);
  }
  
  /* ✅ Gradient Button for Booking */
  .gradientB-button {
    background: linear-gradient(135deg, #1c1c1c, #1c1c1c);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .gradientB-button:hover {
    background: linear-gradient(135deg, #1ee60c, #07c71e);
    box-shadow: 0px 0px 10px rgba(6, 171, 6, 0.8);
    transform: scale(1.05);
  }
  
  /* ✅ Clickable Image */
  .clickable-image {
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  /* ✅ Image Zoom Modal */
  .zoomed-image-card {
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 10px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* ✅ Zoomed Image */
  .zoomed-image {
    width: 80%;
    height: auto;
    max-height: 80vh;
    border-radius: 10px;
  }
  
  /* ✅ Close Button */
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
  }
  
  /* ✅ Description Section is Higher */
  .description-section {
    margin-bottom: 100px;
  }
  
  /* ✅ Navigation Buttons */
  .prev-button,
  .next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 30px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  
  .prev-button {
    left: 10px;
  }
  
  .next-button {
    right: 10px;
  }

  /* ✅ gradiance for yes button in booking */
.gradientYbtn-button {
    background: linear-gradient(135deg, #111111, #111111);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .gradientYbtn-button:hover {
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

    .pending-card {
  background: linear-gradient(135deg, #111111, #1c1c1c);
  color: white;
  border-radius: 12px;
  text-align: center;
  padding: 20px;
}

.pending-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.pending-text {
  margin-top: 15px;
  font-size: 16px;
}

.booking-card {
  background: linear-gradient(135deg, #1c1c1c, #1f1f1f);
  color: white;
  border-radius: 12px;
  text-align: center;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.8);
}

.booking-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* ✅ Booking Card */
.booking-card {
  text-align: left;
}

/* ✅ Titles */
.booking-title, .confirmation-title, .pending-title, .error-title, .success-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}

.payment-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
}

/* ✅ Success & Error Modals */
.success-card, .error-card {
  background: linear-gradient(135deg, #1c1c1c, #222);
}

/* ✅ Booking Details List */
.booking-details {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  font-size: 16px;
  text-align: left;
}

.booking-details li {
  margin-bottom: 5px;
}
/* ✅ Modal Styling */
.modal-card {
  background: linear-gradient(135deg, #1c1c1c, #222);
  color: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

/* ✅ Input Styling with Vertical Line & Dot */
.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  margin-right: 5px;
}

/* ✅ Error Message */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

/* ✅ Transitions */
.v-dialog-transition-enter-active {
  animation: fadeIn 0.3s ease-out;
}

.v-dialog-transition-leave-active {
  animation: fadeOut 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
}

.booking-details {
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-top: 10px;
}

  </style>
  