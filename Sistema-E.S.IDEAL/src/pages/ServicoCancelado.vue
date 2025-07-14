<template>
    <Navbar_Empty>
        <img src="../imagens/back_arrow.png"  @click="goBack()" id="seta">
    </Navbar_Empty>
    
    <div class="container">
        <div class="caixa">
            <div class="header-caixa">
                <span class="header-titulo">Indique o motivo pelo qual pretende cancelar o serviço:</span>
            </div>

            <div class="servico">
                <span class="servico-titulo">Serviço:</span>
                <span class="servico-nome">{{ getNome }}</span>
            </div>
            
            <div class="motivo">
                <span class="motivo-titulo">Motivo:</span>
                <textarea v-model="motivoCancelamento" placeholder="Indique aqui o motivo do seu cancelamento!" class="motivo-conteudo"></textarea>

            </div>
        </div>

        <button @click="cancelar_servico" class="botao">Cancelar Serviço</button>

        <Popup_Error v-if="deuMotivoCancelamento" @click="fechar_popup">
            <template v-slot:titulo>
                <span>Por favor indique um motivo para o seu cancelamento.</span>
            </template>
        </Popup_Error>

        <Popup_Error v-if="mostrarComponenteCancelamento" @fechar="mostrarComponenteCancelamento = false">
            <template v-slot:titulo>
                <span>Deseja cancelar o serviço?</span>
            </template>

            <template v-slot:opcoes>
                <div class="botoes-opcoes">
                    <button @click="mostrar_sucesso" class="botoes-opcoes-sim">Sim</button>
                    <button @click="fechar_popup" class="botoes-opcoes-nao">Não</button>
                </div>
            </template>
        </Popup_Error>

        <Popup_Sucess v-if="mostrarComponenteSucesso" @fechar="fechar_popup_sucesso">
            <template v-slot:titulo>
                <span>Serviço cancelado com sucesso!</span>
            </template>
        </Popup_Sucess>
    </div>
</template>
    
<script>
import Navbar_Empty from '../components/Navbar_Empty.vue';
import Popup_Error from '../components/Popup_Error.vue';
import Popup_Sucess from '../components/Popup_Sucess.vue';
import { useServiceStore } from '@/stores/serviceStore';
import axios from 'axios';

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
    components:{
        Navbar_Empty,
        Popup_Error,
        Popup_Sucess
    },
    data() {
        return {
            mechanicCode: '',
            motivoCancelamento: '', // Adicionando uma variável para armazenar o motivo de cancelamento
            mostrarComponenteCancelamento: false,
            mostrarComponenteSucesso: false,
            deuMotivoCancelamento: false
        };
    },
    methods: {
        mostrar_sucesso() {
            this.mostrarComponenteCancelamento = false;
            this.mostrarComponenteSucesso = true;
        },
        cancelar_servico() {
            const serviceStore = useServiceStore();
            const serviceId = serviceStore.id;
            console.log('serviceStore.id:', serviceStore.id);
            
            if (this.motivoCancelamento.trim() !== '') {
                axios.patch(`http://localhost:3000/services/${serviceId}`, {
                    estado: 'cancelado', 
                    comentario: this.motivoCancelamento,
                })
                .then(response => {
                    if (response.status === 200) {
                        this.mostrar_sucesso();
                        serviceStore.setComentario(this.motivoCancelamento);
                    } else {
                        console.error('Erro ao cancelar o serviço');
                    }
                })
                .catch(error => {
                    console.error('Erro ao cancelar o serviço:', error);
                });
            } else {
                this.deuMotivoCancelamento = true;
            }
        },
        fechar_popup() {
            this.mostrarComponenteCancelamento= false;
            this.deuMotivoCancelamento=false;
        },
        fechar_popup_sucesso() {
            const serviceStore = useServiceStore(); 
            const horaComparacoesAtual = serviceStore.horaComparacoes; 
            const horaComparacoesNova = adicionarMinutos(horaComparacoesAtual, 5); 
            serviceStore.setHoraComparacoes(horaComparacoesNova); 

            this.mostrarComponenteSucesso = false;
            this.$router.push('\ServicosPosto')
        },
        goBack() {
        this.$router.go(-1);
        }
    },
    computed: {
      getId() {
          const serviceStore = useServiceStore();
          return serviceStore.id;
      },
      getNome() {
          const serviceStore = useServiceStore();
          return serviceStore.name;
          
      }
    }  
}
</script>

<style scoped>
    #seta {
        width: 35%;
        cursor:pointer;
    }

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

    .motivo {
        display: flex;
        flex-direction: column;
        margin-top: 2%;
        height: 65%;
        width: 100%;
    }

    .motivo-titulo {
        color: var(--color-nosso-azul);
        font-size: 20px;
        font-weight: bold;
        margin-left: 2%;
    }

    .motivo-conteudo {
        margin-left: 2%;
        margin-top: 1.2%;
        width: 96%;
        height: 80%;
        border: none;
        padding: 10px 1%; 
        font-size: 15px; 
        resize: none; 
    }

    .motivo-conteudo::placeholder {
        font-size: 15px;
    }

    .botao {
        margin-left: auto;
        margin-right: 8%;
        width: 15%;
        font-size: 22px;
        border-radius: 15px;
        border: none;
        padding: 0.5%;
        margin-top: 2%;
        background-color: #ffd60a;
        cursor: pointer;
    }
</style>