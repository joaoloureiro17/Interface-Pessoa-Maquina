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
                        <span class="titulo">Data:</span>
                        <span class="conteudo">{{ getData }}</span>
                    </div>

                    <div class="bloco">
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
                </div>
            </div>

            <div class="tabela2">
                <div class="bloco2">
                    <span class="titulo2" id="comentarios">Comentários:</span>
                    <span class="conteudo2">{{ getComentario }}</span>
                </div>

                <div class="bloco2">
                    <span class="titulo2" id="servicos-recomendados">Serviços recomendados:</span>
                    <span class="conteudo2">{{ getServicosRecomendados }}</span>
                </div>
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
  methods: {
    goBack() {
      this.$router.go(-1);
    }},
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
      },
      getComentario() {
          const serviceStore = useServiceStore();
          return serviceStore.comentario;
      },
      getServicosRecomendados() {
          const serviceStore = useServiceStore();
          return serviceStore.servicosRecomendados;
      },
      getData() {
          const serviceStore = useServiceStore();
          return serviceStore.data;
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
    margin-top: 1%;
}

.tabela {
    width: 70%;
    height: 58%;
    border: solid var(--color-nosso-azul);
    border-radius: 15px;
    background-color: #edede9;
}

.tabela2 {
    margin-top: 2%;
    width: 70%;
    height: 30%;
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
    margin-top: 4%;
    display: flex;
}

.bloco2 {
    display: flex;
    flex-direction: column;
}

.titulo {
    font-size: 20px;
    font-weight: bold;
}

.titulo2 {
    font-size: 20px;
    font-weight: bold;
    margin-left: 4%;
}

.conteudo {
    font-size: 20px;
    margin-left: 1%;
}

.conteudo2 {
    font-size: 20px;
    margin-left: 4%;
    margin-top: 0.5%;
}

#servicos-recomendados {
    margin-top: 4%;
}

#comentarios {
    margin-top: 2%;
}

#titulo-tipo {
    margin-left: 25%;
}

#bloco-1 {
    margin-top: 5%;
}

.informacoes-cliente {
    margin-top: 5%;
    font-size: 25px;
    font-weight: bold;
    color: var(--color-nosso-azul);
    text-align: center;
}

.imagem-carro {
    height: 100%;
    width: 25%;
    margin-left: auto;
}
</style>