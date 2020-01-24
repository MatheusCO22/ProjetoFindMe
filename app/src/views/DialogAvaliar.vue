<template>          
  <v-flex
    xs12
    class="text-center"
  >
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          outline
          round
          color="blue darken-3"
          :disabled="!botao"
          v-on="on"
        >
          <b
            v-if="!avaliou"
            style="font-weight:300"
          >
            Avaliar
          </b>
          <b
            v-if="avaliou"
            style="font-weight:300"
          >
            Você já avaliou
          </b>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          text-xs-center
          class="headline grey lighten-2"
        >
          <v-flex
            xs12
            text-xs-center
          >
            Avaliar
          </v-flex>
        </v-card-title>

        <v-card-text>
          <v-flex xs12>
            <v-form ref="form">
              <v-textarea
                v-model="avaliacao"
                filled
                name="input-7-4"
                label="Deixe seu Feedback"
                placeholder="Deixe seu Feedback..."
              />
            </v-form>
          </v-flex>

          <v-flex
            xs12
            text-xs-center
          >
            <v-rating
              v-model="nota"
              hover
              half-increments
            />
          </v-flex>
          <v-flex
            xs12
            text-xs-center
          >
            <span class="font-weight-bold" />
          </v-flex>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
                  
            color="red"
            class="white--text"   
            @click="close()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="submeter()"
          >
            Avaliar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
	export default{
     data(){
      const defaultForm = Object.freeze({
        })
      return{
        avaliacao: '',
        dialog: false,
        form: Object.assign({}, defaultForm),
        nota: 0,
        botao: true,
        avaliou: false
      }
    },
    created(){
      const {
        db,
      } = this.$store.state
      const idEstudante=this.$store.state.dbUser.id
      const idEmpresa=this.$route.params.id

      db.collection('avaliacoes').get().then(querySnapshot =>{      
      querySnapshot.forEach(doc =>{
            
        console.log(doc.id)  
        
        if(doc.data().empresa.id == idEmpresa && doc.data().estudante.id==idEstudante 
        && doc.data().typeAvaliador=='estudante'){
          this.avaliou = true
          this.botao=false
        }if(doc.data().estudante.id == idEmpresa && doc.data().empresa.id==idEstudante 
        && doc.data().typeAvaliador=='empresa'){
          this.avaliou = true
          this.botao=false
        }
     
      })
    })
    },
    methods:{
      close(){
        this.dialog=false;
        this.resetForm()
        
      },
      resetForm(){
       this.form = Object.assign({}, this.defaultForm)
       this.$refs.form.reset()

      },
      submeter(){
         const {
          db,
         } = this.$store.state
      
         const { 
         avaliacao,
         nota
          } = this
        const resolucao = {
           avaliacao,
           nota,
           typeAvaliador: 'estudante'
           }
        const empresaAvaliando ={
           avaliacao,
           nota,
           typeAvaliador: 'empresa'
        }
           
        const idEmpresa=this.$route.params.id
        console.log(idEmpresa)
        
        if(this.$store.state.dbUser.type==='estudante'){
        db.collection('avaliacoes').add({
        ...resolucao, 
        estudante: db.collection('users').doc(this.$store.state.dbUser.id),
        empresa:   db.collection('users').doc(this.$route.params.id)
       }).then(()=>{
          this.botao=false
          this.close()
          this.$parent.$parent.$parent.$children[1].openSnack("success", "Avaliação concluída!")
        })
      }
      if(this.$store.state.dbUser.type=='empresa'){
        
        db.collection('avaliacoes').add({
        ...empresaAvaliando, 
        empresa: db.collection('users').doc(this.$store.state.dbUser.id),
        estudante:   db.collection('users').doc(this.$route.params.id)
      }).then(()=>{
          this.botao=false
          this.close()
          this.$parent.$parent.$parent.$children[1].openSnack("success", "Avaliação concluída!")
        })
      }

      }
    }
	}
</script>

<style lang="scss" scoped>

</style>>



