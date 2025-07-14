<template>
    <Navbar_Empty>
        <img src="../imagens/back_arrow.png"  @click="goBack()" id="seta">
    </Navbar_Empty>

    <div class="container">
        <div class="caixa">
            <div class="header-caixa">
                <span class="header-titulo">Serviço iniciado:</span>
            </div>

            <div class="servico">
                <span class="servico-titulo">Serviço:</span>
                <span class="servico-nome">{{ serviceName }}</span>
            </div>

            <div class="comentarios">
                <label for="comentario" class="comentarios-titulo">Comentários:</label>
                <textarea id="comentario" v-model="comentario" placeholder="Indique aqui comentários adicionais do serviço!" class="comentarios-conteudo"></textarea>
            </div>


                <div class="tabela-servicos">
                <table class="tabela-estilizada">
                    <thead>
                    <tr>
                        <th>Serviços Recomendados</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(servico, index) in selectedServices" :key="index">
                            <td class="text-center" style="position: relative;">
                                {{ servico.descr }}
                                <img src="../imagens/remove.png" @click="removeService(index)" alt="Remover" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); cursor: pointer; width: 20px; height: 20px;">
                            </td>
                        </tr>
                    </tbody>

                </table>
                </div>


            <div class="servios-recomendados">
                <span class="servios-recomendados-titulo">Adicionar serviços recomendados:</span>
                <div class="dropdown">
                    <div class="dropdown-fundo">
                        <span class="dropdown-texto"></span>
                    </div>
                    <div class="dropdown-container">
                        <button @click="toggleDropdown" class="dropdown-botao">&#x25BE</button>
                        <div v-show="dropdownVisible" id="myDropdown" class="dropdown-content">
                            <a v-for="service in allServices" :key="service.id" href="#" class="dropdown-item" @click="adicionarServico(service.id)">{{ service.descr }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="servicoSelecionado" class="servico-adicionado mensagem-sucesso">Serviço {{ servicoSelecionado }} adicionado com sucesso!</p>
            <Popup_Error v-if="mostrarMensagemErro" @fechar="mostrarMensagemErro = false">
                <template v-slot:titulo>
                    <span>Este serviço não pode ser selecionado! Escolha um serviço que possa ser realizado neste tipo de veículo.</span>
                </template>
            </Popup_Error>

            <Popup_Error v-if="terminarServico" @fechar="terminarServico = false">
                <template v-slot:titulo>
                    <span>Deseja terminar o serviço?</span>
                </template>

                <template v-slot:opcoes>
                    <div class="botoes-opcoes">
                        <button @click="terminarSim" class="botoes-opcoes-sim">Sim</button>
                        <button @click="fechar_popup" class="botoes-opcoes-nao">Não</button>
                    </div>
                </template>
            </Popup_Error>

            <Popup_Sucess v-if="terminarServicoSim" @fechar="fechar_popup_terminarSim">
                <template v-slot:titulo>
                    <span>Estado do serviço atualizado para concluído e serviços recomendados atualizados!</span>
                </template>
            </Popup_Sucess>

            <Popup_Error v-if="suspenderServico" @fechar="fechar_popup_suspender">
                <template v-slot:titulo>
                    <span>Confirma a suspensão do serviço?</span>
                </template>
                <template v-slot:opcoes>
                    <div class="botoes-opcoes">
                        <button @click="suspenderConfirmado" class="botoes-opcoes-sim">Sim</button>
                        <button @click="fechar_popup_suspender" class="botoes-opcoes-nao">Não</button>
                    </div>
                </template>
            </Popup_Error>
        </div>

        <div class="botoes">
            <button @click="suspender" class="botao" id="botao-suspender">Suspender Serviço</button>
            <button @click="terminar" class="botao" id="botao-finalizar">Finalizar Serviço</button>
        </div>
    </div>
</template>
    
<script>
import Navbar_Empty from '../components/Navbar_Empty.vue';
import Popup_Error from '../components/Popup_Error.vue';
import Popup_Sucess from '../components/Popup_Sucess.vue';
import axios from 'axios';
import { useServiceStore } from '@/stores/serviceStore';

function adicionarMinutos(hora, minutos) {
    const [horaStr, minutosStr] = hora.split(':');
    let horaInt = parseInt(horaStr, 10);
    let minutosInt = parseInt(minutosStr, 10);
    
    minutosInt += minutos;
    
    horaInt += Math.floor(minutosInt / 60);
    minutosInt %= 60;

    horaInt = horaInt.toString().padStart(2, '0');
    minutosInt = minutosInt.toString().padStart(2, '0');
    
    return `${horaInt}:${minutosInt}`;
}

export default {
    components: {
        Navbar_Empty,
        Popup_Error,
        Popup_Sucess
    },
    data() {
        return {
            dropdownVisible: false,
            terminarServico: false,
            terminarServicoSim: false,
            suspenderServico: false,
            mostrarMensagemErro: false,
            allServices: [],
            comentario: '',
            selectedServices: [] 
        };
    },
    methods: {
        terminar() {
            this.terminarServico = true;
        },
        loadServiceData() {
            const serviceStore = useServiceStore();
            if (serviceStore.id) {
                axios.get(`http://localhost:3000/services/${serviceStore.id}`)
                    .then(response => {
                        const serviceData = response.data;
                        this.comentario = serviceData.comentario || '';

                        
                        axios.get('http://localhost:3000/service-definitions')
                            .then(serviceDefinitionsResponse => {
                                this.allServices = serviceDefinitionsResponse.data;

                                if (serviceData['servico-recomendado']) {
                                    this.selectedServices = serviceData['servico-recomendado'].split(',')
                                        .map(id => {
                                            id = id.trim();
                                            const service = this.allServices.find(s => s.id === id);
                                            return service || { id, descr: 'Serviço desconhecido' };
                                        });
                                }
                            })
                            .catch(error => {
                                console.error('Erro ao obter definições de serviço:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Erro ao carregar dados do serviço:', error);
                    });
            }
        },

        suspender() {
            this.suspenderServico = true;
        },
        fechar_popup_suspender(){
            this.suspenderServico = false;
        },
        fechar_popup_terminarSim(){
            this.terminarServicoSim = false;
            this.$router.push('/ServicosPosto');
        },
        fechar_popup() {
            this.terminarServico = false;
        },
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        closeDropdown(event) {
            if (!event.target.matches('.dropdown-botao')) {
                this.dropdownVisible = false;
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        adicionarServico(serviceId) {
            const service = this.allServices.find(s => s.id === serviceId);
            if (this.dieselServices.includes(serviceId)) {
                this.selectedServices.push(service);
                this.servicoSelecionado = service.descr; 
                this.mostrarMensagemSucesso(); 
            } else {
                this.mostrarMensagemErroFunc();
            }
        },
        mostrarMensagemErroFunc() {
            this.mostrarMensagemErro = true;
        },
        mostrarMensagemSucesso() {
            this.servicoSelecionado = service;
        },
        highlightRow(index) {
            this.$refs.tableRows[index].style.backgroundColor = 'lightcoral';
        },
        unhighlightRow(index) {
            this.$refs.tableRows[index].style.backgroundColor = 'white';
        },
        removeService(index) {
            this.selectedServices.splice(index, 1);
            
        },
        terminarSim() {
            const serviceStore = useServiceStore();

            const horaComparacoesAtual = serviceStore.horaComparacoes; 
            let duracaoServico = serviceStore.duracao; // Guarda a duração do serviço
            const estado = serviceStore.estado;
            const service_definitionId = serviceStore.service_definitionId;

            console.log('Estado:', estado);
            console.log('Service Definition ID:', service_definitionId);


            let minutosASomar = 0; 

            if (estado === 'nafila') {
                minutosASomar = duracaoServico;
            } else if ((estado === 'programado' || estado === 'parado') && service_definitionId === 'ad') {
                minutosASomar = duracaoServico - 10;
            } else {
                minutosASomar = duracaoServico + 5;
            }

            console.log('Minutos a Somar:', minutosASomar);

            const horaComparacoesNova = adicionarMinutos(horaComparacoesAtual, minutosASomar); 
            serviceStore.setHoraComparacoes(horaComparacoesNova); 

            this.atualizarServico();
        },
        atualizarServico() {
            const serviceStore = useServiceStore();
            const updateData = {
                estado: "realizado",
                comentario: this.comentario,
                "servico-recomendado": this.selectedServices.map(s => s.id).join(", ")
            };

            axios.patch(`http://localhost:3000/services/${serviceStore.id}`, updateData)
                .then(response => {
                    console.log("Serviço atualizado com sucesso!");
                    this.terminarServicoSim = true;
                })
                .catch(error => {
                    console.error("Erro ao atualizar o serviço:", error);
                });
        },
        suspenderConfirmado() {
            const serviceStore = useServiceStore();
            const horaComparacoesAtual = serviceStore.horaComparacoes; 
            const horaComparacoesNova = adicionarMinutos(horaComparacoesAtual, 10); 
            serviceStore.setHoraComparacoes(horaComparacoesNova); 
            const serviceId = serviceStore.id;


            axios.patch(`http://localhost:3000/services/${serviceId}`, {
                estado: 'parado',
                comentario: this.comentario,
                'servico-recomendado': this.selectedServices.map(service => service.id).join(",")
            })
            .then(response => {
                if (response.status === 200) {
                    console.log("Serviço foi suspenso com sucesso!");
                    this.suspenderServico = false;  // Fecha o popup de suspensão após sucesso
                    this.$router.push('/ServicosPosto');
                } else {
                    console.error("Falha ao suspender o serviço", response);
                }
            })
            .catch(error => {
                console.error("Erro ao suspender o serviço:", error);
            });
        },
    },
    mounted() {
        this.loadServiceData(); // Carrega os dados do serviço ao inicializar o componente

        axios.get('http://localhost:3000/service-definitions')
            .then(response => {
                this.allServices = response.data;
            })
            .catch(error => {
                console.error('Erro ao obter os serviços disponíveis:', error);
            });

        document.addEventListener('click', this.closeDropdown.bind(this));

        axios.get('http://localhost:3000/vehicle-types')
            .then(response => {
                this.dieselServices = response.data.find(vehicleType => vehicleType.id === 'gasoleo').serviços;
            })
            .catch(error => {
                console.error('Erro ao obter os serviços disponíveis para veículos a gasóleo:', error);
            });
    },
    computed: {
        serviceName() {
            const store = useServiceStore();
            return store.name;
        }
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
    }
}
</script>


<style scoped>
    .botoes-opcoes {
        display: flex;
        justify-content: center;
        width: 65%;
        height: 20%;
        font-size: 22px;
    }

    .botoes-opcoes-sim {
        width: 35%;
        border: none;
        background-color: #B6EBC8;
        margin-right: auto;
        font-size: 22px;
        cursor: pointer;
    }

    .botoes-opcoes-nao {
        width: 35%;
        border: none;
        background-color: #D81E1E;
        margin-left: auto;
        font-size: 22px;
        cursor: pointer;
    }

    #seta {
        width: 35%;
        cursor:pointer;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .caixa {
        margin-top: 3%;
        width: 85%;
        height: 60vh;
        border: solid var(--color-nosso-azul);
        border-radius: 15px;
        background-color: #edede9;
    }

    .header-caixa {
        width: 100%;
        height: 15%;
        background-color: var(--color-nosso-azul);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: flex;
        align-items: center;
    }

    .header-titulo {
        color: white;
        font-size: 30px;
        margin-left: 2%;
    }

    .servico {
        height: fit-content;
        margin-top: 2%;
        margin-left: 2%;
    }

    .servico-titulo {
        color: var(--color-nosso-azul);
        font-size: 20px;
        font-weight: bold;
    }

    .servico-nome {
        font-size: 20px;
        margin-left: 1%;
    }

    .comentarios {
        display: flex;
        flex-direction: column;
        margin-top: 2%;
        height: 45%;
        width: 100%;
    }

    .comentarios-titulo {
        color: var(--color-nosso-azul);
        font-size: 20px;
        font-weight: bold;
        margin-left: 2%;
    }

    .comentarios-conteudo {
    margin-left: 2%;
    margin-top: 1.2%;
    width: 50%;
    height: 80%;
    border: none;
    padding: 10px 1%; 
    font-size: 15px; 
    resize: none; 
}


    .comentarios-conteudo::placeholder {
        font-size: 15px;
        
    }

    .servios-recomendados {
        margin-top: 2.5%;
        margin-left: 2%;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .servios-recomendados-titulo {
        font-size: 20px;
        font-weight: bold;
        color: var(--color-nosso-azul);
        width: 30%;
    }

    .dropdown {
        width: 80%;
        display: flex;
    }

    .dropdown-fundo {
        width: 100%;
        background-color: #adb5bd;
    }

    .dropdown-container {
        width: 110%;
        position: relative;
        display: inline-block;
    }

    .dropdown-botao {
        font-size: 30px;
        width: 10%;
        cursor: pointer;
    }

    .dropdown-content {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 90%;
        background-color: #f1f1f1;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        width: 100%;
        max-height: 200px;
        overflow-y: auto; 
    }

    .dropdown-item {
        padding: 0.7%;
        border: solid gray;
        color: black; 
        text-decoration: none;
        cursor: pointer;
    }

    .dropdown-item:hover {
        background-color: #e0e0e0;
    }

    .mensagem-sucesso {
        margin-top: -1px; 
        color: green; 
        margin-left: 8px;
    }

    .botoes {
        display: flex;
        width: 100%;
    }

    .botao {
        width: 15%;
        font-size: 22px;
        border-radius: 15px;
        border: none;
        padding: 0.5%;
        margin-top: 2%;
        cursor: pointer;
    }

    #botao-suspender {
        margin-left: auto;
        margin-right: 2%;
        background-color: #99582a;
    }

    #botao-finalizar {
        margin-right: 8%;
        background-color: #ffd60a;
    }

    .tabela-servicos {
    float: right;
    width: 40%; 
    margin-left: 13%;
    margin-right: 3%;
    margin-top: -15%; 
    max-height: 50%; 
    overflow-y: auto; 
    
}

.tabela-estilizada { 
    width: 100%; 
    border-collapse: collapse; 
    margin-bottom: 20px; 

}

.tabela-estilizada td {
    max-width: 100%;
    padding: 8px;
    border-bottom: 1px solid white;
    background-color: white;
}


.tabela-estilizada tr:hover td {
background-color: lightcoral;
}

.tabela-estilizada th {
    width: 100%; 
    top: 0;
    padding: 8px;
    text-align: center;
    color: white;
    background-color: var(--color-nosso-azul);
    border-bottom: 2px solid #ddd;
}
</style>