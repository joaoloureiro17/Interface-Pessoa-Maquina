<template>
  <Nav_Bar/>

  <div class="container">
    <div v-if="mechanic" class="infoclie">
      <div class="perfil">
        <img :src="mechanic.imagem">
      </div>

      <div class="infoclie-card">
        <span class="nome">{{ mechanic.nome }}</span>
        <div class="buttons">
          <button class="horario-button" @click="redirecionarHorario">Horário</button>
          <button class="historico-button">Histórico de serviços</button>
        </div>
        
        <hr class="separator">
        
        <div class="buttons">
          <button class="terminar-sessao-button" @click="logout">Terminar Sessão</button>
        </div>
      </div>
    </div>

    <div class="barra"></div>

    <div class="tabela">
      <TableHistory>
        <Item_Tabela v-for="(service, index) in historicoServicos" :key="index" :serviceId="service.id" :serviceDate="service.data">
          <template v-slot:servico>
            <span>{{ service.name }}</span>
          </template>
          <template v-slot:matricula>
            <span>{{ service.matricula }}</span>
          </template>
          <template v-slot:data>
            <span>{{ service.date }}</span>
          </template>
          <template v-slot:hora>
            <span>{{ service.hora }}</span>
          </template>
        </Item_Tabela>
      </TableHistory>
    </div>
  </div>
</template>

<script>
import Nav_Bar from '../components/Nav_Bar.vue';
import TableHistory from '../components/TableHistory.vue';
import Item_Tabela from '../components/Item_Tabela.vue';
import { useMechanicStore } from '@/stores/mechanicStore'; 

export default {
  components: {
    Nav_Bar,
    TableHistory,
    Item_Tabela
  },
  data() {
    return {
      mechanic: null,
      historicoServicos: []
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('mechanicId');
      this.$router.push('/login');
    },
    redirecionarHorario() {
      this.$router.push('/PerfilMecanicoHorario');
    },
    getMechanicInfo() {
      const mechanicStore = useMechanicStore();
      fetch('http://localhost:3000/Mecanico')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(mechanicData => {
          this.mechanic = mechanicData.find(mechanico => mechanico.id === mechanicStore.mechanicId);
        })
        .catch(error => console.log(error));
    },
    addServicoHistorico(servico) {
      // Faz a requisição para obter todos os detalhes dos serviços
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
    addservicosHistoricoComBaseNoId() {
      const mechanicStore = useMechanicStore();
      const mechanicId = mechanicStore.mechanicId;

      fetch('http://localhost:3000/services')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(data => {
          const servicosHistorico = data.filter(servico => servico.mecId === mechanicId && servico.posto === 'postogasoleo' && servico.estado == 'realizado');
          servicosHistorico.forEach(servico => {
            const serviceWithDate = {
              ...servico,
              matricula: servico.matricula,
              date: servico.data,
              hora: servico.hora
            };
            this.addServicoHistorico(serviceWithDate);
          });
        })
        .catch(error => console.error(error));
    }
  },   
  created() {
    this.getMechanicInfo();
    this.addservicosHistoricoComBaseNoId();
  }
}
</script>
  
<style scoped>

.infoclie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.perfil {
  margin-top: 10%;
  text-align: center;
}

.perfil img {
  width: 55%; 
  height: auto; 
}

.buttons {
  text-align: center;
  margin-top: 15%;
}
  
.terminar-sessao-button:hover {
  opacity: 0.7; 
  cursor: pointer;
  text-decoration: underline;
}

.terminar-sessao-button {
  background: none;
  color: #ffffff;
  border: none;
  font-size: 17px;
  width: 100%;
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
  margin-top: 45%;
  width: 80%;
}
  
.barra {
  background-color: #d9d9d9;
  width: 2vw; 
  height: 100%;
}

.nome {
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin-top: 5%;
}

.tabela {
  margin-left: 8%;
  width: 60vw;
  height: 75%;
}

.horario-button:hover, .historico-button:hover {
  opacity: 0.7; 
  cursor: pointer;
  text-decoration: underline;
}

.horario-button, .historico-button {
  background-color: transparent;
  color: #ffffff;
  border: none;
  margin-left: 7%;
  margin-bottom: 20px;
  font-size: 100%;
}

.historico-button {
  text-decoration: underline;
}
</style>