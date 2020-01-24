<template>
  <main>
    <v-container
      v-if="!load"
    >
      <v-card
        class="rounded-card loading"
      >
        <v-img
          :src="require('../assets/loading-engrenagem.gif')"
          max-height="500"
          class="grey darken-4"
        />
      </v-card>
    </v-container>
    <v-container
      v-if="load"
      class="master"
    >
      <v-card
        v-if="$store.state.dbUser.type == 'empresa'"
        flat
        color="rgba(255, 255, 255, 0.8)"
        class="rounded-card"
      >
        <v-card-text flat>
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
                text-xs-center
              >
                <v-avatar
                  size="180"
                  color="blue lighten-4"
                  class="foto"
                  @click="photoPicker()"
                >
                  <v-img
                    v-if="!imageUrl"
                    :src="require('../assets/loading.gif')"
                  />
                  <img
                    v-if="imageUrl" 
                    :src="imageUrl"
                    alt="20px"
                  >
                </v-avatar>
                <input 
                  ref="fotoInput"
                  type="file"
                  style="display: none"
                  accept="image/*"
                  @change="imagemEscolhida"
                >
              </v-flex>
              <v-flex
                xs12
                text-xs-center
                style="color:#696969; padding:5px 0px"
              >
                Editar foto de perfil
              </v-flex>
              <v-layout wrap>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    ref="nome"
                    v-model="form.nome"
                    label="Nome / Razão Social"
                    placeholder="Nome / Razão Social"
                    color="#1867C0"
                    :rules="[rules.required]"
                  />
                </v-flex>
          
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    id="cnpj"
                    v-model="form.cnpj"
                    label="CNPJ"
                    placeholder="12.345.678/9000-00"
                    color="#1867C0"
                    mask="##.###.###/####-##"
                    :rules="[rules.cnpj]"
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    id="fone"
                    v-model="form.fone"
                    label="Telefone"
                    placeholder="(XX) xxxx-xxxx"
                    color="#1867C0"
                    mask="(##) #####-####"
                    :rules="[rules.required]"
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md3
                >
                  <v-autocomplete
                    v-model="form.area"
                    label="Área de Atuação"
                    placeholder="Área de Atuação"
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
                  <v-autocomplete
                    ref="country"
                    v-model="form.estado"
                    color="#1867C0"
                    :rules="[rules.required]"
                    :items="estados"
                  >
                    <template
                      v-slot:label
                    >
                      <div>
                        UF <small><small> (Estado)</small></small>
                      </div>
                    </template>
                  </v-autocomplete>
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
      <v-card
        v-if="$store.state.dbUser.type==='estudante'"
        flat
        color="rgba(255, 255, 255, 0.8)"
        class="rounded-card"
      >
        <v-card-text
          class="login-container"
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
                text-xs-center
              >
                <v-avatar
                  size="180"
                  color="blue lighten-4"
                  class="foto"
                  @click="photoPicker()"
                >
                  <v-img
                    v-if="!imageUrl"
                    :src="require('../assets/loading.gif')"
                  />
                  <img
                    v-if="imageUrl" 
                    :src="imageUrl"
                    alt="20px"
                  >
                </v-avatar>
                <input 
                  ref="fotoInput"
                  type="file"
                  style="display: none"
                  accept="image/*"
                  @change="imagemEscolhida"
                >
              </v-flex>
              <v-flex
                xs12
                text-xs-center
                style="color:#696969; padding:5px 0px"
              >
                Editar foto de perfil
              </v-flex>
              <v-layout wrap>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    ref="nome"
                    v-model="form.nome"
                    label="Nome completo"
                    placeholder="Nome completo"
                    color="#1867C0"
                    :rules="[rules.required]"
                  />
                </v-flex>
            
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    id="cpf"
                    v-model="form.cpf"
                    label="CPF"
                    placeholder="123.456.789-00"
                    color="#1867C0"
                    mask="###.###.###-##"
                    :rules="[rules.cpf]"
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    v-model="form.school"
                    label="Instituição onde estuda"
                    placeholder="Universidade Federal do Paraná"
                    color="#1867C0"
                    :rules="[rules.required]"
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    v-model="form.curso"
                    label="Curso"
                    placeholder="Ciência da computação"
                    color="#1867C0"
                    :rules="[rules.required]"
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                >
                  <v-text-field
                    id="fone"
                    v-model="form.fone"
                    label="Telefone"
                    placeholder="(XX) xxxx-xxxx"
                    color="#1867C0"
                    mask="(##) #####-####"
                    :rules="[rules.required]"
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md3
                >
                  <v-autocomplete
                    ref="country"
                    v-model="form.estado"
                    color="#1867C0"
                    :rules="[rules.required]"
                    :items="estados"
                  >
                    <template v-slot:label>
                      <div>
                        UF <small><small> (Estado)</small></small>
                      </div>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md3
                >
                  <v-menu
                    v-model="menu2"
                    :nudge-right="20"
                    :close-on-content-click="false"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="formattedDate(form.birth)"
                        label="Data de nascimento"
                        color="#1867C0"
                        append-icon="event"
                        :rules="[rules.birth]"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="form.birth"
                      landscape
                      locale="pt-br"
                      @input="menu2 = false"
                    />
                  </v-menu>
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
  </main>
