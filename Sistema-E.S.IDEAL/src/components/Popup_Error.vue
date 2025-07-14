<template>
  <div class="fundo">
    <button @click="fecharComponente" class="botao-sair">
      <img src="../imagens/cancel.png" class="imagem-fechar">
    </button>
    <slot name="titulo"></slot>

    <div class="linha"></div>

    <slot name="opcoes"></slot>
  </div>
</template>

<script>
export default {
  methods: {
    fecharComponente() {
      this.$emit('fechar');
    }
  }
};
</script>
  
<style scoped>
.fundo {
  position: absolute;
  top: 25vh;
  left: 27vw;
  width: 45vw;
  height: 40vh;
  border-radius: 20px;
  border: #9A031E solid;
  background-color: #F5F0F0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9A031E;
  font-size: 25px;
  text-align: center;

}

.botao-sair {
  position: absolute;
  top: 10%;
  right: 5%;
  border: none;
  background: none;
  width: 5%;
}

.imagem-fechar {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.linha {
  margin-top: 3%;
  margin-bottom: 3%;
  width: 65%;
  height: 2%;
  background: #9A031E;
  display: absolute;
  justify-content: center;
}

</style>
  