<template>
    <Nav_Bar>
      <img src="../imagens/back_arrow.png"  @click="goBack()" id="seta">
    </Nav_Bar>
  
    <div class="container">
        <div class="tabela-geral">
            <div class="tabela">
                <div class="tabela-header">
                    <span class="tabela-header-titulo">Informações relativas ao serviço</span>
                </div>
                <div class="tabela-conteudo">
                    <div class="bloco" id="bloco-1">
                        <span class="titulo">Serviço:</span>
                        <span class="conteudo">{{ getNome }}</span>
  
                        <span class="titulo" id="titulo-tipo">Tipo:</span>
                        <span class="conteudo">{{ getTipo }}</span>
                    </div>
                    
                    <div class="bloco">
                        <span class="titulo">Material:</span>
                        <span class="conteudo">{{ getMaterial }}</span>
                    </div>
  
                    <div class="bloco">
                        <span class="titulo">Quantidade:</span>
                        <span class="conteudo">{{ getQuantidade }}</span>
                    </div>  
  
                    <div class="bloco">
                        <span class="titulo">Duração Expectável:</span>
                        <span class="conteudo">{{ getDuracao }} minutos</span>
                    </div>
  
                    <div class="bloco">
                        <span class="titulo">Hora da Marcação:</span>
                        <span class="conteudo">{{ getHoraInicio }}</span>
  
                        <span class="titulo" id="titulo-tipo">Hora de Fim Estimada:</span>
                        <span class="conteudo">{{ getHoraTermino }}</span>
                    </div>
  
                    <span class="informacoes-cliente">Informações do cliente:</span>
  
                    <div class="bloco">
                        <span class="titulo">Matrícula:</span>
                        <span class="conteudo">{{ getMatricula }}</span>
                    </div>
  
                    <div class="bloco">
                        <span class="titulo">Nome do Cliente:</span>
                        <span class="conteudo">{{ getNomeCliente }}</span>
  
                        <span class="titulo" id="titulo-tipo">Contacto:</span>
                        <span class="conteudo">{{ getContacto }}</span>
                    </div>
                </div>
            </div>
            
            <div class="botoes">
                <button class="botao botao-iniciar" @click="iniciarServico">Iniciar Serviço</button>
                <button class="botao botao-cancelar" @click="cancelarServico">Cancelar Serviço</button>
            </div>
        </div>
        
        <img src="../imagens/img_servicos.png" class="imagem-carro">
    </div>
  </template>
  
  <script>
  import Nav_Bar from '@/components/Nav_Bar.vue';
  import { useServiceStore } from '@/stores/serviceStore';
  
  export default {
  components:{
    Nav_Bar
  },
  computed: {
      getNome() {
          const serviceStore = useServiceStore();
          return serviceStore.name;
      },
      getTipo() {
          const serviceStore = useServiceStore();
          return serviceStore.tipo;
      },
      getMaterial() {
          const serviceStore = useServiceStore();
          return serviceStore.material;
      },
      getQuantidade() {
          const serviceStore = useServiceStore();
          return serviceStore.quantidade;
      },
      getDuracao () {
          const serviceStore = useServiceStore();
          return serviceStore.duracao;
      },
      getHoraInicio() {
          const serviceStore = useServiceStore();
          return serviceStore.horaInicio;
      },
      getHoraTermino() {
          const serviceStore = useServiceStore();
          return serviceStore.horaTermino;
      },
      getMatricula() {
          const serviceStore = useServiceStore();
          return serviceStore.matriculaCliente;
      },
      getNomeCliente() {
          const serviceStore = useServiceStore();
          return serviceStore.nomeCliente;
      },
      getContacto() {
          const serviceStore = useServiceStore();
          return serviceStore.contactoCliente;
      }
      },
      methods: {
          goBack() {
          this.$router.go(-1);
          },
          cancelarServico(){
              this.$router.push('/servicoCancelado');
          },
          iniciarServico(){
              this.$router.push('/servicoIniciado');
          }
      }
  }
  </script>
  
  <style scoped>
  #seta {
    width: 3%;
    cursor:pointer;
  }
  
  .container {
      height: 92%;
      width: 100%;
      display: flex;
      flex-direction: row;
  }
  
  .tabela-geral {
      width: 75%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 3%;
  }
  
  .tabela {
      width: 70%;
      height: 82%;
      border: solid var(--color-nosso-azul);
      border-radius: 15px;
      background-color: #edede9;
  }
  
  .tabela-header {
      width: 100%;
      height: 20%;
      background-color: var(--color-nosso-azul);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  
  .tabela-header-titulo {
      font-size: 30px;
      color: white;
  }
  
  .tabela-conteudo {
      display: flex;
      flex-direction: column;
      width: 100%;
  }
  
  .bloco {
      margin-left: 4%;
      margin-top: 2%;
      display: flex;
  }
  
  .titulo {
      font-size: 20px;
      font-weight: bold;
  }
  
  .conteudo {
      font-size: 20px;
      margin-left: 1%;
  }
  
  #titulo-tipo {
      margin-left: 25%;
  }
  
  #bloco-1 {
      margin-top: 3%;
  }
  
  .informacoes-cliente {
      margin-top: 5%;
      font-size: 25px;
      font-weight: bold;
      color: var(--color-nosso-azul);
      text-align: center;
  }
  
  .botoes {
      margin-top: 2%;
      display: flex;
      width: 100%;
      justify-content: center;
  }
  
  .botao {
      width: 18%;
      font-size: 22px;
      border-radius: 15px;
      border: none;
      padding: 0.5%;
      cursor: pointer;
  }
  
  .botao-cancelar {
      margin-right: 2%;
      background-color: #D43535;
  }
  
  .botao-iniciar {
      margin-right: 8%;
      background-color: #FDE047;
  }
  
  .imagem-carro {
      height: 100%;
      width: 25%;
      margin-left: auto;
  }
  </style>