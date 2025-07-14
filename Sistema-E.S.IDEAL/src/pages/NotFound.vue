<template>
    <div class="app">
        <Navbar_Empty/>
        <div class="NotFound">
            <h2>Não Encontrada!</h2>
            <div class="avatar">
                <img src="../imagens/Not_Found.png" alt="Avatar" >
            </div>
            <p>Pedimos desculpa, mas a página que procura não existe.</p>
            <button @click="goBack">Voltar à página anterior</button>
        </div>
    </div>
</template>
    
<script>
import Navbar_Empty from '@/components/Navbar_Empty.vue';

export default {
components:{
    Navbar_Empty
    },
inheritAttrs: false,
methods: {
    goBack() {
        this.$router.go(-1); //volta para trás uma página no histórico de navegação
    }
    }
}
</script>
    
<style scoped>

.app {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.NotFound {
    text-align: center;
    width: 100%; /* Define a largura e altura da página como 100% da viewport */
    height: 100%; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2%;
}
    
h2 {
    font-size: 70px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0px;
}

p {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0px;
    margin-bottom: 2%;
}
    
button {
    width: auto; 
    height: auto; 
    padding: 15px 20px;
    background-color:#B9B9B9;
    border-radius: 40px;
    cursor: pointer;
    margin-top: 2%;
    margin-left:auto; 
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
    margin-bottom: 3%;
}

.avatar img {
    margin-top: 3%;
    width: 10%; 
    height: auto;
}
</style>