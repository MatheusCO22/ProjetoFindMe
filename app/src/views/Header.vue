<template>
  <v-toolbar
    dark
    class="header"
    color="#162130"
    height="70"
  >
    <v-toolbar-title class="white--text">
      <router-link to="/">
        <div class="divLogo">
          <img
            class="logo"
            src="../assets/HeaderLogo.png"
            alt="Logo"
          >
        </div>
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        v-if="$store.state.dbUser && $store.state.dbUser.type==='estudante'"
        flat
        @click="redirect('encontre')"
      >
        Encontre
      </v-btn>
      <v-btn
        v-if="$store.state.dbUser && $store.state.dbUser.type==='empresa'"
        flat
        @click="redirect('publique')"
      >
        Publique
      </v-btn>
      <v-btn
        v-if="$store.state.dbUser && $store.state.dbUser.type==='empresa'"
        flat
        @click="redirect('encontreEstudantes')"
      >
        Encontre estudantes 
      </v-btn>
      <v-btn
        flat
        @click="redirect('sobre')"
      >
        Sobre
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <template>
      <div class="text-xs-center">
        <v-menu
          v-model="menu"
          transition="slide-y-transition"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              style="font-size: 20px;"
              v-on="on"
            >
              <i class="fas fa-user" />
            </v-btn>
          </template>
          <v-card>
            <v-list style="background-color:#16161622">
              <v-list-tile
                avatar
                @click="onClickProfile"
              >
                <v-list-tile-avatar class="avatar">
                  <i v-if="!fotoUrl"
                    class="fas fa-user"
                    style="font-size:20px; color:#455A64"
                    alt="10px"
                  />
                   <img  v-if="fotoUrl" 
                    :src="fotoUrl"
                    alt="25px"
                  >
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ firstname() }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ tipo() }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider />
            <v-list>
              <v-list-tile :disabled="!this.$store.state.authUser" @click="onClickProjects">
                <v-list-tile-title>
                  Meus Projetos
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile :disabled="!this.$store.state.authUser" @click="onClickEvaluation">
                <v-list-tile-title>
                  Avaliações
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile :disabled="!this.$store.state.authUser" @click="logout">
                <v-list-tile-title>
                  Sair
                </v-list-tile-title>
              </v-list-tile>
             </v-list>
          </v-card>
        </v-menu>
      </div>
    </template>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'
export default {
  data(){
    return{
      dialogLogin:false,
      snacksucesso: false,
      snackerro: false,
      menu: false, 
      fotoUrl: '',
    }
  },

  created(){
    firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
        this.atualizarImagem()
      }
    })
  },
  
  methods:{
    logger(){},
    teste(){
      this.$parent.$children[2].dialogConfirmacao = true
    },
    redirect(arg){
      this.menu=false
      var url = "/"+arg
      this.$router.push(url)
    },
    onClickProfile(){
      this.menu=false
      if(this.$store.state.authUser){
        this.redirect('meuPerfil')
      }else{
        this.$parent.$children[0].open()
      }
      },
      onClickProjects(){
        this.menu=false
       if(this.$store.state.authUser && this.$store.state.dbUser.type==='empresa'){
        this.redirect('meusProjetos')
      } 
      if(this.$store.state.authUser && this.$store.state.dbUser.type==='estudante'){
        this.redirect('meusProjetosEstudante')
      }   
      if(!this.$store.state.authUser){
        this.$parent.$children[0].open()
      }

      },
      onClickEvaluation(){
        this.menu=false
        if(this.$store.state.authUser){
         this.redirect('avaliacoes')
        }else{
          this.$parent.$children[0].open()
        }
      },
      atualizarImagem(){
        console.log('update imagem-- chegou')
        const user = this.$store.state.authUser
        const storage = firebase.storage()
        const storageRef = storage.ref()

        if(user!=null){
          const email = user.email
          const imageRef = storage.ref('users').child(email).child('image')

          imageRef.getDownloadURL().then(
            url => this.fotoUrl = url       
          )
        }
      },
      firstname(){
        var user = this.$store.state.dbUser
        if(user==null){
          return "Usuário"
        }else{   
          var name = user.nome
          var firstName = name.split(' ')
          return firstName[0]
        }
      },
    
      tipo(){
        var user = this.$store.state.dbUser
        if(user==null){
          return "Tipo"
        }else{
          var tipo = user.type
          return tipo.charAt(0).toUpperCase() + tipo.slice(1);
        }
      },
    logout () {
      this.$router.push('/')
      this.$store.dispatch('logout')
      .then(() => {
        this.menu=false
        this.fotoUrl = null
        this.$parent.$children[1].openSnack('error','Deslogado!')
      })
    },
    
  },
    
}
</script>

<style lang="scss" scoped>
a{
  color: #000;
  text-decoration: none;
}
.divLogo{
  padding-top: 5px;
  justify-content: center;
  height: 100%;
  width: 160px;
  color: #202d3f;
}
.logo:hover{
  transition: ease 0.2s;
  margin: -3px -3px;
  width: 161px;
  height: 61px;
}
.logo{
  transition: ease 0.2s;
  width: 155px;
  height: 55px;
}

</style>
