<template>
  <v-dialog
    v-model="dialog"
    class="login"
    persistent
    max-width="400"
    max-height="300"
    @keydown.esc="close()"
  >
    <v-card
      flat
      color="#FFF"
    >
      <div
        class="head"
        style="background-color:#162130"
      >
        <v-flex
          xs12
          text-xs-center
        >
          <i
            class="fas fa-user"
            style="padding-top:10px;font-size:20px"
          />
        </v-flex>
        <v-flex
          xs12
          text-xs-center
        >
          <b style="font-size:18px; font-weight: 500">
            Login
          </b>
        </v-flex>
      </div>
      <v-divider />
      <v-card-text flat>
        <v-form
          ref="form"
          v-model="valid"
          @keyup.native.enter="login()"
          @submit.prevent="submit"
        >
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
              :error="dadosIncorretos"
              :rules="[rules.email]"
              @focus="resetErrors"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="password"
              class="senhaField"
              color="#1867C0"
              clearable
              label="Senha"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.min]"
              :error="dadosIncorretos"
              @click:append="show1 = !show1"
              @focus="resetErrors"
            />
          </v-flex>
          <v-flex
            xs12
            style="margin-top: 10px;"
          >
            <b
              class="text"
              @click="openDialogSelecao"
            >
              Não tenho conta
            </b>
            <v-flex xs12>
              <SenhaDialog />
            </v-flex>
          </v-flex>
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
                
                type="submit"
                @click="login()"
              >
                Logar
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card-actions>
    </v-card>
    <PopupSelecao
      ref="selecao"
      class="dialog-selecao"
      :selecao.sync="dialogSelecao"
    />
  </v-dialog>
</template>

<script>

  import PopupSelecao from './PopupSelecao.vue'
  import SenhaDialog from './SenhaDialog.vue'
  export default {
     components: {
      PopupSelecao,
      SenhaDialog
    },
    props: {
      dialog: {
        type: Boolean,
        default: false
      }
    },
    data: function(){
      const defaultForm = Object.freeze({
        email: '', password:''
      })

      return {
        form: Object.assign({}, defaultForm),
        valid:false,
        show1:false,
        rules: {
          required: value => !!value || 'Campo obrigatório',
          email : value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'E-Mail inválido.'
          },
          min: v => (!!v && v.length >= 6) || 'Mínimo 6 caracteres'
        },
        dialogSelecao: false,
        email: '',
        password: '',
        snacksucesso: false,
        snackerro: false,
        dadosIncorretos: false
      }
   },
    methods: {
      open(){
        this.$emit('update:dialog', true)
      },
      login(){
         const { 
           email,
           password
        }= this
        const user= {
          email,
          password
        }
        this.$store.dispatch('login', user)
        
        .then(() => {
          this.close()
          this.$parent.$children[1].openSnack('success','Logado!')
        })
        .catch((erro) => {
          this.dadosIncorretos = true
          this.$parent.$children[1].openSnack('error','Credenciais incorretas.')
          console.log('deu ruim', erro)
        })
      },
     
      close(){
        this.resetForm()
        this.$emit('update:dialog', false)
        this.$refs.selecao.close()
      },
      openDialogSelecao(){
        this.$emit('update:dialog', false)
        this.$refs.selecao.open()
      },
       resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      resetErrors(){
        this.dadosIncorretos = false
      }
  }
}
</script>

<style lang="scss" scoped>
.head{
  height: 70px;
  width: 100%;
  background-color: #162130;
  color: #FFF;
}
.text{
  cursor: pointer;
  color:#162130;
  font-weight: 400;

  transition: ease 0.3s;
    &:hover{
      padding-left: 15px;
      text-shadow: -0px 0px 10px #0c99dba9;
      transition: ease 0.3s;
      color: #1867C0;
    }
}
.passwordForgot{
  cursor: pointer;
   transition: ease 0.3s;
    &:hover{
      text-shadow: -0px 0px 10px #0c99dba9;
      transition: ease 0.3s;
      color: #1867C0;
    }
}
</style>
