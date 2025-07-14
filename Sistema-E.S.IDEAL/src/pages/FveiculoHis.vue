<script>
import Nav_Bar from '../components/Nav_Bar.vue';
import { useCarPlateStore } from '@/stores/carPlateStore'; 
import TableHistory from '../components/TableHistory.vue';
import Item_Tabela from '../components/Item_Tabela.vue';
export default {
  components: {
    Nav_Bar,
    TableHistory,
    Item_Tabela
  },
  data() {
    return {
      client: null, // Inicializamos como nulo para armazenar os dados do cliente com o ID pretendido
      vehicle: null, // Inicializamos como nulo para armazenar os dados do veículo com o ID do cliente pretendido
      historicoServicos: []
    }
  },
  methods: {
    redirecionarInfo() {
      this.$router.push('/fichaVeiculoInfo');
    },
    getFveiculoI() {
   const carPlateStore = useCarPlateStore();    

      fetch('http://localhost:3000/clients')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(data => {
          // Procuramos o cliente com o ID pretendido e armazenamos os seus dados
          this.client = data.find(cliente => cliente.id === carPlateStore.nome);

          // Procuramos o veículo com o ID pretendido e armazenamos os seus dados
          fetch('http://localhost:3000/vehicles')
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Something went wrong');
              }
            })
            .then(vehiclesData => {
              // Procuramos o veículo com o ID do cliente e armazenamos os seus dados
              this.vehicle = vehiclesData.find(vehicle => vehicle.clientId === "123");
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
    goBack() {
      this.$router.go(-1);
    },
    addServicoCarro(servico) {
      fetch(`http://localhost:3000/service-definitions/`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch service definition details');
          }
        })
        .then(serviceDefinitions => {
          // Encontra o serviço com base no service_definitionId
          const serviceDefinition = serviceDefinitions.find(def => def.id === servico.service_definitionId);
          if (serviceDefinition) {
              // Adiciona o serviço programado à lista de serviços programados com os detalhes obtidos
              this.historicoServicos.push({
                id: servico.id,
                data: servico.data,
                name: serviceDefinition.descr,
                matricula: servico.vehicleId,
                date: servico.date,
                hora:servico.hora
              });
            
          } else {
            console.error('Service definition not found');
          }
        })
        .catch(error => console.error(error));
    },
    addservicosCarroComBaseNoId() {
      const CarStore = useCarPlateStore();
      const carplate = CarStore.plate;

      fetch('http://localhost:3000/services')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(data => {
          const servicosHistorico = data.filter(servico => servico.vehicleId == carplate && servico.estado == 'realizado');
          servicosHistorico.forEach(servico => {
            const serviceWithDate = {
              ...servico,
              matricula: servico.matricula,
              date: servico.data,
              hora: servico.hora
            };
            this.addServicoCarro(serviceWithDate);
          });
        })
        .catch(error => console.error(error));
    }
  },
  created() {
    this.getFveiculoI(); 
    this.addservicosCarroComBaseNoId();
  }
}

</script>


<template>
  <Nav_Bar>
    <img src="../imagens/back_arrow.png"  @click="goBack()" id="seta">
  </Nav_Bar>

  <div class="container">
    <div v-if="client" class="infoclie">
      <div class="info-header">Informações do cliente</div>
      <div class="avatar">
        <img src="../imagens/perfil.png" alt="Avatar">
      </div>
      <div class="infoclie-card">
        <p class="alt" style="color: white;"> {{ client.nome }}</p>
        <div class="info" id="id-user"><b>Id:</b> {{ client.id }}</div>
        <div class="info"><b>Contacto:</b> {{ client.telefone }}</div>
        <div class="info"><b>E-mail:</b> {{ client.email }}</div>
        
        <hr class="separator">
        
        <div class="buttons">
          <button class="info-veiculo-button" @click="redirecionarInfo">Informações sobre o veículo</button>
          <button class="historico-button">Histórico de serviços do veículo</button>
        </div>
      </div>
    </div>

    <div class="barra"></div>
    
    <div class="tabela">
      <TableHistory>
        <Item_Tabela v-for="(service, index) in historicoServicos"
        :key="index" :serviceId="service.id" :serviceDate="service.data">
          <template v-slot:servico>
            <span>{{ service.name }}</span>
          </template>
          <template v-slot:matricula>
            <span>{{ service.matricula }}</span>
          </template>
          <template v-slot:data>
            <span>{{ service.date }}</span>
          </template>
        </Item_Tabela>
      </TableHistory>
    </div>

  </div>
</template>
  
<style scoped>
#seta {
  width: 3%;
  cursor:pointer;
}

#id-user {
  margin-top: 15%;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 92%;
  overflow: hidden;
}

.alt {
  font-weight: 700;
  text-align: center;
  font-size: 20px;
}

.histocar {
  margin-top: 10%;
  border: 4px solid #d9d9d9;
  border-radius: 30px 30px 0px 0px;
  text-align: center;
  width: 90%;
  margin-left: 1%;
  margin-bottom: 10%;
  background: linear-gradient(to bottom, #334562 20%, #ffffff 0%); 
}

.infoclie {
  width: 20vw;
  height: 100%;
  background-color: var(--color-nosso-azul);
}

.infoclie > p {
  color: var(--color-light);
}
  
.info-header {
  text-align: center;
  color: white;
  margin-top: 15%;
  font-size: 20px;
}

.avatar {
  margin-top: 10%;
  text-align: center;
}

.avatar img {
  width: 55%; 
  height: auto; 
}

.buttons {
  text-align: start;
  margin-top: 4%;
}
  
.info-veiculo-button:hover, .historico-button:hover {
  opacity: 0.7; 
  cursor: pointer;
}

.info-veiculo-button, .historico-button {
  background-color: transparent;
  color: #ffffff;
  border: none;
  margin-left: 7%;
  margin-bottom: 20px;
  font-size: 15px;
}

.historico-button {
  text-decoration: underline;
}

.info {
  color: white;
  font-weight: 300; 
  font-size: 18px; 
  text-align: start; 
  margin-left: 7%;
  margin-bottom: 6%;
}
  
.separator {
  border-top: 5px solid #ffffff;
  margin-top: 20%;
  margin-left: 7%;
  margin-right:7%
}
  
.barra {
  background-color: #d9d9d9;
  width: 2vw; 
  height: 100%;
}

.tabela {
  margin-top: 1.5%;
  margin-left: 2%;
  width: 70vw;
  height: 90%;
}
</style>