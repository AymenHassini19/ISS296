<template>
    <v-container class="contact-container fade-in">
      <h1>Contact Us</h1>
  
      <!-- Social Media Links -->
      <v-card class="contact-card">
        <v-card-title>Follow Us</v-card-title>
        <v-card-text>
          <div class="social-icons">
            <a
              v-for="(social, index) in socialLinks"
              :key="index"
              :href="social.link"
              target="_blank"
              class="social-icon-link"
            >
              <v-icon class="social-icon" :class="social.class">{{ social.icon }}</v-icon>
              <span class="social-name">{{ social.name }}</span>
            </a>
          </div>
        </v-card-text>
      </v-card>
  
      <!-- Contact Information -->
      <v-card class="contact-card mt-4">
        <v-card-title>Call Us</v-card-title>
        <v-card-text>
          <v-icon class="phone-icon">mdi-phone</v-icon>
          <span>{{ phoneNumber }}</span>
        </v-card-text>
      </v-card>
  
      <!-- Contact Form with Blurry Background -->
      <v-card class="contact-card mt-4 message-card">
        <v-img
      class="align-end text-white"
      height="200"
      src="@/assets/contact_backgroundMP.jpg"
      cover
    ><v-card-title>Send Us a Message</v-card-title></v-img>
        
        <v-card-text>
          <v-text-field
            v-model="contactForm.name"
            label="Your Name"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="contactForm.email"
            label="Your Email"
            variant="outlined"
            required
          ></v-text-field>
          <v-textarea
            v-model="contactForm.message"
            label="Message"
            variant="outlined"
            required
          ></v-textarea>
          <v-btn color="primary" class="send-button gradient-button" @click="sendMessage">
            Send
          </v-btn>
        </v-card-text>
      </v-card>
  
      <!-- Success Message -->
      <v-alert v-if="successMessage" type="success" class="success-message">
        {{ successMessage }}
      </v-alert>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const socialLinks = ref([
    { name: "Facebook", icon: "mdi-facebook", link: "https://facebook.com", class: "facebook" },
    { name: "Instagram", icon: "mdi-instagram", link: "https://instagram.com", class: "instagram" },
    { name: "Twitter/X", icon: "mdi-twitter", link: "https://twitter.com", class: "twitter" },
    { name: "YouTube", icon: "mdi-youtube", link: "https://youtube.com", class: "youtube" }
  ]);
  
  const phoneNumber = ref("+1 (555) 123-4567");
  
  // Contact Form
  const contactForm = ref({
    name: "",
    email: "",
    message: ""
  });
  
  // Message Status
  const successMessage = ref("");
  
  const sendMessage = () => {
    if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
      successMessage.value = "Please fill out all fields.";
    } else if (!validateEmail(contactForm.value.email)) {
      successMessage.value = "Please enter a valid email address.";
    } else {
      // Simulate sending email to mouhibkhammassi9b3@gmail.com
      console.log(`Email sent to mouhibkhammassi9b3@gmail.com with message:`, contactForm.value);
      successMessage.value = "Your message has been sent!";
      contactForm.value = { name: "", email: "", message: "" };
    }
  
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  };
  
  // ✅ Corrected Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  </script>
  
  <style scoped>
  .contact-container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
  
  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  /* ✅ Contact Card Styling */
  .contact-card {
    padding: 16px;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 8px;
  }
  
  .contact-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  /* ✅ Social Media Styling */
  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .social-icon-link {
    text-decoration: none;
  }
  
  .social-icon {
    font-size: 32px;
    transition: all 0.3s ease;
  }
  
  /* ✅ Brand-Specific Glows */
  .facebook:hover {
    color: #1877f2;
    text-shadow: 0px 0px 10px rgba(24, 119, 242, 0.8);
  }
  
  .instagram:hover {
    color: #e13083;
    text-shadow: 0px 0px 10px rgba(207, 34, 92, 0.8);
  }
  
  .twitter:hover {
    color: #1da1f2;
    text-shadow: 0px 0px 10px rgba(29, 161, 242, 0.8);
  }
  
  .youtube:hover {
    color: #ff0000;
    text-shadow: 0px 0px 10px rgba(255, 0, 0, 0.8);
  }
  
  /* ✅ Contact Form */
  .send-button {
    width: 100%;
    margin-top: 10px;
  }
  
  .success-message {
    margin-top: 20px;
  }
  
  /* ✅ Message Card with Blurry Background */
  .message-card {
    position: relative;
    background: ref("@/assets/contact_background.jpeg") no-repeat center center;
    background-size: cover;
    overflow: hidden;
  }
  
  .message-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
  
  .message-card > * {
    position: relative;
    z-index: 1;
  }
  
  /* ✅ Button Styling */
  .gradient-button {
    background: linear-gradient(135deg,#1c1c1c, #111111);
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
  