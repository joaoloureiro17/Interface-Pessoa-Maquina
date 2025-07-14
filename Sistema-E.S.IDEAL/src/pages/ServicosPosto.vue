<template>
  <div class="app">
    <Nav_Bar>
      <img src="../imagens/clock.png" class="clock">
      <span class="horas"> {{ horaComparacoes }} </span>
    </Nav_Bar>

    <div class="container">
      <div class="tabela">
        <TableServicos>
          <template v-slot:titulo>
            <span>Lista de Serviços com Agendamento</span>
          </template>

          <template v-slot:conteudo>
            <Item_Tabela_Servico_A v-for="(service, index) in scheduledServices"
            :key="index" :serviceId="service.id" :serviceHora="service.hora" :serviceEstado="service.estado">
              <template v-slot:servico>
                <span>{{ service.name }}</span>
              </template>
              <template v-slot:data>
                <span>{{ service.date }} {{ service.hora }}</span>
              </template>
            </Item_Tabela_Servico_A>
          </template>
        </TableServicos>
      </div>

      <div class="tabela" id="tabela2">
        <TableServicos>
          <template v-slot:titulo>
            <span>Lista de Serviços sem Agendamento</span>
          </template>

          <template v-slot:conteudo>
            <Item_Tabela_Servico v-for="(service, index) in unscheduledServices"
            :key="index" :serviceId="service.id" :serviceEstado="service.estado">
              <template v-slot:servico>
                <span>{{ service.name }}</span>
              </template>
              <template v-slot:duracao>
                <span>{{ service.duracao }} minutos</span>
              </template>
            </Item_Tabela_Servico>
          </template>
        </TableServicos>
      </div>

      <button class="botao-log-out">
        <img src="../imagens/emergency_exit.png" class="imagem-log-out" @click="logout">
        <span class="texto-log-out" @click="logout">Terminar Sessão </span>
      </button>
    </div>
  </div>
</template>

<script>
import Nav_Bar from '../components/Nav_Bar.vue';
import TableServicos from '@/components/TableServicos.vue';
import Item_Tabela_Servico_A from '@/components/Item_Tabela_Servico_A.vue';
import Item_Tabela_Servico from '@/components/Item_Tabela_Servico.vue';
import { useMechanicStore } from '@/stores/mechanicStore';
import { useServiceStore } from '@/stores/serviceStore';

export default {
  components: {
      Nav_Bar,
      TableServicos,
      Item_Tabela_Servico_A,
      Item_Tabela_Servico
    },
  name: 'ServiceList',
  
  setup() {
    const serviceStore = useServiceStore();

    return {
      horaComparacoes: serviceStore.horaComparacoes
    };
  },

  data() {
  return {
      scheduledServices: [
      ],
      unscheduledServices: [
      ]
    };
  },
  methods: {
    logout() {
        //remove o id de mecanico
        localStorage.removeItem('mechanicId');
        
        const serviceStore = useServiceStore(); // Obtendo a instância da store
        const horaComparacoesNova= '09:00';
        serviceStore.setHoraComparacoes(horaComparacoesNova); // Atualizando a hora de comparação na store
        //vai para a pagina de login
        this.$router.push('/login');
    },
    addServicoProgramado(servico) {
      // Faz a requisição para obter todos os detalhes dos serviços
      fetch('http://localhost:3000/service-definitions/')
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
            // Verifica se o serviço está programado ou em fila de espera
            if (servico.agendamento === 'programado') {
              // Adiciona o serviço programado à lista de serviços programados com os detalhes obtidos
              this.scheduledServices.push({
                id: servico.id,
                estado: servico.estado,
                name: serviceDefinition.descr,
                date: servico.date,
                hora:servico.hora
              });
            } else if (servico.agendamento === 'filaDeEspera') {
              // Adiciona o serviço em fila de espera à lista de serviços não programados com os detalhes obtidos
              this.unscheduledServices.push({
                id: servico.id,
                name: serviceDefinition.descr,
                duracao: serviceDefinition.duração,
                estado: servico.estado
              });
            } else {
              console.error('Unknown service type');
            }
          } else {
            console.error('Service definition not found');
          }
        })
        .catch(error => console.error(error));
    },
      

    addServicosProgramadosComBaseNoId() {
      const mechanicStore = useMechanicStore();
      const mechanicId = mechanicStore.mechanicId;

      // Faz a requisição para obter os serviços programados
      fetch('http://localhost:3000/services')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(data => {
          // Filtra os serviços com base no mechanicId atual
          const servicosProgramados = data.filter(servico => servico.mecId === mechanicId && servico.posto === 'postogasoleo' && servico.estado!='realizado' && servico.estado!='cancelado');

          // Adiciona os serviços filtrados à store
          servicosProgramados.forEach(servico => {
            // Adiciona a data ao serviço antes de buscar os detalhes do serviço
            const serviceWithDate = {
              ...servico,
              date: servico.data, 
              hora:servico.hora
            };
            this.addServicoProgramado(serviceWithDate);
          });
        })
        .catch(error => console.error(error));
    }

  },

  created() {
    this.addServicosProgramadosComBaseNoId(); // Chamamos a função para adicionar os serviços programados ao criar o componente
  }
}
</script>

<style scoped>
.app {
  height: 100%;
  width: 100vw;
}

.horas{
  color: white;
  font-size: 20px;  
}

.container {
  width: 100%;
  height: 92%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.tabela {
  width: 40%;
  height: 80%;
}

#tabela2 {
  margin-left: 5%;
}

.botao-log-out {
  width: 5%;
  border: none;
  background: none;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 1%;
  margin-right: 1%;
  cursor: pointer;
}

.imagem-log-out {
  width: 100%;
}

.texto-log-out {
  width: 100%;
  font-size: 15px;
}
.clock{
  width: 33px; /* Ajuste o tamanho dos ícones conforme necessário */
  height: 33px;
  margin-right:1%;
}

</style>