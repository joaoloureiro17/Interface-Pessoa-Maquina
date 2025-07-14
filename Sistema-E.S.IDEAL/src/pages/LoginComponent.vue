<template>
  <div class="app">
    <Navbar_Empty />
    <div class="authentication">
      <div class="avatar">
        <img src="../imagens/mechanic.png" alt="Avatar">
      </div>
      <h1 class="titulo">Autenticação</h1>
      <p class="descricao">Insira as suas credenciais de acesso</p>
      <div class="input-group">
        <input type="text" id="mechanicId" v-model="mechanicId" placeholder="Digite o seu código de mecânico...">
      </div>
      <button @click="login"><span>Iniciar Sessão</span></button>
      <Popup_Error v-if="mechanicExists" @click="fechar_popup">
            <template v-slot:titulo>
                <span>Os dados inseridos estão incorretos.</span>
            </template>
      </Popup_Error>
      <Popup_Error v-if="qualificacaoInvalida" @click="fechar_popup">
            <template v-slot:titulo>
                <span>Não tem habilitações para trabalhar neste posto!</span>
            </template>
      </Popup_Error>
    </div>
  </div>
</template>

<script>
import Popup_Error from '@/components/Popup_Error.vue';
import Navbar_Empty from '../components/Navbar_Empty.vue';
import { useMechanicStore } from '@/stores/mechanicStore';


export default {
  components: {
    Navbar_Empty,
    Popup_Error
  },
  data() {
    return {
      mechanicExists: false,
      qualificacaoInvalida: false
    };
  },
  methods: {
    async login() {
  try {
    // Fazer a solicitação para obter a lista de mecânicos
    const response = await fetch('http://localhost:3000/Mecanico');
    const mechanics = await response.json();
  
    // Verificar se a matrícula existe na lista de mecânicos
    const mechanic = mechanics.find(mechanic => mechanic.id === this.mechanicId);

    if (mechanic) {
      // Verificar se o mecânico possui a competência "gasoleo"
      if (mechanic.competencias.includes("gasoleo")) {
        // Inicializa o store
        const mechanicStore = useMechanicStore();

        // Armazena o ID do mecânico no store
        mechanicStore.setId(this.mechanicId);

        console.log('mechanicId na store:', mechanicStore.mechanicId);

        console.log('Código de mecânico 2:', this.mechanicId);

        await this.$router.push('/ServicosPosto');
      } else {
        // Exibir o  popup de erro se o mecânico não possui a competência "gasoleo"
        this.qualificacaoInvalida = true;
      }
    } else {
      // Se o mecânico não existir na lista, exibe popup de erro
      this.mechanicExists = true;
    }
  } catch (error) {
    // Exibe o popup de erro se ocorrer um erro na solicitação
    this.mechanicExists = true;
    this.qualificacaoInvalida = true;

    console.error('Erro ao buscar a lista de mecânicos:', error);
  }
},
fechar_popup() { //carExists passa a false(default) para retirar o Popup
      this.mechanicExists = false;
      this.qualificacaoInvalida=false;
    }

  }
}
</script>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.authentication {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.titulo {
  font-size: 70px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
}

.descricao {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  margin-bottom: 50px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  max-width: 700px;
  width: 500px;
  max-height: 46px;
  padding: 8px;
  font-size: 18px;
  border: 2px solid #000;
  border-radius: 20px;
  background-color: #D9D9D9;
}

button {
  width: auto;
  height: auto;
  padding: 15px 20px;
  background-color: #B9B9B9;
  border-radius: 40px;
  cursor: pointer;
  margin-top: 30px;
  margin-left: auto;
  margin-right: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button span {
  font-family: "Arial-Regular", Helvetica;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  font-style: normal;
  line-height: normal;
}

button:hover {
  background-color: #ccc;
}

.avatar {
  text-align: center;
  margin-bottom: 20px;
}

.avatar img {
  width: 10%;
  height: auto;
}
</style>