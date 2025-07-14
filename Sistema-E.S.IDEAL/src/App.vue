  <script>
    import Navdown from './components/Nav_Down.vue';
    import Navbar from './components/Nav_Bar.vue';
    import Navbar_Empty from './components/Navbar_Empty.vue';
     
    export default {
      components: {
        Navbar,
        Navbar_Empty,
        Navdown
      },
      data() {

      },
      methods: {
        
      }
    };
  </script>
     
     <template>
       <div class="container">
         <div class="element main">
           <router-view />
         </div>
     
         <div class="element footer">
           <Navdown />
         </div>
       </div>
     </template>
     
     <style>
     
     .container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
     }
     
     .element {
      flex: 1;
     }
     
     .main {
      position: absolute;
      top: 0;
      width: 100%;
      height: 92%;
     }
     
     .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
     }
     
     </style>