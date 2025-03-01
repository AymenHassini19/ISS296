<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="selectedStatus"
            :items="statusOptions"
            label="Filter by Status"
            @change="filterBookings"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="booking in filteredBookings" :key="booking.bookingId" cols="12" md="6">
          <v-card>
            <v-card-title>
              Booking ID: {{ booking.bookingId }}
            </v-card-title>
            <v-card-subtitle>
              Status: <span :style="{ backgroundColor: getStatusBackgroundColor(booking.status), color: 'white', padding: '2px 5px', borderRadius: '3px' }">{{ booking.status }}</span>
            </v-card-subtitle>
            <v-card-text>
              <p>Pickup Date & Time: {{ booking.pickupDate }}</p>
              <p>Pickup Location: {{ booking.pickupLocation }}</p>
              <p>Return Date & Time: {{ booking.returnDate }}</p>
              <p>Return Location: {{ booking.returnLocation }}</p>
              <p>Payment Method: {{ booking.paymentMethod }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import bookings from '@/assets/data/Bookings.js';

export default {
  data() {
    return {
      bookings: bookings,
      selectedStatus: 'All',
      statusOptions: ['All', 'Completed', 'Cancelled', 'Ongoing', 'Upcoming'],
      filteredBookings: bookings
    };
  },
  watch: {
    selectedStatus: 'filterBookings'
  },
  methods: {
    filterBookings() {
      if (this.selectedStatus === 'All') {
        this.filteredBookings = this.bookings;
      } else {
        this.filteredBookings = this.bookings.filter(
          booking => booking.status === this.selectedStatus
        );
      }
    },
    getStatusBackgroundColor(status) {
      switch (status) {
        case 'Cancelled':
          return 'red';
        case 'Upcoming':
          return 'blue';
        case 'Ongoing':
          return 'green';
        default:
          return 'transparent';
      }
    }
  }
};
</script>
