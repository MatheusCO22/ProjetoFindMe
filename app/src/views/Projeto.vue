<template>
  <v-container class="container">
    <v-card
      flat
      color="#FFF"
      class="rounded-card"
    >
      <v-card-text>
        <v-flex
          xs12
          text-xs-center
        >
          <v-avatar
            color="blue"
            size="22vw"
          >
            <img :src="imageUrl">
          </v-avatar>          
        </v-flex>
        <v-flex
          xs12
          text-xs-center
          style="padding-top:1vh;padding-bottom:1vh;"
        >
          <h1>{{ title }}</h1>
        </v-flex>
        <v-divider />
      </v-card-text>
      
      <v-card-text flat>
        <v-flex xs12>
          <h3>Requisitos: </h3>{{ requirements }}
        </v-flex>
        <v-flex xs12>
          <h3>Descrição: </h3>{{ description }}
        </v-flex>
        <v-flex xs12>
          <h3>Data entrega: </h3>{{ dataEntrega }}
        </v-flex>
        <v-flex xs12>
          <h3>Categoria: </h3>{{ categoria }}
        </v-flex>
        <v-flex xs12>
          <h3>Palavras-Chaves: </h3> {{ keywords }}
        </v-flex>
        <v-flex
          xs12
          class="empresa"
        >
          <h3>Empresa: </h3>
          <router-link :to="`/empresa/${userId}`">
            {{ user }}
          </router-link>
        </v-flex>
        <v-flex
          xs12
          text-xs-center
        />

        <v-flex xs12 />
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="ma-2"
          flat
          round
          color="blue darken-3"
          @click="redirecionar"
        >
          <i
            class="far fa-file"
            style="margin-right:10px"
          />
          Baixar documentação
        </v-btn>
        <v-spacer />
        <Inscrever />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
    import firebase from 'firebase';
    import Inscrever from './Inscrever.vue';
export default {
  components:{
    Inscrever
  },  
  data(){
    return{
      permitido: false,
      valid:false,
      title:'',
      requirements:'',
      description:'',
      keywords: '',
      dataEntrega:'',
      categoria: '',
      user:'',
      userId:'',
      document: '',
      imageUrl: ''
    }
  },
  created(){
    this.$parent.$children[1].openLoading()
    const {db} = this.$store.state
    const idProjeto = this.$route.params.id
    const storage = firebase.storage()

    db.collection('projects').doc(idProjeto).get().then((doc) => {
      this.title = doc.data().title
      this.requirements = doc.data().requirements
      this.description = doc.data().description
      this.dataEntrega = doc.data().dataEntrega
      this.categoria = doc.data().categoria
      this.userId = doc.data().user.id
      this.keywords = doc.data().keywords

      const storageRef = storage.ref('projects').child(idProjeto).child('file')
      storageRef.getDownloadURL().then(
        url => this.document = url       
      )
      const imageRef = storage.ref('projects').child(idProjeto).child('image')
      imageRef.getDownloadURL().then(
        urlImage => this.imageUrl = urlImage       
      )
      doc.data().user.get().then((userDoc)=>{
        this.user = userDoc.data().nome
        this.$parent.$children[1].closeLoading()
      }).catch((userError)=> {
        console.log(userError)
        this.$parent.$children[1].openSnack('error','Usuário não encontrado!')
        this.$parent.$children[1].closeLoading()
      })

      }).catch((err) => {
        console.log('deu ruim', err)
        this.$parent.$children[1].closeLoading()
        this.$parent.$children[1].openSnack('error','Projeto não encontrado!')
        })
        if(this.$store.state.dbUser.type=='estudante'){
          this.permitido = true
        }
        else{
          this.permitido = false
        }
    },
    methods:{
      redirecionar(){
        console.log("chegou")
        window.open( this.document)
      }
    }
    }
    
</script>

<style lang="scss" scoped>
.empresa a{
  text-decoration-line: none;
  transition: ease 0.3s;
}
.empresa a:hover{
  transition: ease 0.3s;
  text-shadow: 0px 0px 3px rgba(44, 143, 255, 0.8);
}
.rounded-card{
    border-radius: 30px;
}
.container{
    max-width: 50vw;
}
h1, h3{
  font-weight: 500; 
}
h1, h2, h3, h4, h5{
    display: inline;
}
.fas{
 font-size: 30px;    
}
</style>