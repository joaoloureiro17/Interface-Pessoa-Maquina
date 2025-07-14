<script>
import Nav_Bar from '../components/Nav_Bar.vue';
import { useCarPlateStore } from '@/stores/carPlateStore'; 

export default {
  components: {
    Nav_Bar
  },
  data() {
    return {
      client: null,
      vehicle: null
    }
  },
  methods: {
    redirecionarHistorico() {
      this.$router.push('/fichaVeiculoHist');
    },
    getFveiculoI() {
      const carPlateStore = useCarPlateStore();

      fetch('http://localhost:3000/vehicles')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(vehiclesData => {
          this.vehicle = vehiclesData.find(vehicle => vehicle.id === carPlateStore.plate);

          carPlateStore.setNome(this.vehicle.clientId);

          fetch('http://localhost:3000/clients')
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Something went wrong');
              }
            })
            .then(data => {
              this.client = data.find(cliente => cliente.id === this.vehicle.clientId);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getFveiculoI();
  }
}
</script>


<template>
  <Nav_Bar>
    <img src="../imagens/back_arrow.png" @click="goBack()" id="seta">
  </Nav_Bar>
  
  <div class="container">
    <!-- Verificamos se há dados do cliente com o ID pretendido e, se houver, exibimos -->
    <div class="barra"></div>
    <div v-if="client" class="div infoclie">
      <div class="info-header">Informações do cliente</div>
      <div class="avatar">
        <img src="../imagens/perfil.png" alt="Avatar">
      </div>
      <div class="infoclie-div">
        <p class="alt" style="color: white;"> {{ client.nome }}</p>
        <div class="info" style="color: white;"><b>Id:</b> {{ client.id }}</div>
        <div class="info" style="color: white;"><b>Contacto:</b> {{ client.telefone }}</div>
        <div class="info" style="color: white;"><b>E-mail:</b> {{ client.email }}</div>
        <hr class="separator">
        <div class="buttons">
          <button class="info-veiculo-button">Informações sobre o veículo</button>
          <button class="historico-button" @click="redirecionarHistorico">Histórico de serviços do veículo</button>
        </div>
      </div>
    </div>
    
    <div class="info-carro" style="grid-area: info;">Informações relativas ao carro</div>
    
    <!-- Verificamos se há dados do veículo com o ID do cliente 123 e, se houver, exibimos -->
    <div v-if="vehicle" class="div infocar">
      <div class="infocar-div">
        <div class="score" ><b>Matricula:</b> {{ vehicle.id }}</div>
        <div class="score" ><b>Ano:</b> {{ vehicle.ano }}</div>
        <div class="score" ><b>Marca:</b> {{ vehicle.marca }}</div>
        <div class="score" ><b>Modelo:</b> {{ vehicle.Modelo }}</div>
        <div class="score" ><b>Cor:</b> {{ vehicle.cor }}</div>
        <div class="score" ><b>Tipo de Veículo:</b> {{ vehicle.vehicle_typeId }}</div>
        <div class="score" ><b>Cilindrada:</b> {{ vehicle.cilindrada }}</div>
        <div class="score" ><b>Medida das jantes:</b> {{ vehicle.medidaJantes }}</div>
        <div class="score" ><b>Quilómetros:</b> {{ vehicle.kms }}</div>
      </div>
    </div>


    <div class="car-image">
      <img :src="vehicle.imagem" style="width: 80%; height: auto;">
    </div>
  </div>
</template>

<style scoped>

#seta {
  width: 3%;
  cursor: pointer;

}

.container {
  margin: 0px 0px;
  display: grid;
  grid-template-columns: 0.5fr 0.2fr 1fr 1fr; 
  grid-template-areas: 
    "cli barra info car";
  gap: 0px; 
  position: relative; 
  width: 100%;
  height: 100%;
}

.score {
  font-weight: 160;
  font-size: 120%;
  text-align: start; 
  margin-bottom: 5%;
}

.alt {
  font-weight: 700;
  font-size: 20px;
  text-align: center;
}


.infocar {
  grid-area: info;
  margin-top: 24%;
  background-color: #d3d3d3;
  border: 5px solid #334562; 
  margin-bottom: 10px;
  border-radius: 30px; 
  width: 80%; 
  height: 65%;
}

.infocar-div {
  margin-top: 20px;
  margin-left: 20px;
}


.infoclie {
  grid-area: cli;
  background-color: #334562;
}

.infoclie > p {
  color: var(--color-light);
}


.info-header {
  color: white;
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
}

.info-carro {
  color: #334562;
  margin-top: 60px; 
  font-size: 36px;
  font-weight: bold; 
}

.info {
  color: white;
  font-weight: 300; 
  font-size: 18px; 
  text-align: start; 
  margin-left: 7%;
  margin-bottom: 6%;
}

.avatar {
  margin-top: 40px;
  text-align: center;
}

.avatar img {
  width: 55%; 
  height: auto; 
}

.buttons {
  text-align: start;
  margin-top: 10%;
}

.info-veiculo-button:hover, .historico-button:hover {
  opacity: 0.7; 
  cursor: pointer;
  text-decoration: underline;
}

.info-veiculo-button, .historico-button {
  background-color: transparent;
  color: #ffffff;
  border: none;
  margin-left: 7%;
  margin-bottom: 20px;
  font-size: 15px;
}

.info-veiculo-button {
  text-decoration: underline;
}



.separator {
  border-top: 5px solid #ffffff;
  margin-top: 40%;
  margin-left: 7%;
  margin-right:7%;
}


.car-image {
  grid-area: car;
  margin-top: 200px; 
}

.barra {
  grid-area: barra;
  background-color: #d9d9d9;
  width: 25%; 
  height: 100%;
}

</style>
