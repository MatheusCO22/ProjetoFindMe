<template>
  <v-container class="box">
    <v-container
      class="box-erro"
      style="max-width:40vw;"
    >
      <v-card
        v-if="!testeEmpresa()"
        flat
        color="#65BAD955"
        class="rounded-card elevation-7"
      >
        <v-card-text>
          <v-flex
            xs12
            text-xs-center
          >
            <i
              class="fas fa-exclamation-triangle"
              style="color:#FF0000; text-shadow: 0px 0px 5px #16161688;"
            />
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-text class="text-erro">
          <v-flex
            xs12
            text-xs-center
          >
            Essa página só pode ser acessada por perfis de empresa!
          </v-flex>
        </v-card-text>
      </v-card>
    </v-container>

    <v-card
      v-if="testeEmpresa()"
      flat
      color="rgba(255, 255, 255, 0.8)"
      class="rounded-card"
    >
      <v-card-text
        class="project-container"
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
            class="container-texts"
          >
            <v-flex
              xs12
              text-xs-center
            >

              <v-flex
              xs12
              text-xs-center
            >
              <v-avatar
                size="180"
                color="blue-grey lighten-4"
                class="foto"
                @click="adicionarFoto()"
                :error="!!fotoUrl"
              >
              <v-layout column justify-center fill-height v-if="!fotoUrl">
                <i class="fas fa-camera"/>
              </v-layout>  
                <img  v-if="fotoUrl"
                  :src="fotoUrl"
                  alt="20px"
                >
              </v-avatar>
              <p class="adc-foto">
                Escolha uma foto para o projeto
              </p>
                <small class="obrigatorio">Obrigatório</small>
            </v-flex>
              <input 
                ref="fotoInput"
                type="file"
                style="display: none"
                accept="image/*"
                @change="imagemEscolhida"
              >
            </v-flex>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  ref="title"
                  v-model="form.title"
                  label="Título do projeto"
                  placeholder="Título do projeto"
                  color="#1867C0"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  ref="description"
                  v-model="form.description"
                  rows="2"
                  auto-grow
                  label="Descrição do projeto"
                  placeholder="Descrição do projeto"
                  color="#1867C0"
                  :rules="rules.min"
                />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.requirements"
                  label="Requisitos"
                  placeholder="Requisitos"
                  color="#1867C0"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  multiple
                  v-model="form.keywords" 
                  placeholder="Tags (Separe por 'Enter')"
                  append-icon
                  chips
                  deletable-chips
                  class="tag-input"
                  :rules="rules.combo"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-autocomplete
                  ref="area"
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
                    :min="dataTeste"
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
                <v-text-field
                  v-model="docName"
                  readonly
                  label="Documentação do projeto"
                  placeholder="documento-projeto.pdf"
                  :value="docFile"
                  append-icon="insert_drive_file"
                  @click="pickFile"
                />
                <input
                  ref="document"
                  type="file"
                  style="display: none"
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
                  @change="onFilePicked"
                >
              </v-flex>
            </v-layout>
          </v-container>
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
              :disabled="!validateBtn"
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
    data () {
      const defaultForm = Object.freeze({
        title: '', description: '', requirements: '', document:'',
        keywords: [],
        dataEntrega: new Date().toISOString().substring(0,10),  
      }) 
      return {
        dataTeste: new Date().toISOString().substring(0,10),
        menu: false,
        valid:false,
        areas:[
          'Programação', 'Design', 'Mecânica', 'Eletrônica', 'Edificações', 'Publicidade'
        ],

        form: Object.assign({}, defaultForm),
        rules: {
          min: [
            v => !!v || 'Campo obrigarório', 
            v=> (v && v.length) >= 8 || 'Minímo 8 caracteres'
          ],
          combo: [
            v => (v && v.length >= 1) || 'Adicione entre 1 e 5 palavras-chave'
          ],
          required: value => !!value || 'Campo obrigatório'
        },
        snacksucesso: false,
        snackerro: false,
        defaultForm,
        objectFile: '',
        docName: '',
        docFile: null,
        docUrl: '',
        fotoUrl: '',
        foto: '',
        fotoName: '',
        imagemFirebase: '',
      }
    },
    computed:{
      validateBtn(){
        if(this.valid && this.fotoUrl && this.docUrl){
          return true
        }else{
          return false
        }
      }
    },
    methods: {
      log(){
        console.log(this.fotoUrl)
      },
      imagemEscolhida(event){
        console.log("entrou")
        const imagem=event.target.files
        let photoName=imagem[0].name
        this.fotoName=photoName
        console.log(photoName)

        if(photoName.lastIndexOf('.')<=0){
          return alert ('Selecione um arquivo válido')
        }
        const leitorFoto = new FileReader()
        
        leitorFoto.addEventListener('load', () =>{
          this.fotoUrl=leitorFoto.result
          console.log(leitorFoto.result)
        })
        leitorFoto.readAsDataURL(imagem[0])
        this.foto= imagem[0]
        this.imagemFirebase=imagem[0]
        

      },
         adicionarFoto(){
           this.$refs.fotoInput.click()
      },
      testeEmpresa(){
        if(this.$store.state.dbUser){
          if(this.$store.state.dbUser.type==='empresa'){
            return true;
          }
        }
      },
      formattedDate(date) {
        const [year, month, day] = date.split('-')
          return `${day}/${month}/${year}`
      },
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
        this.fotoUrl=null
      },
      pickFile () {
        this.$refs.document.click ()
      },
		
		onFilePicked (e) {
      const files = e.target.files
      
			if(files[0] !== undefined) {
        this.docName = files[0].name
				if(this.docName.lastIndexOf('.') <= 0) {
          return
				}
      console.log("NOME: "+files[0].name)
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.docUrl = fr.result
          this.docFile = files[0] 
          console.log(files)

          this.objectFile=files[0]
				})
      }
    },
      submit () {
        const {
          authUser,
          db
        } = this.$store.state
        const {
          title, description, requirements,
          keywords,
          categoria, dataEntrega, 
        } = this.form
        const project = {
          title, description, requirements,
          keywords:keywords.join(';'),
          categoria, dataEntrega
        }
        db.collection('projects').add({
          ...project,
          user: db.collection('users').doc(authUser.uid),
          userName:  this.$store.state.dbUser.nome
        }).then(({ id }) => {
          this.resetForm()
          return this.uploadFiles(id)
        }).then(() => this.$parent.$children[1].openSnack('success','Projeto publicado!'))
      },
      uploadFiles (projectId) {
        const projectStorageRef = firebase.storage().ref(`projects/${projectId}`)
        const docRef = projectStorageRef.child('file')
        const imgRef = projectStorageRef.child('image')
        const archivePromise = docRef.put(this.objectFile).then(() => {
          console.log("arquivo upado")
        })
        const imagePromise = imgRef.put(this.imagemFirebase).then(() => {
          console.log("foto upada")
        })
        return Promise.all([archivePromise, imagePromise])
      } 
    }
  }
</script>

<style lang="scss" scoped>
    .project-container{
        box-shadow: -10px 10px 20px rgba(0,0,0,0.3);
    }
    .texto-check{
        font-weight:bold ;
    }
    .fas{
        font-size: 35px;
    }
    .container-texts{
        background-color: rgba(255, 255, 255, 0);
    }
    .rounded-card{
      border-radius: 30px;
    }
    .text-erro{
      color: rgb(88, 88, 88);
      font-size: 20px;
    }
    .botaoFoto{
      border-radius: 15px;
    }
    .botaoFoto.title{
      color: white
    }
    .foto{
      transition: ease 0.2s;
      cursor:pointer;
      &:hover{
        transition: ease 0.2s;
        box-shadow: 0px 1px 15px rgba(0,0,0,100);
      }
    }
    .adc-foto{
      margin-top: 10px; margin-bottom: 0;
      font-family: 'Raleway', 'sans-serif';
      font-size: 15px;
    }
    .fas.fa-camera{
      color: #546E7A;
      font-size: 60px;
    }
    .obrigatorio{
      margin: 0; padding:0;
      font-family: 'Raleway', 'sans-serif';
      font-weight: 100;
      color: #546E7A;
    }
</style>
