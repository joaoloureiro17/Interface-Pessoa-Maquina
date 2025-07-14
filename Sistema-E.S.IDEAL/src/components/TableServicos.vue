<template>
    <div class="tabela-geral">
        <div class="tabela-header">
            <span class="tabela-titulo"><slot name="titulo"></slot></span>
        </div>

        <div class="tabela-conteudo">
            <ul class="tabela-lista">
                <slot name="conteudo"></slot>
            </ul>
        </div>
    </div>
</template>
  
<style scoped>

.tabela-geral {
    border: 4px solid #d9d9d9;
    border-radius: 30px 30px 0px 0px;
    width: 100%;
    height: 100%;
}

.tabela-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    background-color: var(--color-nosso-azul);
    border-radius: 26px 26px 0px 0px;
}

.tabela-titulo {
    font-size: 35px;
    color: white;
}

.tabela-conteudo {
    max-height: 75%; 
    overflow-y: auto; 
}

.tabela-lista {
    list-style: none; 
    padding: 0; 
    margin-top: 10px; 
}
  
.tabela-lista li {
    font-size: 18px; 
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

.servico-divisor {
    border-top: 1px solid #d9d9d9; 
    margin-bottom: 10px; 
}

.matricula {
    color: #808080; 
    font-weight: 300;
    font-size: 16px;
    margin-left: 2%;
}

</style>

