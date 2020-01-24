<template>
  <v-container class="container">
    <v-card
      v-if="!$store.state.dbUser"
      class="rounded-card no-ratings elevation-7"
      color="rgba(255, 255, 255, 0.8)"
      flat
      style="margin-top: 15vh"
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
        
      <v-card-text>
        <v-flex
          class="text-erro"
          xs12
          text-xs-center
        >
          Você precisa estar logado para visualizar e interagir com esta página.
        </v-flex>
      </v-card-text>
    </v-card>

    <v-card
      v-if="$store.state.dbUser"
      class="rounded-card"
      color="rgba(201, 234, 251, 0.8)"
    >
      <v-layout
        column
        fill-height
        align-center
        justify-center
      >
        <v-card-text>
          <v-layout
            column
            fill-height
            justify-center
            align-center
          >
            <v-avatar
              size="180"
              color="blue lighten-4"
              class="elevation-8"
            >
              <img
                v-if="fotoUrl" 
                :src="fotoUrl"
                alt="avatar"
              >
              <i
                v-if="!fotoUrl"
                class="fas fa-user"
                style="font-size:50px; color:#1867C0"
              />
            </v-avatar>
          </v-layout>
        </v-card-text>
        <v-layout
          column
          class="texto-perfil"
        >
          <v-flex
            xs12
            text-xs-center
            class="nome"
          >
            <h3>{{ nome }}</h3>
          </v-flex>
          <v-flex>
            <v-rating
              v-model="nota"
              hover
              readonly
              background-color="grey darken-1"
              half-increments
            />
          </v-flex>
        </v-layout>
        <v-card-text flat>
          <v-divider />
          <v-container
            grid-list-lg
            fluid
          >
            <v-layout
              wrap
              class="texto-perfil"
            >
              <v-flex xs12>
                <h3>Email: </h3>{{ email }}
              </v-flex>
              <v-flex xs12>
                <h3>CNPJ: </h3>{{ cnpj }}
              </v-flex>
              <v-flex xs12>
                <h3>Telefone: </h3>{{ formatPhone(fone) }}
              </v-flex>
              <v-flex xs12>
                <h3>Área de atuação: </h3>{{ area }}
              </v-flex>
              <v-flex
                text-xs-center
                xs12
              >
                <DialogAvaliar />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import DialogAvaliar from './DialogAvaliar.vue'
 
export default {
  components:{
    DialogAvaliar
  },
  firestore(){
    const db = firebase.firestore()
    const idEmpresa = this.$route.params.id
    const empresa = db.collection('users').doc(idEmpresa)
    console.log('Firestore'+idEmpresa , empresa)
    return {
      avaliacoesEmpresa: db.collection('avaliacoes').where('empresa', '==', empresa)
      .where('typeAvaliador', '==', 'estudante')
    }
  },
  data(){
    return{
      id:'-',
      nome:'-',
      email:'-',
      cnpj:'-',
      fone:'',
      estado:'',
      area:'',
      fotoUrl: '',
      isInscrito: 'false',
      avaliacoesEmpresa: []
    } 
  },
    computed:{
     contador () {
       return this.avaliacoesEmpresa.length
     },
     soma () {
       return this.avaliacoesEmpresa.reduce((acc, avaliacao) => acc + avaliacao.nota , 0)
     },
     nota(){
       return this.soma/this.contador
     }
  },

    created(){
      const { db } = this.$store.state
      const storage = firebase.storage();
      const storageRef = storage.ref(); 
      const idEmpresa = this.$route.params.id
      const idEstudante = this.$store.state.dbUser.id

      db.collection('users').doc(idEmpresa).get().then((doc)=>{
        this.nome = doc.data().nome
        this.email = doc.data().email
        this.cnpj = doc.data().cnpj
        this.fone = doc.data().fone
        this.estado = doc.data().estado
        this.area = doc.data().area
        const imageRef = storage.ref('users').child(doc.data().email).child('image')

        imageRef.getDownloadURL().then(
          url => this.fotoUrl = url       
        )
       })
       
      //Verificação para ver se o estudante pode avaliar a empresa
      db.collection('inscricoes').get().then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
          if(doc.data().user==idEstudante && doc.data().idEmpresa==idEmpresa){
            console.log('deu certo')
            this.isInscrito=true;
          }
        })
      })
    },
    methods:{
      formatCpf(cpf){
        var formattedCpf = cpf.slice(0,3) + "." + cpf.slice(3,6) + "." + cpf.slice(6,9) + "-" + cpf.slice(9,11)
        return formattedCpf 
      },
      formatPhone(phone){
        let formattedPhone
        if(phone.length === 11){
          formattedPhone = "(" + phone.slice(0,2) + ") " + phone.slice(2,3)+ " "
          + phone.slice(3,7) + "-" + phone.slice(7,12)
      } else if(phone.length === 10) {
        formattedPhone = "(" + phone.slice(0,2) + ") " + phone.slice(3,7) + "-" + phone.slice(7,12)
      }
        return formattedPhone
      },
      atualizarNota(valor){
         db.collection('avaliacoes').get().then(querySnapshot =>{ 
          querySnapshot.forEach(doc =>{
            if(doc.data().empresa.id == idEmpresa ){
              this.soma=doc.data().nota+this.soma
              console.log(doc.data().nota)
              this.contador++;
              this.nota=this.soma/this.contador
            }
          })
        })
      }
    }
}
</script>

<style lang="scss" scoped>
  .container{
    max-width: 50vw;
  }
  .rounded-card{
    background-color: rgba(255, 255, 255, 0);
    border-radius: 40px;
    box-shadow: 0px 5px 30px #161616DD;
  }
  .resumo{
    font-size: 20px; 
  }
  .avatar{
    box-shadow: 0px 0px 15px rgba(0,0,0,0.5);
  }
  .nostars{
    font-size:11px;
    color:#535353;
    font-weight:thin;
    font-family:'Raleway', 'sans-serif';
   }
   h3{
     display: inline;
   }
</style>
