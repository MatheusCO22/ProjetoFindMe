<template>
  <div
    ref="globalcomps"
    class="global"
  >
    <v-snackbar
      v-model="snacksucesso"
      relative
      bottom
      right
      color="success"
    >
      <span>{{ text }}</span>
      <v-icon dark>
        check_circle
      </v-icon>
    </v-snackbar>

    <v-snackbar
      v-model="snackerro"
      relative
      bottom
      right
      color="red"
    >
      <span>{{ text }}</span>
      <v-icon dark>
        error
      </v-icon>
    </v-snackbar>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
    >
      <v-card>
        <v-card-text>
          <v-flex
            xs12
            text-xs-center
          >
            <v-avatar
              size="300"
              color="white"
            >
              <img
                src="http://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-10.gif"
                alt=""
              >
            </v-avatar>
          </v-flex>
          <v-flex
            xs12
            text-xs-center
            class="loading-projeto"
          >
            Buscando dados...
          </v-flex>
        </v-card-text>
      </v-card>
    </v-dialog>
    <template>
      <v-layout
        row
        justify-center
      >
        <v-dialog
          v-model="dialogConfirmacao"
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">
              Use Google's location service?
            </v-card-title>

            <v-card-text>
              Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
              >
                Disagree
              </v-btn>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </div>
</template>

<script>
export default { 
  data(){
    return{
      dialog: false,
      dialogConfirmacao: false,
      text:'Sei la',
      snacksucesso: false,
      snackerro:false,
      estados:[
        'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA',
        'PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'
      ]
      }
    },
    methods:{
      getEstados(){
        return this.estados;
      },
      openSnack(modo, texto){
        if(modo==='success'){
          this.text=texto
          this.snacksucesso=true
        }if(modo==='error'){
          this.text=texto
          this.snackerro=true
        }
      },
      openLoading(){
        this.dialog=true
      },
      closeLoading(){
        this.dialog=false
      }
    }
}
</script>

<style lang="scss" scoped>
.loading-projeto{
  color:#868686;
  font-size:150%;
  font-family: 'Ranga', cursive;
}
</style>