</template>

<script>
import CPF from 'gerador-validador-cpf';
import firebase from 'firebase';
  export default {
    data () {
      const defaultForm={
        nome: '-', cpf: '-', fone: '-', school: '-', curso: '-',
        estado: '-', cnpj: '-', area : '-',
        birth: new Date().toISOString().substring(0,10),
      }
    return {
      anoAtual: new Date().toISOString().substring(0,4),
      valid:false,
      estados:[
        'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA',
        'PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'
      ],
      areas:[
        'Programação', 'Design', 'Mecânica', 'Eletrônica', 'Edificações', 'Publicidade'
      ],
      menu2: false, show1:false,

      form: Object.assign({}, defaultForm),

      rules: {
        required: value => !!value || 'Campo obrigatório',
        email : value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'E-Mail inválido.'
        },
        min: v => v.length >= 6 || 'Min 6 characters',
        cnpj: v => this.testaCNPJ(v) || 'CNPJ inválido.',
        cpf: v => this.testaCPF(v) || 'CPF inválido.',
        birth: v=> this.testaData(v)
      },
      conditions: false,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
      snacksucesso: false,
      snackerro: false,
      terms: false,
      fotoUrl: '',
      imagemFirebase: '',
      isImageEditada: '',
      imageUrl : null,
      load : false,
      hasPhoto: false
    }
  },
    created(){
      const {db} = this.$store.state
      firebase.auth().onAuthStateChanged(()=>{
        const user = this.$store.state.dbUser
        db.collection('users').doc(user.id).get().then((doc)=>{

          const loadForm = {
            'nome': doc.data().nome,
            'cpf': doc.data().cpf,
            'fone': doc.data().fone,
            'school': doc.data().school,
            'curso': doc.data().curso,
            'birth': doc.data().birth,
            'estado': doc.data().estado,
            'cnpj': doc.data().cnpj,
            'area': doc.data().area,
          }
          this.form = Object.assign({}, loadForm)
          console.log("DATA"+ this.form.birth)
        })

        const storage = firebase.storage()
        const imageRef = storage.ref('users').child(user.email).child('image')

        imageRef.getDownloadURL()
          .then((url) =>{
            console.log("baixaste")
            this.imageUrl = url
            this.hasPhoto = true
            this.load = true
          },err=>{
            console.log("Sem foto")
            this.load = true
          }
        )
      })
    },
    methods: {
      photoPicker(){
        console.log('chegou')
        this.$refs.fotoInput.click()
      },
      imagemEscolhida(event){
        const email = this.$store.state.authUser.email
        const userStorageRef = firebase.storage().ref(`users/${email}`)

        const imagem=event.target.files
        let photoName=imagem[0].name
        console.log(photoName)
        
        if(photoName.lastIndexOf('.')<=0){
          return alert ('Selecione um arquivo válido')
        }
        const leitorFoto = new FileReader()

        leitorFoto.addEventListener('load', () =>{
          this.imageUrl=leitorFoto.result
          console.log(this.imageUrl)
        })
        leitorFoto.readAsDataURL(imagem[0])
        this.imagemFirebase=imagem[0]
        this.isImageEditada = true
      },
      testaCNPJ(cnpj) {
        if(cnpj.length == 14){
          var tamanho;
          var numeros;
          var digitos;
          var soma;
          var pos;
          var resultado;
          
          if (cnpj == "00000000000000" || cnpj == "11111111111111" || 
              cnpj == "22222222222222" || cnpj == "33333333333333" || 
              cnpj == "44444444444444" || cnpj == "55555555555555" || 
              cnpj == "66666666666666" || cnpj == "77777777777777" || 
              cnpj == "88888888888888" || cnpj == "99999999999999"){
                return false;
          }

          tamanho = cnpj.length - 2;
          numeros = cnpj.substring(0,tamanho);
          digitos = cnpj.substring(tamanho);
          soma = 0;
          pos = tamanho - 7;
          var i;
          for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2){
              pos = 9;
            }
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0)){
            return false;
          }
          tamanho = tamanho + 1;
          numeros = cnpj.substring(0,tamanho);
          soma = 0;
          pos = tamanho - 7;
          for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2){
              pos = 9;
            }
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1)){
            return false;
          }     
          return true;
        }
      },
      testaData(data){
        if(data){
          const ano = data.substring(6,10);
          var idade = this.anoAtual - ano;
          console.log(idade)
          if(idade < 16){
            console.log("TA AQUI")
            return 'Você precisa ter pelo menos 16 anos incompletos.'
          }
          else{
            return true
          }
        }else{
          return 'Campo obrigatório'
        }
      },
      testaCPF(strCpf){
        if(strCpf.length == 11){
          if(CPF.validate(strCpf)){
            return true;
          }else{
            return false;
          }  
        }else{
          return false;
        }
      },
      formattedDate(date) {
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        const { db } = this.$store.state  
        const  userRef = db.collection("users").doc(this.$store.state.dbUser.id);
        
        if(this.$store.state.dbUser.type == 'estudante'){
          const {
            nome, cpf, fone,
            school, curso,
            estado, birth
          }=this.form

          const user={
            nome,  cpf, fone,
            school, curso,
            estado, birth
          }
          userRef.update(user).then(()=>{
            console.log("USUARIO SALVO")
            if(this.isImageEditada){
              this.$parent.$children[1].openSnack('success','Aguarde o upload da imagem...')

              const email = this.$store.state.authUser.email
              if(this.hasPhoto){
                const userStorageRef = firebase.storage().ref("users/"+email+"/image")
                userStorageRef.put(this.imagemFirebase).then(()=>{
                
                  this.$parent.$children[1].openSnack('success','Perfil editado com sucesso!')
                  this.$router.push('/meuPerfil')
                  console.log("Foto Firebase atualizada")
                  this.$parent.$children[2].atualizarImagem()
              })
              }else{
                return this.uploadFiles(email)
              }
            }else{
              this.$parent.$children[1].openSnack('success','Perfil editado com sucesso!')
              this.$router.push('/meuPerfil')
            }
          })
          
        }else{
          console.log('empresa')
          const { 
            nome, cnpj,
            fone,
            area, estado
          } = this.form

          const user = { 
            nome, cnpj,
            fone,
            area, estado,
            type:'empresa' 
          }
          if(this.isImageEditada){
            const email = this.$store.state.authUser.email
            if(this.hasPhoto){
              const userStorageRef = firebase.storage().ref("users/"+email+"/image")
              userStorageRef.put(this.imagemFirebase).then(()=>{
                console.log("foto upada")
              })
            }else{
              return this.uploadFiles(user.email)
            }
          }
          userRef.update(user).then(()=>{
            console.log("USUARIO SALVO")
            if(this.isImageEditada){
              const email = this.$store.state.authUser.email
              if(this.hasPhoto){
                const userStorageRef = firebase.storage().ref("users/"+email+"/image")
                userStorageRef.put(this.imagemFirebase).then(()=>{
                console.log("Foto Firebase atualizada")
                this.$parent.$children[2].atualizarImagem()
              })
              }else{
                return this.uploadFiles(email)
              }
            }
          })
        }
      },
      uploadFiles(email){
        const imgRef = firebase.storage().ref('users/'+email+'/'+'image')
        const imagePromise = imgRef.put(this.imagemFirebase).then(() => {
        this.$parent.$children[1].openSnack('success','Perfil editado com sucesso!')
        this.$router.push('/meuPerfil')
        this.$parent.$children[2].atualizarImagem()
        })
        return Promise.all([imagePromise])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rounded-card{
    border-radius: 30px;
  }
  .loading{
    height: 500px;
  }
  .foto{
    transition: ease 0.3s;
    cursor:pointer;
    &:hover{
      transition: ease 0.3s;
      box-shadow: 0px 0px 15px rgba(0,0,0,100);
    }
  }
  .texto-check{
    font-weight:bold ;
  }
  .fas{
    font-size: 35px;
  }
</style>