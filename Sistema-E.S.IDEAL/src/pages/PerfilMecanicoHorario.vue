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
      mechanic: null, // Inicializamos como nulo para armazenar os dados do mecanico
    }
  },
  methods: {
    logout() {
        //remove o id de mecanico
        localStorage.removeItem('mechanicId');
        //vai para a pagina de login
        this.$router.push('/login');
    },
    redirecionarHistorico() {
      this.$router.push('/PerfilMecanicoHistorico');
    },
    getMechanicInfo() {
      const mechanicStore = useMechanicStore(); //iniciamos a store so mecanico   
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
      }  
    },   
  created() {
    this.getMechanicInfo(); //chamamos a função para obter informações do mecânico ao criar o componente
  }
}

</script>


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
          <button class="horario-button">Horário</button>
          <button class="historico-button" @click="redirecionarHistorico">Histórico de serviços</button>
        </div>
        <hr class="separator">
        
        <div class="buttons">
          <button class="terminar-sessao-button" @click="logout">Terminar Sessão</button>
        </div>
      </div>
    </div>

    <div class="barra"></div>

    <div v-if="mechanic" class="horario-container">
      <p class="horario-titulo">Horário Mensal</p>
      <img class="horario-imagem" src="../imagens/horarioMecanico.png" alt="Horário Mensal">
    </div>

  </div>
</template>
  
<style scoped>
.horario-container {
  margin-left: 8%;
  width: 60vw;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.horario-titulo {
  margin-top: 0;
  font-size: 30px;
  font-weight: bold;
}

.horario-imagem {
  width: 100%;
}

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
  text-align: center;
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

.horario-button {
  text-decoration: underline;
}
</style>