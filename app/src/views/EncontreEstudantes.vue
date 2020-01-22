<template>
	<v-container
    class="master"
    style="max-width: 100%"
  >
    <v-layout
      row
      align-start
      justify-center
    >
    <v-layout
        class="filter"
        row
        align-start
        justify-start
      >
        <v-card class="filter rounded-card">
          <center>
            <i
              class=" fas fa-filter"
              style="font-size:20px; padding:8px 8px"
            />
          </center>
          <v-flex
            xs12
            class="blue--text text--darken-3 font-weight-bold"
            text-xs-center
          >
            FILTRAR
          </v-flex>
          <v-divider />
            <v-card-text>
              <v-flex xs12 class="si">
                <v-text-field
                  v-model="filtros.nome"
                  placeholder="Nome"
                /> 
              </v-flex>
              <v-flex xs12 class="si">
                <v-text-field
                  v-model="filtros.curso"
                  placeholder="Curso"
                  color="#1867C0"
                />
              </v-flex>
              <v-flex xs12 class="si">
                <v-autocomplete
                  v-model="filtros.estado"
                  placeholder="Estado"
                  color="#1867C0"
                  :items="getEstados()"
                />
              </v-flex>
            </v-card-text>
						<v-flex text-xs-center>
							<v-btn class="ma-2"
                flat
                round
                color="blue darken-3"
                @click="limparFiltros()"
              >
                  <v-icon left>refresh</v-icon>
                  Limpar filtros
              </v-btn>
						</v-flex>
        </v-card>
      </v-layout>
      <v-layout
        column
        align-start
        justify-center
      >
    <!--ESTUDANTES-->

        <v-card
          color="rgba(255,255,255, 0.7)"
          style="margin-left:5px; width:70vw; min-width: 700px; border-radius:25px"
        >
          <v-card
            flat
            color="rgba(255,255,255, 0.7)"
            v-for="(estudante, index) in filteredEstudantes"
            :key="estudante.id"
          >
              <v-divider v-if="index !=0"/>
            <v-card-text>
              <v-container
                grid-list-lg
                fluid
              >
                <v-layout
                  row
                  align-center
                >
                    <router-link :to="`estudante/${estudante.id}`">
                  <v-avatar
                    color="blue-grey lighten-3"
                    size="220px"
                  >
                    <i v-if="!estudante.imageUrl" 
                      class="sem-foto fas fa-camera">
                        <p> Projeto sem foto </p>
                    </i>
                      <img
                        v-if="estudante.imageUrl"
                        :src="estudante.imageUrl"
                      >
                  </v-avatar>
                    </router-link>

                  <v-divider class="divider" vertical />
                
                  <v-layout
                    column
                  > 
                    <v-flex
                      xs12
                      class="text"
                    >
                      <router-link
                        class="title"
                        :to="`estudante/${estudante.id}`"
                      >
                        {{ estudante.nome }}
                      </router-link>
                    </v-flex>
                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Instituição:</b> {{ estudante.school }}
                    </v-flex>
                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Curso:</b> {{ estudante.curso }}
                    </v-flex>
                    
                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Data de nascimento:</b> {{ estudante.birth }}
                    </v-flex>


                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Estado<sub><small>(UF)</small></sub> :</b> {{ estudante.estado }}
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase';
export default {
  data(){
   return{
     estudantes: [],
     estados: ['AC', 'BA'],
     filtros:{
       nome: '',
       curso: '',
       estado: ''
     }
   }
  },
  created(){
     const { db } = this.$store.state
     const storage = firebase.storage()
     var nEstudantes = 0;

      db.collection('users').get().then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
          if(doc.data().type=='estudante'){
            const estudante = {
              'id' : doc.id,
              'nome' : doc.data().nome,
              'school' : doc.data().school,
              'curso' : doc.data().curso,
              'birth' : doc.data().birth,
              'estado' : doc.data().estado,
              'email' : doc.data().email,
              'imageUrl' : null
            }
            const estudanteRef = storage.ref('users').child(estudante.email)
            const imageRef = estudanteRef.child('image')
            
            imageRef.getDownloadURL()
            .then((url) =>{
              estudante.imageUrl = url
              this.estudantes.push(estudante)
            }).catch(()=>{
              console.log("N TEM FOTO")
              this.estudantes.push(estudante)
            })
          }
       })
     })
  },
  methods:{
    redirecionar(idUser){
      this.$router.push('/estudante/'+idUser)
    },
    limparFiltros(){
      this.filtros.nome = '',
      this.filtros.curso = '',
      this.filtros.estado = ''
    },
    getEstados(){
      return this.$parent.$children[1].getEstados()
    }
  },
  computed:{
    filteredEstudantes: function(){
      return this.estudantes.filter((estudante)=>{
            return estudante.nome.toLowerCase().match(this.filtros.nome.trim().toLowerCase()) &&
                   estudante.curso.toLowerCase().match(this.filtros.curso.trim().toLowerCase()) &&
                   estudante.estado.toLowerCase().match(this.filtros.estado.trim().toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .si{
    margin-top: -15px; margin-bottom: -15px;
  }
  .filter{
    min-width: 200px;
    position: sticky;
    top:15px;
  }
  .rounded-card{
    border-radius: 30px;
    padding-bottom: 30px;
    position: sticky;
    top: 15px;
  }
  a{
    text-decoration: none;
  }
  .divider{
    margin: 0px 50px;
  }
  .title{
    transition: ease 0.4s;
    color:#1867FF;
    &:hover{
      transition: ease 0.4s;
      text-shadow: #16313044 0px 0px 5px;
    }
    font-family: 'Raleway', 'sans-serif' !important;
    font-size: 25px !important;
    font-weight: 600;
  }
  b{
    font-size: 18px;
    font-weight: 500;
    color: #32393F;
  }
  .text{
    font-size: 15px;
    color: #616161;
  }
  .sem-foto{
    margin-top: 35px;
    color: #546E7A;
    font-size: 50px;
  }
  .sem-foto p{
    font-family: 'Raleway', 'sans-serif';
    padding-top: 20px;
    font-size: 18px;
  }
</style>