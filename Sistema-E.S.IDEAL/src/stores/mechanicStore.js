import { defineStore } from 'pinia';

export const useMechanicStore = defineStore('mechanicId', {
  state: () => ({
    mechanicId: localStorage.getItem('mechanicId') || '',
    servicosProgramados: JSON.parse(localStorage.getItem('servicosProgramados')) || [],
    servicosHistorico: JSON.parse(localStorage.getItem('servicosHistorico')) || []
  }),
  actions: {
    setId(newId) {
      this.mechanicId = newId;
      // Guardar o id localmente, para ficar sempre guardado, mesmo quando for efetuado um refresh 
      localStorage.setItem('mechanicId', newId);
    },
    addServicoProgramado(servico) {
      this.servicosProgramados.push(servico);
      localStorage.setItem('servicosProgramados', JSON.stringify(this.servicosProgramados));
    },
    addServicoNaoProgramado(servico) {
      this.servicosHistorico.push(servico);
      localStorage.setItem('servicosHistorico', JSON.stringify(this.servicosHistorico));
    },
    removeServicoProgramado(servicoIndex) {
      this.servicosProgramados.splice(servicoIndex, 1);
      localStorage.setItem('servicosProgramados', JSON.stringify(this.servicosProgramados));
    },
    removeServicoNaoProgramado(servicoIndex) {
      this.servicosHistorico.splice(servicoIndex, 1);
      localStorage.setItem('servicosHistorico', JSON.stringify(this.servicosHistorico));
    }
  }
});