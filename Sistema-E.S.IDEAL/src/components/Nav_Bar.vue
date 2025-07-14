<template>
  <nav id="nav">
    <slot></slot>

    <div class="nav-items">
      <router-link to="/ServicosPosto"> 
        <div class="fundo-icon">
          <img src="../imagens/home.png" alt="Home">
        </div>
      </router-link>
      <router-link to="/ProcuraVeiculo"> 
        <div class="fundo-icon">
          <img src="../imagens/search.png" alt="ProcuraVeiculo">
        </div>
      </router-link>
      <router-link to="/PerfilMecanicoHorario"> 
        <div class="fundo-icon">
          <img src="../imagens/user.png" alt="Perfil">
        </div>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--color-nosso-azul);
  height: 8%;
}

.nav-items {
  display: flex;
  margin-left: auto; 
}

.fundo-icon {
  width: 44px; 
  height: 44px; 
  background-color: var(--color-light);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.fundo-icon img {
  width: 33px; 
  height: 33px;
}


</style>
