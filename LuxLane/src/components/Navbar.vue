<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
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
            <a class="nav-link" href="#">Home </a>
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
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </template>
  
  <script setup>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  </script>
  
  <style scoped>
  .form-control {
    margin-right: 10px;
  }
  </style>
  