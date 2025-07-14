<template>
    <li class="tabela-item" @click="getServiceData()">
        <div class="servico">
            <span class="servico-titulo">Serviço:</span>
            <span class="servico-nome"><slot name="servico"></slot></span>
        </div>
        
        <span class="servico-data"><slot name="data"></slot></span>
        <span class="servico-hora"><slot name="hora"></slot></span>
        <br>
        <div class="matricula">
            <span class="matricula-titulo">Matricula:</span>
            <span class="matricula-nome"><slot name="matricula"></slot></span>
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
    serviceDate: {
        type: String,
        required: true
    }
  },
  data() {
  return {
      client_id: null,
      service_id: null,
      service_def: null
    };
  },
  methods: {
    addConteudoVariaveis(servico) {
        const serviceStore = useServiceStore();

        serviceStore.setId(servico.id);
        serviceStore.setEstado(servico.estado);
        serviceStore.setServiceDefinitionId(servico.service_definitionId);
        serviceStore.setHoraInicio(servico.hora);
        serviceStore.setMaterial(servico.Material);
        serviceStore.setQuantidade(servico.Quantidade);
        serviceStore.setTipo(servico.tipo);

        serviceStore.setComentario(servico.comentario);
        this.service_def = servico['servico-recomendado'];
        console.log(this.service_def);
        serviceStore.setData(this.serviceDate);

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
                serviceStore.setDuracao(serviceDefinition.duração);
                const horaTermino = this.horaResultante;
                serviceStore.setHoraTermino(horaTermino);
            } else {
            console.error('Service definition not found');
            }
        })
        .catch(error => console.error(error));

        fetch(`http://localhost:3000/service-definitions/`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Failed to fetch service definition details');
            }
        })
        .then(serviceDefinitions => {
            const serviceDefinition = serviceDefinitions.find(def => def.id === this.service_def);
            if (serviceDefinition) {
                serviceStore.setServicosRecomendados(serviceDefinition.descr);
            } else {
                serviceStore.setServicosRecomendados("Não existem serviços recomendados");
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
                this.$router.push('/PagServico');
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

      const [horasStr, minutosStr] = serviceStore.horaInicio.split(':');
      let horas = parseInt(horasStr);
      let minutos = parseInt(minutosStr);

      // Adiciona os minutos
      minutos += serviceStore.duracao;

      // Quando a soma dos minutos passa dos 60, ou seja, passa 1 hora, retiramos os 60 minutos.
      horas += Math.floor(minutos / 60);
      minutos %= 60;

      // Formata a hora resultante
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
}

.servico-titulo {
    margin-left: 2%;
    margin-right: 3%; 
    color: #334562; 
    font-weight: 600;
}

.servico-nome {
    font-weight: 600; 
}

.servico-data {
    color: #808080; 
    font-size: 16px; 
    margin-left: 80%; 
    font-weight: 300; 
}

.servico-hora {
    color: #808080; 
    font-size: 16px; 
    margin-left: 1%; 
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

