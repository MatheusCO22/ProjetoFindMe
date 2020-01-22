import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Encontre from '@/views/Encontre'
import Publique from '@/views/Publique'
import CadastramentoEmpresa from '@/views/CadastramentoEmpresa'
import CadastramentoEstudante from '@/views/CadastramentoEstudante'
import EncontreEstudantes from '@/views/EncontreEstudantes'
import MeusProjetos from '@/views/MeusProjetos'
import Sobre from '@/views/Sobre'
import MeuPerfil from '@/views/MeuPerfil'
import Empresa from '@/views/Empresa'
import Projeto from '@/views/Projeto'
import EditarPerfil from '@/views/EditarPerfil'
import InscricoesProjeto from '@/views/InscricoesProjeto'
import Estudante from '@/views/Estudante'
import EditarProjeto from '@/views/EditarProjeto'
import MeusProjetosEstudante from '@/views/MeusProjetosEstudante'
import Avaliacoes from '@/views/Avaliacoes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, 
    {
      path: '/encontre',
      name: 'Encontre',
      component: Encontre

    },
    {
      path: '/publique',
      name: 'Publique',
      component: Publique

    },
    {
      path: '/cadastroEmpresa',
      name: 'CadastramentoEmpresa',
      component: CadastramentoEmpresa
    },
    {
      path:'/cadastroEstudante',
      name: 'CadastramentoEstudante',
      component: CadastramentoEstudante
    },
    {
      path:'/sobre',
      name:'Sobre',
      component: Sobre
    },
    {
      path: '/encontreEstudantes',
      name:'EncontreEstudantes',
      component:EncontreEstudantes
    },
    {
      path: '/meusProjetos',
      name: 'MeusProjetos',
      component: MeusProjetos
    },
    {
      path: '/meuPerfil',
      name: 'MeuPerfil',
      component: MeuPerfil
    },
    {
      path: '/empresa/:id',
      name: 'Empresa',
      component: Empresa 
    },
    {
      path: '/projeto/:id',
      name: 'Projeto',
      component: Projeto
    },
    {
      path: '/editarPerfil',
      name: 'EditarPerfil',
      component: EditarPerfil
    },
    {
      path: '/inscricoes/:id',
      name: 'InscricoesProjeto',
      component: InscricoesProjeto
    },
    {
      path: '/estudante/:id',
      name: 'Estudante',
      component: Estudante
    },
    {
      path: '/editarProjeto/:id',
      name: 'EditarProjeto',
      component: EditarProjeto
    },
    {
      path: '/meusProjetosEstudante',
      name: 'MeusProjetosEstudante',
      component: MeusProjetosEstudante
    },
    {
      path: '/avaliacoes',
      name: 'Avaliacoes',
      component: Avaliacoes
    }
  ]})
