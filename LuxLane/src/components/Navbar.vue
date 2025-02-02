<template>
    <nav class="navbar navbar-expand-lg custom-navbar">
      <a class="navbar-brand" href="#">LuxLane</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home</a>
          </li>
  
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Brands
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Rolls-Royce</a></li>
              <li><a class="dropdown-item" href="#">Bentley</a></li>
              <li><a class="dropdown-item" href="#">Aston Martin</a></li>
              <li><a class="dropdown-item" href="#">Lamborghini</a></li>
              <li><a class="dropdown-item" href="#">Ferrari</a></li>
              <li><a class="dropdown-item" href="#">McLaren</a></li>
              <li><a class="dropdown-item" href="#">Porsche</a></li>
              <li><a class="dropdown-item" href="#">Mercedes</a></li>
              <li><a class="dropdown-item" href="#">BMW</a></li>
              <li><a class="dropdown-item" href="#">Range Rover</a></li>
            </ul>
          </li>
  
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Supercar</a></li>
              <li><a class="dropdown-item" href="#">Convertible</a></li>
              <li><a class="dropdown-item" href="#">SUV</a></li>
              <li><a class="dropdown-item" href="#">Sedan</a></li>
              <li><a class="dropdown-item" href="#">Another New Action</a></li>
            </ul>
          </li>
        </ul>
  
        <form class="d-flex mx-auto">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </template>
  
  <script setup>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  </script>
  
  <style scoped>
  .custom-navbar {
    background-color: rgba(0, 0, 0, 0.616); /* Black transparent background */
  }
  
  .navbar-nav .nav-link,
  .navbar-brand,
  .btn-outline-light {
    color: white !important; /* White text for nav items and brand */
  }
  
  .navbar-toggler-icon {
    background-color: white;
  }
  .dropdown-menu {
    background-color: rgba(0, 0, 0, 0.726); /* Black dropdown background */
  }
  
  .dropdown-menu .dropdown-item {
    color: white !important;
  }
  
  .dropdown-menu .dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  </style>