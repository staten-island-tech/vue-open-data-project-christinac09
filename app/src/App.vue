<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="absolute top-8 left-16">
    <h1 class="text-3xl my-4">NYC Arrest Data in 2024</h1>
    <div class="wrapper">
      <nav class="mt-2">
        <RouterLink to="/" class="px-8 border-r-2 active:text-black">Home</RouterLink>
        <RouterLink to="/arrests-by-month" class="px-8 active:text-black"
          >Monthly Arrests</RouterLink
        >
        <RouterLink to="/arrests-by-boro" class="px-8 border-l-2 active:text-black"
          >Borough Distribution</RouterLink
        >
        <RouterLink to="/arrests-by-age" class="px-8 border-l-2 active:text-black"
          >Age Group Distribution</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
