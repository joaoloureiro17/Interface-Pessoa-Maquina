   import './assets/main.css';

   // importar o Vue e o Pinia
   import { createApp } from 'vue';
   import { createPinia } from 'pinia';
   
   // importar o componente App.vue e o router
   import App from './App.vue';
   import router from './router/index.js';
     
   // criar a instância do Pinia
   const pinia = createPinia();
   
   // criar a instância do Vue
   const app = createApp(App);
   
   // registar o router e o pinia na instância do Vue
   app.use(router);
   app.use(pinia);
   
   // montar a instância do Vue
   app.mount('#app');
   