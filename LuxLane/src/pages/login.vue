<template>
    <div class="login-container">
      <v-container fill-height fluid class="d-flex align-center justify-center">
        <v-card class="login-card" elevation="10">
          <v-card-title class="text-h5 text-center">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required
                prepend-inner-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
                prepend-inner-icon="mdi-lock"
              ></v-text-field>
              <v-btn color="primary" class="mt-4 gradient-button" @click="login" :disabled="!valid" block>Login</v-btn>
            </v-form>
            <div class="signup-link mt-2">
              Don't have an account?
              <v-btn text color="primary" @click="goToSignUp">Sign Up</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import users from '@/assets/data/Users.js';

const router = useRouter();
const email = ref('');
const password = ref('');
const valid = ref(false);
const form = ref(null);

// Load stored login state
onMounted(() => {
  if (localStorage.getItem('loggedInUser')) {
    router.push('/'); // Redirect to home if already logged in
  }
});

// Validation Rules
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];
const passwordRules = [(v) => !!v || 'Password is required'];

const login = () => {
  if (form.value.validate()) {
    const user = users.find((u) => u.email === email.value && u.password === password.value);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.dispatchEvent(new Event('storage')); // Notify other components
      router.push('/'); // Redirect to home
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
};

const goToSignUp = () => {
  router.push('/signup');
};
</script>

  
  <style scoped>
  /* Full viewport with an animated gradient background */
  .login-container {
    height: 100vh;
    width: 100vw;
    background: linear-gradient(-45deg, #1e1e1e, #121212, #1e1e1e, #121212);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
  }
  
  /* Keyframes for moving gradient background */
  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  /* Centered login card with modern styling */
  .login-card {
    width: 350px;
    padding: 20px;
    border-radius: 12px;
    background-color: rgba(41, 39, 39, 0.95);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  /* Styling for the sign up link */
  .signup-link {
    text-align: center;
    font-size: 0.9rem;
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
  </style>  
