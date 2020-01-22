<template>
  <div class="bg">
    <v-container
      v-if="$store.state.dbUser.type==='estudante'"
      class="container"
    >  
      <v-card
        flat
        color="rgba(201, 234, 251, 0.8)"
        class="rounded-card"
      >
        <v-flex
          xs12
          text-xs-center
        >
          <v-spacer style="height:2vh;" />
          <v-avatar
            class="avatar"
            size="100"
            color="grey lighten-4"
          >
            <v-img
              v-if="!fotoUrl"
              :src = "require('../assets/loading.gif')"
            />
            <img
              v-if="fotoUrl"
              :src='fotoUrl'
              alt="avatar"
            >
          </v-avatar>
        </v-flex>
        <v-card-text flat>
          <v-layout class="texto-perfil">
            <v-flex
              xs11
              text-xs-center
              class="nome"
            >
              <h3>{{ $store.state.dbUser.nome }}</h3>
            </v-flex>
            <v-flex md1>
              <v-menu
                bottom
                left
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="grey--text"
                    icon
                    v-on="on"
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-tile @click="editar($store.state.dbUser.id)">
                    <v-list-tile-title>
                      <i class="fas fa-pencil-alt" />
                      Editar perfil
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile @click="excluir($store.state.dbUser.id)">
                    <v-list-tile-title>
                      <i class="fas fa-trash-alt" />
                      Excluir conta
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-divider />
          <v-container
            grid-list-xl
            fluid
          >
            <v-layout
              wrap
              class="texto-perfil"
            >
              <v-flex xs12>
                <b>Email: </b>{{ $store.state.dbUser.email }}
              </v-flex>
              <v-flex xs12>
                <b>Cpf: </b>{{ formatCpf($store.state.dbUser.cpf) }}
              </v-flex>
              <v-flex xs12>
                <b>Telefone: </b>{{ formatPhone($store.state.dbUser.fone) }}
              </v-flex>
              <v-flex xs12>
                <b>Escola: </b>{{ $store.state.dbUser.school }}
              </v-flex>
              <v-flex xs12>
                <b>Curso: </b>{{ $store.state.dbUser.curso }}
              </v-flex>
              <v-flex xs12>
                <b>Estado: </b>{{ $store.state.dbUser.estado }}
              </v-flex>
              <v-flex xs12>
                <b>Data de nascimento: </b>{{ formattedDate($store.state.dbUser.birth) }}
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container
      v-if="$store.state.dbUser && $store.state.dbUser.type==='empresa'"
      class="container"
    >
      <v-card
        flat
        color="rgba(201, 234, 251, 0.6)"
        class="rounded-card"
      >
        <v-flex
          xs12
          text-xs-center
        >
          <v-spacer style="height:2vh;" />
          <v-avatar
            class="avatar"
            size="100"
            color="blue lighten-4"
          >
            <v-img
              v-if="!fotoUrl"
              :src = "require('../assets/loading.gif')"
            />
            <!--
              src="..\assets\loading.gif"
            -->
            <img
              v-if="fotoUrl"
              :src='fotoUrl'
              alt="avatar"
            >
          </v-avatar>
        </v-flex>
        <v-card-text flat>
          <v-layout>
            <v-flex
              xs11
              text-xs-center
              class="nome"
            >
              <h3>{{ $store.state.dbUser.nome }}</h3>
            </v-flex>
            <v-flex md1>
              <v-menu
                bottom
                center
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="grey--text"
                    icon
                    v-on="on"
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-tile @click="editar($store.state.dbUser.id)">
                    <v-list-tile-title>
                      <i class="fas fa-pencil-alt" />
                      <small> Editar perfil</small>
                    </v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="excluir($store.state.dbUser.id)">
                    <v-list-tile-title>
                      <i class="fas fa-trash-alt" />
                      <small> Excluir conta</small>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-divider />
          <v-container
            grid-list-xl
            fluid
          >
            <v-layout
              wrap
              class="texto-perfil"
            >
              <v-flex xs12>
                <b>Email: </b>{{ $store.state.dbUser.email }}
              </v-flex>
              <v-flex xs12>
                <b>CNPJ: </b> {{ formatCnpj($store.state.dbUser.cnpj) }}
              </v-flex>
              <v-flex xs12>
                <b>Telefone: </b> {{ formatPhone($store.state.dbUser.fone) }}
              </v-flex>
              <v-flex xs12>
                <b>Área de atuação: </b> {{ $store.state.dbUser.area }}
              </v-flex>
              <v-flex xs12>
                <b>Estado: </b> {{ $store.state.dbUser.estado }}
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  

  data(){
    return{
      urlImg:'',
      dadosEmpresa:[],
      dadosEstudante:[],
      projetos:[],
      fotoUrl: '',
      auth: this.$store.state
    }
  },
    created(){
      const user = this.$store.state.dbUser
      const storage = firebase.storage();
      const storageRef = storage.ref();   
      if(user!=null){
        const email = user.email
        const imageRef = storage.ref('users').child(email).child('image')

        imageRef.getDownloadURL().then(
          url => this.fotoUrl = url       
        )
      }
    },
    methods:{
      formatCpf(cpf){
        var formattedCpf = cpf.slice(0,3) + "." + cpf.slice(3,6) + "." + cpf.slice(6,9) + "-" + cpf.slice(9,11)
        return formattedCpf 
      },
      formatCnpj(cnpj){
        var formattedCnpj = cnpj.slice(0,2) + "." + cnpj.slice(2,5) + "." + cnpj.slice(5,8) + "/" + cnpj.slice(8,12) + "-" + cnpj.slice(12,14)
        return formattedCnpj
      },
      formatPhone(phone){
        let formattedPhone
        if(phone.length === 11){
          formattedPhone = "(" + phone.slice(0,2) + ") " + phone.slice(2,3)+ " "
          + phone.slice(3,7) + "-" + phone.slice(7,12)
      }else if(phone.length === 10){
        formattedPhone = "(" + phone.slice(0,2) + ") " + phone.slice(3,7) + "-" + phone.slice(7,12)
      }
        return formattedPhone
      },
      formattedDate(date) {
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      excluir(idUser){
        const user = firebase.auth().currentUser;
        console.log(user)
        user.remove();
      },
      editar() {
        this.$router.push('/editarPerfil')
      },
    }
}
</script>

<style lang="scss" scoped>
i{
  color:#888888;
}
b{
  font-size: 110%;
  font-weight: 600;
  color: #162130c9;
}
.rounded-card{
  border-radius: 40px;
  box-shadow: 0px 5px 30px #161616DD;
}
.container{
  max-width: 50vw;
}
.nome{
  padding-left: 3.3vw;
  padding-top: 15px;
  padding-bottom:15px;
  color:#294B66;
}
.avatar{
  border: 1px solid #00aeff;
}
.texto-perfil{
 color: #294B66;
}
</style>