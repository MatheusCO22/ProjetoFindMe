<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
          <v-badge>
            <template v-slot:badge>{{getQntInscritos()}}</template>
              <v-btn class="ma-2"
                v-if="$store.state.dbUser.type == 'estudante'"
                flat
                round
                color="blue darken-3"
                :disabled="!botao"
                v-on="on"
              >
                <b v-if="!alert" style="font-weight:300">
                  <i class="fas fa-check" style="margin-right:10px" />
                  Inscrever-se
                </b>
                <b v-if="alert" style="font-weight:300">
                  <i class="fas fa-check" style="margin-right:10px" />
                  Você já está inscrito
                </b>
              </v-btn>
          </v-badge>
      </template>
      
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Inscrever-se
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-textarea
              v-model="form.motivo"
              auto-grow
              box
              label="Descreva os motivos para você querer participar desse projeto"
              color="#1867C0"
              :rules="[rules.min]"
            />
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-flex
            xs12
            text-xs-center
          >
            <v-layout
              align-center
              justify-space-around
            >
              <v-flex
                xs5
                text-xs-left
              >
                <v-btn
                  round
                  color="red"
                  class="white--text"   
                  @click="close()"
                >
                  Cancelar
                </v-btn>
              </v-flex>
              <v-flex
                xs5
                text-xs-right
              >
                <v-btn
                  round
                  color="#1867C0"
                  class="white--text"
                  :disabled="!valid"
                  type="submit"
                  @click="cadastrarResposta()"
                >
                  Inscrever
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    const defaultForm = Object.freeze({
      motivo: ''
    })
    return {
      form: Object.assign({}, defaultForm),
      dialog: false,
      valid: false,
      botao: 'true',
      alert: false,
      qntInscritos: 0,
      idEmpresa: '',
      rules: {
         min: v => (!!v && v.length >= 15) || 'Mínimo 15 caracteres'
      }
    }
  },
  created(){  
    const {
      db,
    } = this.$store.state

    const idUser=this.$store.state.dbUser.id
    const idProjeto=this.$route.params.id
    const projectRef = db.collection("projects").doc(idProjeto);

    db.collection('projects').doc(idProjeto).get().then((doc)=>{
      this.idEmpresa = doc.data().user.id
      console.log(this.idEmpresa)
    })
    let qnt=0;
    
    console.log('Id User: '+ idUser + ', Projeto: '+ idProjeto)

    db.collection('inscricoes').get().then(querySnapshot =>{      
      querySnapshot.forEach(doc =>{
        if(doc.data().project.id==idProjeto && doc.data().user == idUser){
          this.botao=false
          this.alert=true
        }
       
        if(doc.data().project.id==idProjeto){
          qnt++
        }
        this.qntInscritos=qnt
      })
    })
  },
  methods:{
    getQntInscritos(){
      if(this.qntInscritos > 9){
        return "9+"
      }else{
        return this.qntInscritos
      }
    },
    close(){
      this.dialog=false
      console.log(this.$parent.$parent.$parent.$children[1].openSnack("success", "Inscrição solicitada!"))
      this.resetForm()
      // Ta dando errado pra abrir essa dialog aqui
    },
    resetForm () {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
    cadastrarResposta(){
      const idProjeto = this.$route.params.id
      const idUser = this.$store.state.dbUser.id

      const {
        db
      } = this.$store.state
      const { 
        motivo
      } = this.form
      const texto = {
        motivo
      }
      
      db.collection('inscricoes').add({
        ...texto,
        user: idUser,
        project: db.collection('projects').doc(idProjeto),
        idEmpresa: this.idEmpresa   
      }).then(()=>{
        this.botao=false
        this.alert=true
        this.close()
        this.qntInscritos++       
      })
    }
  }
}
</script>

<style lang="scss">
  span.v-badge__badge.primary {
      top: 4px;
      right: 0px;
  }
</style>
