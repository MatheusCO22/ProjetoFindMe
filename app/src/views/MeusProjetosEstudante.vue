<template>
  <v-container>
    <v-card
      v-if="!this.load"
      class="rounded-card loading"
    >
      <v-img
        :src="require('../assets/loading-engrenagem.gif')"
        max-height="500"
        class="grey darken-4"
      />
    </v-card>
    <v-card class="rounded-card no-projects elevation-7"
      v-if="this.load && this.projects.length == 0"
      color="rgba(255, 255, 255, 0.8)"
      flat
    >
      <v-card-text>
        <v-flex
          xs12
          text-xs-center
        >
          <i
            class="fas fa-exclamation-triangle"
            style="color:#FFCD00; font-size: 40px;"
          />
        </v-flex>
      </v-card-text>
        
      <v-card-text >
        <v-flex
          class="text-erro"
          xs12
          text-xs-center
        >
          Você ainda não se inscreveu em nenhum projeto.
        </v-flex>
        <v-flex
          class="text-erro"
          xs12
          text-xs-center
        >
            Para ver os projetos disponíveis clique <router-link to="encontre">aqui</router-link>.
        </v-flex>
      </v-card-text>
    </v-card>

    <v-card
      v-if="this.load"
      class="rounded-card"
      color="rgba(255, 255, 255, 0.8)"
      flat
    >
      <v-card
        v-for="(project, index) in projects"
        :key="project.id"
      >
        <v-divider 
          v-if="index != 0"
        />
          <v-card-text>
            <v-container
              grid-list-lg
              fluid
            >
              <v-layout
                row
                justify-center
                align-center
                style="width:100%;"
              >
                <v-avatar
                  color="light-grey"
                  size="220px"
                >
                  <img
                    v-if="!project.imageUrl"
                    src="https://artia.com/wp-content/uploads/2018/01/como-identificar-e-minimizar-os-riscos-do-projeto.png"
                  >
                  <img
                    v-if="project.imageUrl"
                    :src="project.imageUrl"
                  >
                </v-avatar>

                <v-divider class="divider" vertical />

                <v-layout
                  column
                  style="width:100%;"
                > 
                  <v-flex
                    xs12
                    class="text"
                  >
                    <router-link
                      class="title"
                      :to="`projeto/${project.id}`"
                    >
                      {{ project.title }}
                    </router-link>
                  </v-flex>
                  <v-flex
                    xs12
                    class="text"
                  >
                    <b>Descrição: </b>{{project.description}}
                  </v-flex>
                  <v-flex
                    xs12
                    class="text"
                  >
                    <b>Requisitos: </b> {{project.requirements}}
                  </v-flex>
                  <v-flex
                    xs12
                    class="text"
                  >
                    <b>Categoria: </b> {{project.categoria}}
                  </v-flex>
                  <v-flex
                    xs12
                    class="text"
                  >
                    <b>Data limite: </b> {{project.data}}
                  </v-flex>
                  <v-flex
                    xs12
                    class="text"
                  >
                    <b>Empresa: </b>
                    <router-link :to="`empresa/${project.idEmpresa}`">
                      {{project.nomeEmpresa}}
                    </router-link>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-container>
          </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase';
  export default {
    data(){
      return{
        db: this.$store.state,
          projects:[],
          load: false
        }
    },
    methods:{
      redirecionarProjeto(idProjeto){
        this.$router.push('projeto/'+ idProjeto)
      },
      redirecionarEmpresa(idEmpresa){
        this.$router.push('empresa/'+ idEmpresa)
      }
    },
    created(){
      const userId = this.$store.state.authUser.uid
      const { db } = this.$store.state
  
      db.collection('inscricoes').where("user", "==", userId).get().then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
          const idProjeto=doc.data().project.id
          db.collection('projects').doc(idProjeto).get().then((docProjeto)=>{
            const projeto={ 
              'id': docProjeto.id,
              'title': docProjeto.data().title,
              'description' : docProjeto.data().description,
              'requirements': docProjeto.data().requirements,
              'categoria' : docProjeto.data().categoria,
              'data' : docProjeto.data().dataEntrega,
              'idEmpresa' : docProjeto.data().user.id,
              'nomeEmpresa': '',
              'imageUrl' : null
            }

            db.collection('users').doc(docProjeto.data().user.id).get().then((doc)=>{
              console.log(doc.data().nome)
              projeto.nomeEmpresa = doc.data().nome
            })

            const storageRef = firebase.storage().ref('projects').child(projeto.id).child('image')
            storageRef.getDownloadURL().then((url) => {
              projeto.imageUrl = url
            })
            this.projects.push(projeto)
          })
        })
        this.load = true
      })
    }
  }
</script>

<style lang="scss" scoped>
  .divider{
    margin: 0px 50px;
  }
  a{
    text-decoration: none;
    color:#1867FF;
  }
  a.title{
    font-size: 25px !important; 
    transition: ease 0.4s;
    color:#1867FF;
    &:hover{
      transition: ease 0.4s;
      text-shadow: #16313044 0px 0px 5px;
    }
  }
  .text b{
    font-size: 18px;
    color: #32393F;
    font-weight: 500;
  }
  .text{
    font-size: 15px;
    color: #616161;
  }
</style>