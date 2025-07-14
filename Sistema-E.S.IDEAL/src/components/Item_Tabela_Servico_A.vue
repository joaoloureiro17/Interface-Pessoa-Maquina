<template>
    <li class="tabela-item" @click="getServiceData()">
        <div class="servico">
            <span class="servico-titulo">Serviço:</span>
            <span class="servico-nome"><slot name="servico"></slot></span>
            <span :class="[serviceEstado === 'parado' ? 'servico-data-amarelo' : (servicoDataClasse === 'servico-data-vermelho' ? 'servico-data-vermelho' : 'servico-data-normal')]">
                <slot name="data"></slot>
            </span>

        </div>
        <hr class="servico-divisor">
    </li>
</template>

<script>
import { useServiceStore } from '@/stores/serviceStore';

export default {
  props: {
    serviceId: {
        type: String,
        required: true
    },
    serviceHora: {
        type: String,
        required: true
    },
    serviceEstado: {
        type: String,
        required: true
    }
  },
  data() {
  return {
      client_id: null,
      service_id: null,
      service_hora: null
    };
  },
  methods: {
    // Corrigir a base de dados para nao ter comentários em serviços programada?=
    addConteudoVariaveis(servico) {
        const serviceStore = useServiceStore();

        serviceStore.setId(servico.id);
        serviceStore.setEstado(servico.estado);
        serviceStore.setServiceDefinitionId(servico.service_definitionId);
        serviceStore.setHoraInicio(servico.hora);
        serviceStore.setMaterial(servico.Material);
        serviceStore.setQuantidade(servico.Quantidade);
        serviceStore.setTipo(servico.tipo);

        fetch(`http://localhost:3000/service-definitions/`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch service definition details');
            }
        })
        .then(serviceDefinitions => {
            const serviceDefinition = serviceDefinitions.find(def => def.id === servico.service_definitionId);
            if (serviceDefinition) {
                serviceStore.setName(serviceDefinition.descr);
                // A hora de termino é a hora de inicio + duracao
                serviceStore.setDuracao(serviceDefinition.duração);
                const horaTermino = this.horaResultante;
                serviceStore.setHoraTermino(horaTermino);
            } else {
            console.error('Service definition not found');
            }
        })
        .catch(error => console.error(error));

        fetch(`http://localhost:3000/vehicles/`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch vehicles details');
            }
        })
        .then(vehicles => {
            const vehicle = vehicles.find(veh => veh.id === servico.vehicleId);
            if (vehicle) { 
                serviceStore.setMatriculaCliente(vehicle.id);
                this.client_id = vehicle.clientId;
            } else {
            console.error('Vehicle not found');
            }
        })
        .catch(error => console.error(error));

        fetch(`http://localhost:3000/clients/`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch client details');
            }
        })
        .then(clients => {
            const client = clients.find(cli => cli.id === this.client_id);
            if (client.id) {
                serviceStore.setNomeCliente(client.nome);
                serviceStore.setContactoCliente(client.telefone);
            } else {
                console.error('Client not found');
            }
        })
        .catch(error => console.error(error));
    },
    getServiceData() {
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
                const service = data.find(servico => servico.id === this.service_id);
                this.addConteudoVariaveis(service);
                this.$router.push('/ServicoExpandido');
            })
            .catch(error => console.error(error));
    },
    guardaHoraInicioId() {
        this.service_id = this.serviceId;
        this.service_hora = this.serviceHora;
    }
  },
  computed: {
    isAtrasado() {
        const serviceStore = useServiceStore();

        // Extrair horas e minutos de serviceStore.horaComparacoes
        const horaComparacoes = serviceStore.horaComparacoes.split(":");
        const horaComparacoesHora = parseInt(horaComparacoes[0]);
        const horaComparacoesMinuto = parseInt(horaComparacoes[1]);

        // Extrair horas e minutos de serviceStore.horaInicio
        const horaInicio = this.service_hora.split(":");
        const horaInicioHora = parseInt(horaInicio[0]);
        const horaInicioMinuto = parseInt(horaInicio[1]);

        // Comparar apenas horas e minutos
        if (horaInicioHora > horaComparacoesHora || (horaInicioHora === horaComparacoesHora && horaInicioMinuto >= horaComparacoesMinuto)) {
            return false;
        } else {
            return true;
        }
    },
    horaResultante() {
      const serviceStore = useServiceStore();

      // Quebra a hora inicial em horas e minutos
      const [horasStr, minutosStr] = serviceStore.horaInicio.split(':');
      let horas = parseInt(horasStr);
      let minutos = parseInt(minutosStr);

      // Adiciona os minutos
      minutos += serviceStore.duracao;

      // Lida com o excesso de minutos
      horas += Math.floor(minutos / 60);
      minutos %= 60;

      // Formata a hora resultante
      const horaResultante = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;

      return horaResultante;
    }

  },
  created() {
    this.guardaHoraInicioId();
    const isServiceDelayed = this.isAtrasado;
    this.servicoDataClasse = isServiceDelayed ? 'servico-data-vermelho' : 'servico-data-normal';
  }
}

</script>

  
<style scoped>
  
.tabela-item {
    font-size: 18px; 
    list-style: none;
    cursor: pointer;
}

.servico {
    display: flex;
    margin-bottom: 4%;
}

.servico-titulo {
    margin-left: 2%;
    margin-right: 3%; 
    color: #334562; 
    font-weight: 600;
}

.servico-nome {
    font-weight: 600; 
    max-width: 35%;
}

.servico-data-normal {
    color: #808080; 
    font-size: 16px; 
    margin-left: auto;
    margin-right: 5%; 
    font-weight: 300; 
}

.servico-data-amarelo {
    color: #fabd14; 
    font-size: 16px; 
    margin-left: auto;
    margin-right: 5%; 
    font-weight: 300; 
}

.servico-data-vermelho {
    color: red;
    font-size: 16px; 
    margin-left: auto;
    margin-right: 5%; 
    font-weight: 300; 
}

.servico-divisor {
    border-top: 1px solid #d9d9d9; 
    margin-bottom: 10px; 
}

.matricula {
    color: #808080; 
    font-weight: 300;
    font-size: 16px;
    margin-left: 2%;
    display: flex;
}

.matricula-nome {
    margin-left: 1%;
}

</style>

