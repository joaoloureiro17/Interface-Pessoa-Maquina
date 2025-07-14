import { defineStore } from 'pinia';

export const useCarPlateStore = defineStore('carPlate', {
  state: () => ({
    plate: localStorage.getItem('carPlate') || '',
    nome:  localStorage.getItem('nome') || '',
    servicosCarro: JSON.parse(localStorage.getItem('servicosCarro')) || []
  }),
  actions: {
    setPlate(newPlate) {
      this.plate = newPlate;
      //guarda a matricula localmente (para quando damos refresh os dados não serem apagados)
      localStorage.setItem('carPlate', newPlate);
    },
    setNome(newNome) {
      this.nome = newNome;
      //guardar a matricula localmente ((para quando damos refresh os dados não serem apagados)
      localStorage.setItem('nome', newNome);
    },
    addServicoCarro(servico) {
      this.servicosCarro.push(servico);
      localStorage.setItem('servicosCarro', JSON.stringify(this.servicosCarro));
    }
  }
});