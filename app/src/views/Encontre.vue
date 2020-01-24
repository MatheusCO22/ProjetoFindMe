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
            <v-flex
              xs12
              class="si"
            >
              <v-text-field
                v-model="nomeFiltro"
                placeholder="Nome"
              /> 
            </v-flex>
            <v-flex
              xs12
              class="si"
            >
              <v-autocomplete
                v-model="categoriaFiltro"
                placeholder="Categoria"
                color="#1867C0"
                :items="areas"
              />
            </v-flex>
            <v-flex
              xs12
              class="si"
            >
              <v-text-field
                v-model="empresaFiltro"
                placeholder="Empresa"
              />
            </v-flex>
            <v-flex
              xs12
              class="si"
            >
              <v-combobox
                v-model="keywordsFiltro"
                multiple 
                placeholder="Tags (Separe por 'Enter')"
                append-icon
                chips
                deletable-chips
                class="tag-input"
              />
            </v-flex>
          </v-card-text>
          <v-flex text-xs-center>
            <v-btn
              class="ma-2"
              flat
              round
              color="blue darken-3"
              @click="limparFiltros()"
            >
              <v-icon left>
                refresh
              </v-icon>
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
        <!--PROJETOS-->
        <v-card
          color="rgba(255,255,255, 0.7)"
          style="margin-left:5px; width:70vw; min-width: 700px; border-radius:25px"
        >
          <v-card
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            flat
            color="rgba(255,255,255, 0.7)"
          >
            <v-divider v-if="index !=0" />
            <v-card-text>
              <v-container
                grid-list-lg
                fluid
              >
                <v-layout
                  row
                  align-center
                >
                  <v-avatar
                    color="blue-grey lighten-3"
                    size="220px"
                  >
                    <i
                      v-if="!project.imageUrl" 
                      class="sem-foto fas fa-camera"
                    >
                      <p> Projeto sem foto </p>
                    </i>
                    <img
                      v-if="project.imageUrl"
                      :src="project.imageUrl"
                    >
                  </v-avatar>

                  <v-divider
                    class="divider"
                    vertical
                  />
                
                  <v-layout
                    column
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
                      <b>Requisitos:</b> {{ project.requirements }}
                    </v-flex>
                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Descrição:</b> {{ project.description }}
                    </v-flex>
                    
                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Palavras-Chaves:</b> {{ project.keywords }}
                    </v-flex>


                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Limite:</b> {{ formatData(project.data) }}
                    </v-flex>
                    <v-flex
                      xs12
                      class="text"
                    >
                      <b>Empresa: </b>
                      <router-link
                        class="empresa"
                        :to="`empresa/${project.userId}`"
                      >
                        {{ project.userName }}
                      </router-link>
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
  data () {
    return{
      checkbox: false,
      userName:'-',
      estados: [],
      areas:['Programação', 'Design', 'Mecânica', 'Eletrônica', 'Edificações', 'Publicidade'],
			projects: [],
			nomeFiltro: '',
			categoriaFiltro: '',
      empresaFiltro: '',
      keywordsFiltro: [],
      keywordsString: ''
    }  
  },
      computed:{
        filteredProjects: function(){
          return this.projects.filter((project)=>{
            return project.title.toLowerCase().match(this.nomeFiltro.trim().toLowerCase()) &&
                   project.userName.toLowerCase().match(this.empresaFiltro.trim().toLowerCase()) &&
                   project.categoria.toLowerCase().match(this.categoriaFiltro.trim().toLowerCase()) &&
                   project.keywords.toLowerCase().match(this.trimJoinArray(this.keywordsFiltro));
          })
        }
      },
      created(){
        const { db } = this.$store.state
        const storage = firebase.storage()
        db.collection('projects').get().then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
          const projeto = {
            'id':doc.id,
            'title': doc.data().title,
            'categoria' :doc.data().categoria,
            'requirements': doc.data().requirements,
            'description' : doc.data().description,
            'data' : doc.data().dataEntrega,
            'userId' : doc.data().user.id,
            'keywords' : doc.data().keywords,
            'userName' : '',
            'imageUrl': ''
          }
            doc.data().user.get().then((userDoc)=>{
              projeto.userName = userDoc.data().nome
            })
            const storageRef = storage.ref('projects').child(doc.id).child('image')
            storageRef.getDownloadURL().then((url) => {
              projeto.imageUrl = url
            })

            this.projects.push(projeto)
          })
        })
      },
      methods:{
        nomeEmpresa(idEmpresa){
          return idEmpresa
        },
        formatData(data){
          const [year, month, day] = data.split('-')
          return `${day}/${month}/${year}`
				},
		
        remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
			},
			limparFiltros(){
        this.categoriaFiltro = ''
        this.nomeFiltro = ''
        this.empresaFiltro = ''
        this.keywordsFiltro = []

      },
      trimJoinArray(array){
        array = array.map((el)=>{
          return el.trim();
        })
        return array.join(';')
      }
      }
   }

</script>
<style lang="scss">
   .tag-input span.v-chip {
      color: #FFF;
      font-family: 'Open Sans', 'sans-serif';
      font-weight: 500;
      background-color: #1976d2;
    }
</style>
<style lang="scss" scoped>
  .si{
    margin-top: -15px; margin-bottom: -15px;
  }
  .filter{
    min-width: 200px;
    width: 250px;
    position: sticky;
    top:15px;
  }
  .rounded-card{
    border-radius: 30px;
    padding-bottom: 30px;
    position: sticky;
    top: 15px;
  }
  .tf-filtro{
    margin: 0px auto;
  }
	.botaoFiltrar{
		padding-left: 45px;
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
  b{
    font-size: 18px;
    color: #32393F;
  }
  .text{
    font-size: 15px;
    color: #616161;
  }
  .divider{
    margin: 0px 50px;
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