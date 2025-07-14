<template>
    <li class="tabela-item" @click="getServiceData()">
        <div class="servico">
            <span class="servico-titulo">Serviço:</span>
            <span class="servico-nome"><slot name="servico"></slot></span>

            <span class="duracao-titulo">Duração:</span>

            <span class="duracao-tempo">
                <span :class="[{'servico-duracao-amarelo': serviceEstado === 'parado'}]">
                    <slot name="duracao"></slot>
                </span>
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
    serviceEstado: {
        type: String,
        required: true
    }
  },
  data() {
  return {
      client_id: null,
      service_id: null
    };
  },
  methods: {

    addConteudoVariaveis(servico) {
        const serviceStore = useServiceStore();

        const horaAtual = new Date();
        const horas = horaAtual.getHours().toString().padStart(2, '0');
        const minutos = horaAtual.getMinutes().toString().padStart(2, '0');
        const horaAtualFormatada = `${horas}:${minutos}`;

        serviceStore.setId(servico.id);
        serviceStore.setEstado(servico.estado);
        serviceStore.setServiceDefinitionId(servico.service_definitionId);
        serviceStore.setHoraInicio(horaAtualFormatada);
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
                //a hora de termino é a hora de inicio + duracao
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
        //Faz a requisição para obter os serviços programados
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
    guardaId() {
        this.service_id = this.serviceId;
    }
  },
  computed: {
    horaResultante() {
      const serviceStore = useServiceStore();

      //parsing da hora inicial em horas e minutos
      const [horasStr, minutosStr] = serviceStore.horaInicio.split(':');
      let horas = parseInt(horasStr);
      let minutos = parseInt(minutosStr);

      //adiciona os minutos
      minutos += serviceStore.duracao;

      //lida com o excesso de minutos(quando é mais de 1 hora/60 minutos)
      horas += Math.floor(minutos / 60);
      minutos %= 60;

      //formata a hora resultante
      const horaResultante = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;

      return horaResultante;
    }

  },
  created() {
    this.guardaId();
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

.duracao-titulo {
    color: #334562; 
    margin-left: auto;
    font-weight: 600;
}

.duracao-tempo {
    white-space: nowrap;
    color: #808080; 
    margin-left: 1%;
    margin-right: 8%; 
    font-weight: 300;
    font-size: 16px;
    width: 60px;
    text-align: right;
}


.servico-duracao-amarelo {
    color: #fabd14; 
}

.servico-divisor {
    border-top: 1px solid #d9d9d9; 
    margin-bottom: 10px; 
}

</style>
