<template>
	<v-flex xs12 class="text-center">
		<v-dialog
      v-model="dialogSenha"
      max-width="400"
      max-height="300"
    >
		<template v-slot:activator="{ on }">
      <b
        class="passwordForgot"
        v-on="on"
      >
        Esqueci minha senha
      </b>
      </template>

			<v-card
			 flat
       color="#FFF">

			 <div
        class="head"
        style="background-color:#162130"
         >
				  <v-flex
          xs12
          text-xs-center
					class="icone"
        >
          <i
            class="fas fa-key"
            style="padding-top:10px;font-size:26px"
						
          />
        </v-flex>
				  <v-flex
          xs12
          text-xs-center
					class="icone"
        >
          <b style="font-size:18px; font-weight: 500">
            Recuperar Senha
          </b>
        </v-flex>
			 </div>
				 <v-card-text>
				 <v-form
					ref="form"
          v-model="valid">
						<v-flex xs12>
              <v-text-field
                id="email"
                v-model="email"
                class="loginField"
                clearable
                label="Email"
                color="#1867C0"        
                type="email"
                append-icon="email"
                :rules="[rules.email]"
              />
            </v-flex>
				  <v-divider></v-divider>
				 <v-layout
          align-center
          justify-space-around
          >
          <v-flex
            xs5
            text-xs-left
            >
            <v-btn
              color="red"
              round
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
                type="button"
                @click="recuperar()"
              >
                Recuperar senha
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        </v-card-text>
			</v-card>
		</v-dialog>
	</v-flex>
</template>

<script>
import firebase from 'firebase';
	export default {
		methods:{
			close(){
        this.dialogSenha = false
        this.$emit('update:dialogSenha', false)
        this.resetForm()
			},
			resetForm(){
			 this.form = Object.assign({}, this.defaultForm)
       this.$refs.form.reset()
			},
			recuperar(){
				console.log(this.email)
				this.gerarSenha(this.email)
			},
			gerarSenha(emailAddress){
				const caracteres= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				
				var auth = firebase.auth();

				auth.sendPasswordResetEmail(emailAddress).then(()=>{
          console.log('email enviado')
          this.$parent.$parent.$parent.$parent.$parent.$parent.$children[1].openSnack('success', 'E-mail enviado!')
          this.close()
        }).catch((err)=>{
          console.log(error, 'ERRO')
          this.$parent.$parent.$parent.$parent.$parent.$parent.$children[1].openSnack('error', 'E-mail não existe!')
        })
				
			}
		},

		data(){
			 const defaultForm = Object.freeze({
        email: ''
			})
			return {
				form: Object.assign({}, defaultForm),
				dialogSenha:false,
				email: '',
				senhaFinal: '',
				rules: {
          email : value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'E-Mail inválido.'
          }
			 },
			valid: false
			}

		}
	}
</script>

<style lang="scss" scoped>
	.passwordForgot{
		cursor: pointer;
		color: #FF5252;
    font-weight: 400;
   	transition: ease 0.3s;

    &:hover{
      color: red;
      padding-left: 15px;
      text-shadow: -0px 0px 10px #ff0000a9;
      transition: ease 0.3s;
      
    }
	}
	.icone{
		color: white;
	}
	.white--text{
		padding-left: 20px;
	}

</style>