<template>
  <v-container class="box">
    <v-card
      v-if="!this.load"
      class="rounded-card loading"
    >
        <v-img
          src="https://2.bp.blogspot.com/-rZZr5nrVRu4/WMksy6Ha_UI/AAAAAAAAA-A/iwqZu6z1isAIUQKriqDZVimHzBoek-DYwCLcB/s1600/setting.gif"
          max-height="500"
          class="grey darken-4"
        />
      </v-card>
    <v-card
      v-if="this.load"
      flat
      color="rgba(255, 255, 255, 0.8)"
      class="rounded-card elevation-10"
    >
      <v-card-text
        v-if="this.load"
        flat
      >
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="submit"
        >
          <v-container
            grid-list-xl
            fluid
          >
            <v-flex
              xs12
              text-xs-center>
              <v-avatar
                size="150"
              >
                <img
                  class="imagem"
                  :src="imageUrl"
                  @click="photoPicker()"
                >
              <input 
                ref="fotoInput"
                type="file"
                style="display: none"
                accept="image/*"
                @change="imagemEscolhida"
              >
              </v-avatar>
            </v-flex>
            <v-flex
              xs12
              text-xs-center
              style="color:#696969; padding:5px 0px"
            >
              Editar foto do projeto
            </v-flex>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.title"
                  label="Título do projeto"
                  placeholder="Título do projeto"
                  color="#1867C0"
                />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.requirements"
                  label="Requisitos"
                  placeholder="Requisitos"
                  color="#1867C0"
                  :rules="[rules.required]"
                />
              </v-flex>
              
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="form.keywords"
                  label="Palavras-Chaves"
                  placeholder="Palavras-Chaves"
                  color="#1867C0"
                  :rules="[rules.required]"
                />
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  v-model="form.description"
                  rows="2"
                  auto-grow
                  label="Descrição do projeto"
                  placeholder="Descrição do projeto"
                  color="#1867C0"
                  :rules="[rules.required, rules.min]"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-autocomplete
                  v-model="form.categoria"
                  label="Categoria"
                  placeholder="Categoria"
                  color="#1867C0"
                  :rules="[rules.required]"
                  :items="areas"
                />
              </v-flex>
                <v-flex
                xs12
                sm6
                md3
              >
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="formattedDate(form.dataEntrega)"
                      label="Data de entrega"
                      append-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="pt-br"
                    v-model="form.dataEntrega"
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="menu = false"
                    max="2025-12-31"
                    landscape
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex
                xs12
                sm6
                md3
                class="text-xs-center text-sm-center text-md-center text-lg-center"
              >
                <v-btn
                  class="botaoArquivo"
                  color="blue"
                  round
                  outline
                  @click="pickFile"
                >
                  {{ fileName }}
                </v-btn>

                <input
                  ref="document"
                  type="file"
                  style="display: none"
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
            text/plain, application/pdf"
                  @change="onFilePicked"	
                >
              </v-flex>
              <v-flex
                text-xs-center
                xs12
              >
              </v-flex>
            </v-layout>
          </v-container>
          <p/>
		
          <v-card-actions>
            <v-btn
              color="red"
              class="white--text"
              fab
              @click="resetForm"
            >
              <i class="fas fa-times" />
            </v-btn>
            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="green"
              class="white--text"
              type="submit"
              fab
            >
              <i class="fas fa-check" />
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase';
  export default {
		data(){
			const defaultForm = {
        title : '-', description : '-', requirements : '-', categoria : '-', 
        dataEntrega: '-', keywords: '-'
			}
      return{
        load : false,
        dataTeste: new Date().toISOString().substring(0,10),
				menu: false,
				projetoPre: null,
				valid : false,
				form : Object.assign({}, defaultForm),
				fileName: '',
				objectFile: '',
				imageUrl: '',
				imagemFirebase:'',
				photoUrl: '',
				isArquivoEditado: '',
				isImageEditada: '',

				rules: {
          required: value => !!value || 'Campo obrigatório',
          min: v => v.length >= 6 || 'Minímo 6 caracteres'
				},
				areas:[
          'Programação', 'Design', 'Mecânica', 'Eletrônica', 'Edificações', 'Publicidade'
        ],
      }
		},
    created(){
			this.isArquivoEditado=false
			this.isImageEditada=false
			const idProjeto=this.$route.params.id
      const { db } = this.$store.state
			const storage = firebase.storage();
			const storageRef = storage.ref();
			
      db.collection('projects').doc(idProjeto).get().then((doc)=>{
				const projeto = {
					'title': doc.data().title,
					'description' : doc.data().description,
					'requirements': doc.data().requirements,
					'categoria' : doc.data().categoria,
          'dataEntrega' : doc.data().dataEntrega,
          'keywords' : doc.data().keywords
				}
					this.projetoPre=projeto
					this.form = Object.assign({}, projeto)
					this.fileName=doc.data().title+'.PDF'

          const imageRef = storage.ref('projects').child(idProjeto).child('image')
          
          imageRef.getDownloadURL()
            .then((url) =>{
              this.imageUrl = url
              this.load = true  
            }
          )
			})	
    },
		methods:{
			pickFile () {
        this.$refs.document.click ()
      },
			onFilePicked(e){
				const storage = firebase.storage();
				const storageRef = storage.ref();
				const fileRef=storageRef.child(
				this.$store.state.dbUser.id+'/'
				+this.projetoPre.title+'/'
				+this.projetoPre.title)
				
		

			
			const files = e.target.files
			this.fileName = files[0].name
			if(files[0] !== undefined) {
        
				if(this.fileName.lastIndexOf('.') <= 0) {
          return
				}
			
			console.log("NOME: "+files[0].name)
			const fr = new FileReader ()
			fr.readAsDataURL(files[0])
			fr.addEventListener('load', () => {
        console.log(files)
        this.objectFile=files[0]
				this.isArquivoEditado=true
			})
				}
			},
      photoPicker(){
        console.log('chegou')
        this.$refs.fotoInput.click()
        
      },
			imagemEscolhida(event){
				const storage = firebase.storage();
				const storageRef = storage.ref();

				const imageRef=storageRef.child(
				this.$store.state.dbUser.id+'/'
				+this.projetoPre.title+' Imagem/'
				+this.projetoPre.title)

        const imagem=event.target.files
        let photoName=imagem[0].name
				console.log(photoName)
				
				if(photoName.lastIndexOf('.')<=0){
          return alert ('Selecione um arquivo válido')
				}
        const leitorFoto = new FileReader()
        leitorFoto.addEventListener('load', () =>{
          this.imageUrl=leitorFoto.result
          console.log(leitorFoto.result)
        })
        leitorFoto.readAsDataURL(imagem[0])
        this.imagemFirebase=imagem[0]
				this.isImageEditada=true;
			},
			logger(){
				console.log(this.projetoPre)
			},
			resetForm () {
        this.form = Object.assign({}, this.projetoPre)
        this.$refs.form.reset()
			},
			formattedDate(date) {
        const [year, month, day] = date.split('-')
          return `${day}/${month}/${year}`
			},
			submit(){	
				const {
					db
        } = this.$store.state

        const projectRef = db.collection("projects").doc(this.$route.params.id);
        const storage = firebase.storage()
				
        const {
            title, description, requirements,
            categoria, dataEntrega, keywords
        }=this.form

				const projectEditado={
          title, description, requirements,
          categoria, dataEntrega, keywords
        }

				
				if(this.isArquivoEditado){
					const docRef = storage.ref('projects').child(this.$route.params.id).child('file')

					console.log('entrou')
				docRef.put(this.objectFile).then(() => {
          console.log("arquivo upado")

        })
				}
				if(this.isImageEditada){
          const imgRef = storage.ref('projects').child(this.$route.params.id).child('image')
          imgRef.put(this.imagemFirebase).then(() => {
            console.log("foto upada")
        })
				}

				projectRef.update(projectEditado)
        .then(() => this.$parent.$children[1].openSnack('success','Projeto atualizado!'))
			}
		}
  }
</script>

<style lang="scss" scoped>
  .texto-check{
    font-weight:bold ;
  }
  .fas{
    font-size: 35px;
  }
  .rounded-card{
    border-radius: 30px;
  }
  .imagem{
    transition: ease 0.3s;
    cursor:pointer;
    &:hover{
      transition: ease 0.3s;
      box-shadow: 0px 0px 15px rgba(0,0,0,100);
    }
  }
</style>



