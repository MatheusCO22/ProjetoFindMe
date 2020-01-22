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
          Você ainda não publicou nenhum projeto.
        </v-flex>
        <v-flex
          class="text-erro"
          xs12
          text-xs-center
        >
            Para publicar um projeto clique <router-link to="publique">aqui</router-link>.
        </v-flex>
      </v-card-text>
    </v-card>
    <v-card
      class="rounded-card project-wrapper" 
      v-if="this.load">
        
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
              >
                <v-layout
                  row
                  align-center
                  style="width: 100%"

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
                    wrap
                  >
                    <v-flex
                      xs11
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
                    xs1
                    class="text"
                    style="padding: 0;"
                  >
                    <v-menu
                        bottom
                        center
                      >
                        <template v-slot:activator="{on}">
                          <v-btn
                            class="grey--text"
                            icon
                            v-on="on"
                          >
                            <v-icon>more_vert</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-tile @click="redirecionar('editarProjeto/'+project.id)">
                            <v-list-tile-title>
                              <i class="fas fa-pencil-alt" />
                              <small> Editar projeto</small>
                            </v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile @click="excluir(project.id)">
                            <v-list-tile-title>
                              <i class="fas fa-trash-alt" />
                              <small> Excluir projeto</small>
                            </v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile @click="redirecionar('inscricoes/'+project.id)">
                            <v-list-tile-title>
                              <i class="fas fa-bell" />
                              <small> Inscritos</small>
                            </v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
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
      projects:[],
      load: false
    }
  },
    created(){
      firebase.auth().onAuthStateChanged(()=>{
      const { db } = this.$store.state
      const storage = firebase.storage();

        db.collection('projects').get().then(querySnapshot =>{
          querySnapshot.forEach(doc =>{
            const projeto = {
              'id':doc.id,
              'title': doc.data().title,
              'description' : doc.data().description,
              'requirements': doc.data().requirements,
              'categoria' : doc.data().categoria,
              'data' : doc.data().dataEntrega,
              'user' : doc.data().user.id,
              'imageUrl' : ''
            }
            
            const authUser = firebase.auth().currentUser
            
            if(doc.data().user.id == authUser.uid){
              const storageRef = storage.ref('projects').child(doc.id).child('image')
              storageRef.getDownloadURL()
                .then((url) =>{
                  projeto.imageUrl = url
                }
              )
              this.projects.push(projeto)
            }
          })
          this.load = true
        })
      })
    },
    methods:{
			excluir(idProjeto){
				const { db } = this.$store.state
        const projects = this.projects
        const storage = firebase.storage();
        const storageRef = storage.ref();

				var indice = projects.findIndex(x => x.id == idProjeto)
				
				db.collection("projects").doc(idProjeto).delete().then(()=>{
      

          const fileRef= storageRef.child(idProjeto+ 'file')
          const imageRef= storageRef.child(idProjeto+ 'image')
          
          console.log(fileRef.name)
          console.log(imageRef.name)

          fileRef.delete().then(()=> {
            console.log('apagou o arquivo')
          }).catch((err)=> {
              console.log(error)
          
          })
          imageRef.delete().then(()=> {
            console.log('apagou a foto')
          }).catch((err)=> {
              console.log(error)
          
          })
					projects.splice(indice,1)
					this.$parent.$children[1].openSnack('success','Projeto excluído!')
				},error=>{
          console.error("Error removing document: ", error);
				})
      },
      redirecionar(url){
        this.$router.push(url)
      }
    }
}
</script>

<style lang="scss" scoped>
	/*.card-projeto{
		&:hover{
			color: #FFF;
			transition: 1s;
			margin: 0px -160vw 0px 160vw;
		}
	}*/
  .rounded-card{
    border-radius:35px;
  }
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


