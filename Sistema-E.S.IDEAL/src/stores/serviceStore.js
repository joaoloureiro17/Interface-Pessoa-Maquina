import { defineStore } from 'pinia';

export const useServiceStore = defineStore('serviceId', {
  state: () => ({
    //inicamos a hora as 9:00 que é quando começa o horário de trabalho 
    horaComparacoes: localStorage.getItem('horaComparacoes') || '09:00',
    id: localStorage.getItem('id') || '',
    estado: localStorage.getItem('estado') || '', 
    service_definitionId: localStorage.getItem('service_definitionId') || '', 
    name: localStorage.getItem('name') || '',
    tipo: localStorage.getItem('tipo') || '',
    material: localStorage.getItem('material') || '',
    quantidade: localStorage.getItem('quantidade') || '',
    duracao: localStorage.getItem('duracao') || '',
    horaInicio: localStorage.getItem('horaInicio') || '',
    horaTermino: localStorage.getItem('horaTermino') || '',
    matriculaCliente: localStorage.getItem('matriculaCliente') || '',
    nomeCliente: localStorage.getItem('nomeCliente') || '',
    contactoCliente: localStorage.getItem('contactoCliente') || '',
    comentario: localStorage.getItem('comentario') || '',
    servicosRecomendados: localStorage.getItem('servicosRecomendados') || '',
    data: localStorage.getItem('data') || ''
  }),
  watch: {
    horaComparacoes: {
      handler(novaHora, horaAntiga) {
        console.log('Hora antiga:', horaAntiga);
        console.log('Nova hora:', novaHora);
      },
      immediate: true
    }
  },
  actions: {
    setId(newId) {
        this.id = newId;
        localStorage.setItem('id', newId);
    },
    // método para atualizar o estado
    setEstado(newEstado) {
        this.estado = newEstado;
        localStorage.setItem('estado', newEstado);
    },
    // método para atualizar service_definitionId
    setServiceDefinitionId(newServiceDefinitionId) {
        this.service_definitionId = newServiceDefinitionId;
        localStorage.setItem('service_definitionId', newServiceDefinitionId);
    },
    setName(newName) {
        this.name = newName;
        localStorage.setItem('name', newName);
    },
    setTipo(newTipo) {
        this.tipo = newTipo;
        localStorage.setItem('tipo', newTipo);
    },
    setMaterial(newMaterial) {
        this.material = newMaterial;
        localStorage.setItem('material', newMaterial);
    },
    setQuantidade(newQuantidade) {
        this.quantidade = newQuantidade;
        localStorage.setItem('quantidade', newQuantidade);
    },
    setDuracao(newDuracao) {
        this.duracao = newDuracao;
        localStorage.setItem('duracao', newDuracao);
    },
    setHoraInicio(newHoraInicio) {
        this.horaInicio = newHoraInicio;
        localStorage.setItem('horaInicio', newHoraInicio);
    },
    setHoraTermino(newHoraTermino) {
        this.horaTermino = newHoraTermino;
        localStorage.setItem('horaTermino', newHoraTermino);
    },
    setMatriculaCliente(newMatriculaCliente) {
        this.matriculaCliente = newMatriculaCliente;
        localStorage.setItem('matriculaCliente', newMatriculaCliente);
    },
    setNomeCliente(newNomeCliente) {
        this.nomeCliente = newNomeCliente;
        localStorage.setItem('nomeCliente', newNomeCliente);
    },
    setContactoCliente(newContactoCliente) {
        this.contactoCliente = newContactoCliente;
        localStorage.setItem('contactoCliente', newContactoCliente);
    },
    setComentario(newComentario) {
        this.comentario = newComentario;
        localStorage.setItem('comentario', newComentario);
    },
    setServicosRecomendados(newServicosRecomendados) {
        this.servicosRecomendados = newServicosRecomendados;
        localStorage.setItem('servicosRecomendados', newServicosRecomendados);
    },
    setData(newData) {
        this.data = newData;
        localStorage.setItem('data', newData);
    },
    setHoraComparacoes(newHoraComparacoes) {
        this.horaComparacoes = newHoraComparacoes;
        localStorage.setItem('horaComparacoes', newHoraComparacoes);
        console.log('Nova hora de comparação:', newHoraComparacoes);
    }
  }
});