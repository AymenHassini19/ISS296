<template>
    <div class="chatbot-container">
      <button class="chat-toggle" @click="toggleChat">
        <span class="chat-toggle-text">{{ chatVisible ? 'X' : 'Chat' }}</span>
      </button>
  
      <div v-if="chatVisible" class="chatbot">
        <h2>What do you need a car for?</h2>
  
        <div class="chat-window">
          <div v-for="(msg, index) in messages" :key="index" class="message">
            <strong>{{ msg.role === 'user' ? 'You' : 'AI' }}:</strong> {{ msg.content }}
          </div>
        </div>
  
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="here to help :)"
          class="input-text"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInput: '',
        messages: [],
        cars: this.loadCarsFromLocalStorage(),
        chatVisible: false
      };
    },
    methods: {
      loadCarsFromLocalStorage() {
        const storedCars = localStorage.getItem('carsList');
        return storedCars ? JSON.parse(storedCars) : [];
      },
      toggleChat() {
        this.chatVisible = !this.chatVisible;
      },
      async sendMessage() {
        if (!this.userInput.trim()) return;
  
        const carListString = this.cars.map((car, i) =>
          `${i + 1}. ${car.brand} ${car.model} - ${car.type}, ${car.seats} seats, ${car.fuel}, $${car.price}`
        ).join('\n');
  
        const messages = [
          {
            role: 'system',
            content: `You are a helpful assistant that suggests the best car from this list based on user needs, keep responses short:\n${carListString}`
          },
          {
            role: 'user',
            content: this.userInput
          }
        ];
  
        // Push user's message to chat
        this.messages.push({ role: 'user', content: this.userInput });
        this.userInput = '';
  
        try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer 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", // Replace with your actual key
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-chat-v3-0324:free", // Replace with the correct model if necessary
              messages: messages
            })
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          const reply = data.choices[0].message;
  
          // Add AI's reply to messages
          this.messages.push(reply);
        } catch (err) {
          console.error("Error talking to AI:", err);
          this.messages.push({ role: 'assistant', content: 'Sorry, there was a problem. Try again later.' });
        }
      }
    }
  };
  </script>
  
  <style>
  .chatbot-container {
    position: relative;
    max-width: 600px;
    margin: 40px auto;
  }
  
  .chat-toggle {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #686868;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center; /* Center the text */
  }
  
  .chatbot {
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .chat-window {
    height: 300px;
    overflow-y: auto;
    margin-bottom: 15px;
    padding: 10px;
    background: #f1f1f1;
    border: 1px solid #ccc;
    color: #333;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  input {
    width: 75%;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #000000;
    border-radius: 4px;
    color: black; /* Change text color to black */
  }
  
  button {
    padding: 10px 20px;
    border-radius: 4px;
    border: 1px solid #5f5f5f;
    background-color: #535353;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #414141;
  }
  
  button:active {
    background-color: #464646;
  }
  
  input:focus, button:focus {
    outline: none;
  }
  
  .chatbot-container {
    position: relative;
  }
  </style>
  