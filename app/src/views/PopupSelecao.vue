<template>
  <v-dialog
    v-model="selecao"
    class="selecao"
    max-width="400"
    max-height="300"
    persistent
    @keydown.esc="close"
  >
    <v-card
      flat
      color="#FFFFFF"
    >
      <div class="head">
        <v-flex
          xs12
          text-xs-center
        >
          <i
            class="far fa-question-circle"
            style="padding: 10px 0px; color: #FFF; font-size:20px"
          />
        </v-flex>
        <v-flex
          xs12
          text-xs-center
        >
          <b style="font-size:18px; font-weight:100;">
            Em qual perfil você se encaixa?
          </b>
        </v-flex>
      </div>
      <v-divider />

      <v-card-text>
        <v-layout
          align-center
          justify-space-around
          row
          fill-height
        >
          <v-spacer />

          <v-layout
            md3
            align-center
            column
            class="text"
          >
            <v-btn
              fab
              depressed
              @click="redirect('Estudante')"
            >
              <i class="fas fa-graduation-cap" />
            </v-btn>
            <b
              style="cursor:pointer; font-weight: 500"
              @click="redirect('Estudante')"
            >Estudante</b>
          </v-layout>

          <v-spacer /><v-spacer />
      
          <v-layout
            md3
            align-center
            column
            class="text"
          >
            <v-btn
              fab
              depressed
              @click="redirect('Empresa')"
            >
              <i class="fas fa-briefcase" />
            </v-btn>
            <b
              style="cursor:pointer; font-weight: 500;"
              @click="redirect('Empresa')"
            >Empresa</b>
          </v-layout>
          <v-spacer />
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

  export default {
    props: {
      selecao: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('update:selecao', false)
      },open(){
        this.$emit('update:selecao', true)
      },
      redirect(path){
        this.close()
        this.$router.push('/cadastro'+path)
      }
  }
  }
</script>

<style lang="scss" scoped>
  .head{
    background-color: #162130;
    color:#FFF;
  }
  .fas{
     font-size:25px;
   }
  .text{
     color:#162130;
     transition: ease 0.3s;
     &:hover{
       text-shadow : 0px 0px 4px rgb(17, 238, 201);
       transition: ease 0.3s;
       color: #1867C0;
     }
   }
</style>
