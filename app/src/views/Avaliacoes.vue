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

    <v-card class="rounded-card no-ratings elevation-7"
      v-if="this.load && this.avaliacoes.length == 0"
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
          class="rounded-card text-erro"
          xs12
          text-xs-center
        >
          Você ainda não possui nenhuma avaliação.
        </v-flex>
      </v-card-text>
    </v-card>

     <v-card
      v-if="this.load"
      flat
      color="rgba(255, 255, 255, 0.8)"
      class="rounded-card"
      style="border-radius:25px"
    >
     <v-card
        v-for="(avaliacao, index) in avaliacoes"
        :key="avaliacao.idUser"  
      >
        <v-divider v-if="index !=0"/>
          <v-card-text>
            <v-container
              grid-list-md
              fluid
            >
              <v-layout
                row
                justify-center
                align-center
              >
                <v-avatar
                  color="light-grey"
                  size="150px"
                >
                  <img
                    v-if="!avaliacao.imageUrl"
                    src="https://artia.com/wp-content/uploads/2018/01/como-identificar-e-minimizar-os-riscos-do-projeto.png"
                  >
                  <img
                    v-if="avaliacao.imageUrl"
                    :src="avaliacao.imageUrl"
                  >
                </v-avatar>

                <v-divider vertical class="divider" />
              
                <v-layout
                  column
                >
                  <v-flex
                    class="user"
                    text-xs-center
                  >
                    <router-link :to="`estudante/${avaliacao.idUser}`"
                      v-if="$store.state.dbUser.type == 'empresa'"
                    >
                      {{avaliacao.userName}}
                    </router-link>
                    <router-link :to="`empresa/${avaliacao.idUser}`"
                      v-if="$store.state.dbUser.type == 'estudante'"
                    >
                      {{avaliacao.userName}}
                    </router-link>
                  </v-flex>                
                  <v-flex
                    text-xs-center
                    class="text"
                  >
                    &ldquo;{{avaliacao.texto}}&rdquo;
                  </v-flex>
                  <v-flex
                    class="text"
                    xs12
                    text-xs-center
                  >
                    <v-rating
                      class="rating"
                      readonly
                      background-color="amber lighten-3"
                      color="#FFC00C"
                      medium
                      half-increments
                      v-model="avaliacao.nota"
                    />
                  </v-flex>
                  <v-flex class="text nota" text-xs-center>
                    <span>{{avaliacao.nota}}/5</span>
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
import firebase from 'firebase'
export default {
  data(){ 
    return{
      avaliacoes: [],
      load: false
    }
  },
  created(){
    const { db } = this.$store.state
    const idEmpresa = this.$store.state.dbUser.id
    const user = this.$store.state.dbUser
    const storageUser = firebase.storage().ref('users')

    if(user.type==='empresa'){
      db.collection('avaliacoes').get().then(querySnapshot =>{
        const idEmpresa = user.id
        querySnapshot.forEach(doc =>{
          if(doc.data().empresa.id==idEmpresa && doc.data().typeAvaliador=='estudante'){
            const avaliacao ={
              'idUser': doc.data().estudante.id,
              'texto': doc.data().avaliacao,
              'nota': doc.data().nota,
              'userName' : '',
              'imageUrl' : null
            }
            doc.data().estudante.get().then((userDoc)=>{
              avaliacao.userName = userDoc.data().nome
              var userEmail = userDoc.data().email

              storageUser.child(userEmail).child('image').getDownloadURL().then((url) => {
                console.log(url)
                avaliacao.imageUrl = url
                this.avaliacoes.push(avaliacao)
              }).catch((err)=>{
                this.avaliacoes.push(avaliacao)
              })
            })
          }
        })
        this.load = true
      })
    }
    if(this.$store.state.dbUser.type==='estudante'){
    db.collection('avaliacoes').get().then(querySnapshot =>{
      const idEstudante = this.$store.state.dbUser.id
        querySnapshot.forEach(doc =>{
          if(doc.data().estudante.id==idEstudante && doc.data().typeAvaliador=='empresa'){
            const avaliacao ={
              'idUser': doc.data().empresa.id,
              'texto': doc.data().avaliacao,
              'nota': doc.data().nota,
              'userName' : ''
            }
            doc.data().empresa.get().then((userDoc)=>{
              avaliacao.userName = userDoc.data().nome
              var userEmail = userDoc.data().email
              
              storageUser.child(userEmail).child('image').getDownloadURL().then((url) => {
                avaliacao.imageUrl = url
                this.avaliacoes.push(avaliacao)
              }).catch((err)=>{
                this.avaliacoes.push(avaliacao)
              })
            })
          }
        })
        this.load = true
      })
    }
  },
  methods: {
    
  }

}
</script>

<style lang="scss" scoped>
  .divider{
    margin: 0 25px;
  }
  a{
    text-decoration: none;
    font-size: 25px;
  }
  .text{
    font-family: 'Raleway', 'sans-serif';
    font-style: italic;
    font-size: 25px;
    font-weight: 300;
    color: rgb(116, 116, 116);
  }
  .nota{
    margin-top: -15px;
    padding: 0;
    font-size: 15px;
  }
</style>

<style lang="scss">
.rounded-card{
    border-radius:35px !important;
  }
  .text-erro{
    color: rgb(88, 88, 88);
    font-size: 20px;
  }
  .loading{
    height: 500px;
  }

</style>

