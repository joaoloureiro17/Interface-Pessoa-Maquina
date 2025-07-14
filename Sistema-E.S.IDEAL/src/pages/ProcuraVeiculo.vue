<template>
  <div class="app">
    <Nav_Bar/>
    <div class="pesquisar">
      <div class="avatar">
        <img src="../imagens/CarSearch.png" alt="Avatar">
      </div>
      <div class="label">
        <div class="text-wrapper">Procura de Veiculo</div>
      </div>
      <div class="input-group">
        <input type="text" id="car-plate" v-model="carPlate" placeholder="Insira a matrícula do veículo" @keyup.enter="search">
        <img class="search-icon" src="../imagens/search.png" alt="Search" @click="search">
      </div>
      <Popup_Error v-if="carExists" @click="fechar_popup">
            <template v-slot:titulo>
                <span>Veículo não encontrado.</span>
            </template>
      </Popup_Error>
    </div>
  </div>
</template>

<script>
import Popup_Error from '@/components/Popup_Error.vue';
import Nav_Bar from '../components/Nav_Bar.vue';
import { useCarPlateStore } from '@/stores/carPlateStore';

export default {
  components: {
    Nav_Bar,
    Popup_Error
  },
  data() {
    return {
      carPlate: '',
      carExists: false, 
    };
  },
  methods: {
    async search() {
      try {
        // solicitação para obter a lista de veículos
        const response = await fetch('http://localhost:3000/vehicles');
        const vehicles = await response.json();
        
        //Verificar se a matrícula existe na lista de veículos
        this.carExists = vehicles.some(vehicle => vehicle.id === this.carPlate);
        
        //Se a matrícula existir na lista de veículos
        if (this.carExists) {
          //inicializa o store
          const carPlateStore = useCarPlateStore();
          
          //armazena a matrícula do veículo no store
          carPlateStore.setPlate(this.carPlate);
          
          //redireciona o utilizador para a próxima página
          this.$router.push('/fichaVeiculoInfo');
        } else {
          // Se a matrícula não existir na lista de veículos, define-se carExists como true para exibir o pop-up de erro
          this.carExists = true;
        }
      } catch (error) { //mostra o Popup_Error
        this.carExists = true;
      }
    },
    fechar_popup() { //carExists passa a false(default) para retirar o Popup
      this.carExists = false;
    }
  }
}
</script>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.pesquisar {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.label {
  height: 60px;
  width: 390px;
  margin: 0 auto; /* Centraliza o elemento horizontalmente */
  margin-bottom: 40px;
  line-height: 50px; /* Centraliza verticalmente o texto */
}

.label .text-wrapper {
  color: #000;
  font-size: 40px;
  font-weight: 500;
  text-align: center;
}

.input-group {
  margin-top: 20px;
  margin-bottom: 15px;
  position: relative; /* Define o contexto de posicionamento */
}

.input-group input {
  width: 60%; 
  max-height: 46px;
  padding: 8px;
  font-size: 18px;
  border: 2px;
  border-radius: 20px;
  background-color: #D9D9D9;
}

.avatar {
  text-align: center;
}

.avatar img {
  margin-top: -10%;
  width: 8%;
  height: auto;
}

/* Posiciona o ícone de pesquisa */
.search-icon {
  position: absolute;
  right: 21%; 
  top: 50%; 
  transform: translateY(-50%);
  cursor: pointer;
  width: 27px;
  height: 27px;
  flex-shrink: 0;
}
</style>