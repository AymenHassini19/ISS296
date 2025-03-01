<template>
  <v-container class="faq-container fade-in">
    <h1>Frequently Asked Questions</h1>

    <!-- Search Bar -->
    <v-text-field
      v-model="searchQuery"
      label="Search FAQs..."
      variant="solo"
      clearable
      prepend-inner-icon="mdi-magnify"
      class="search-bar"
    ></v-text-field>

    <!-- FAQ Panels -->
    <v-expansion-panels class="faq-panels">
      <v-expansion-panel v-for="faq in filteredFAQs" :key="faq.id">
        <v-expansion-panel-title class="faq-title">
          {{ faq.question }}
        </v-expansion-panel-title>
        <v-expansion-panel-text class="faq-text">
          {{ faq.answer }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- No Results Message -->
    <v-alert v-if="filteredFAQs.length === 0" type="info" class="no-results">
      No results found. Try searching for another question.
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const faqs = ref([]);

onMounted(() => {
  faqs.value = [
    { id: 1, question: "How do I rent a car?", answer: "Browse and book directly from our website." },
    { id: 2, question: "What are the payment options?", answer: "We accept credit cards, PayPal, and cryptocurrency." },
    { id: 3, question: "Is insurance included?", answer: "Yes, insurance is included in all rentals." },
    { id: 4, question: "Can I cancel a booking?", answer: "Yes, cancellations are allowed up to 24 hours before rental." },
    { id: 5, question: "Do you offer long-term rentals?", answer: "Yes, we offer discounts on long-term rentals." }
  ];
});

const searchQuery = ref("");

const filteredFAQs = computed(() => {
  if (!searchQuery.value) return faqs.value;
  return faqs.value.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 20px;
  border-radius: 10px;
}

.faq-panels {
  border-radius: 10px;
  overflow: hidden;
}

.faq-title {
  font-weight: bold;
  font-size: 16px;
}

.faq-text {
  font-size: 14px;
  color: #ffffff;
}

.no-results {
  margin-top: 20px;
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
</style>
