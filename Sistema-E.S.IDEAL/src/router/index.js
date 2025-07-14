import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/NotFound.vue'
import LoginComponent from '../pages/LoginComponent.vue'
import FveiculoInf from '../pages/FveiculoInf.vue'
import ProcuraVeiculo from '@/pages/ProcuraVeiculo.vue'
import ServicosPosto from '@/pages/ServicosPosto.vue'
import FveiculoHis from '@/pages/FveiculoHis.vue'
import ServicoExpandido from '@/pages/ServicoExpandido.vue'
import PagServico from '@/pages/PagServico.vue'
import PerfilMecanicoHistorico from '@/pages/PerfilMecanicoHistorico.vue'
import ServicoIniciado from '@/pages/ServicoIniciado.vue'
import ServicoCancelado from '../pages/ServicoCancelado.vue'
import PerfilMecanicoHorario from '@/pages/PerfilMecanicoHorario.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginComponent }, 
    { path: '/fichaVeiculoInfo', component: FveiculoInf }, 
    { path: '/ProcuraVeiculo', component: ProcuraVeiculo }, 
    { path: '/ServicosPosto', component: ServicosPosto}, 
    { path: '/fichaVeiculoHist', component: FveiculoHis},
    { path: '/ServicoExpandido', component: ServicoExpandido},
    { path: '/PerfilMecanicoHistorico', component: PerfilMecanicoHistorico}, 
    { path: '/PagServico', component: PagServico}, 
    { path: '/servicoCancelado', component: ServicoCancelado },
    { path: '/servicoIniciado', component: ServicoIniciado },
    { path: '/PerfilMecanicoHorario', component: PerfilMecanicoHorario},
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

export default router
