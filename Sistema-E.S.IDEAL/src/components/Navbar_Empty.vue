<template>
    <nav id="nav">
      <div class="nav-items">
        <slot></slot>
      </div>
    </nav>
  </template>
  
  <style scoped>
  #nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: var(--color-nosso-azul);
    height: 8%; 
  }
  
  
  a.router-link-active {
    background-color: var(--color-accent);
    color: var(--color-light);
  }
  </style>
  