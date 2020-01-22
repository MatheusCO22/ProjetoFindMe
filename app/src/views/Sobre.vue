<template>
  <v-container>
    <v-card class="card">
      <v-card-text>
        <v-flex
          xs12
          text-xs-center
          class="sobre"
        >
          SOBRE NÓS
        </v-flex>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <v-layout row>
          <v-flex
            sm2
            text-xs-center
          >
            <v-avatar
              size="20vh"
              color="grey"
            >
              <img
                src="../assets/team/carvalho.png"
                alt="avatar"
              >
            </v-avatar>
          </v-flex>                
          <v-layout column>
            <v-flex
              xs4
              class="nome"
            >
              Matheus Carvalho
            </v-flex>
            <v-flex xs12>
              Atuei no desenvolvimento front-end, no design e em parte do back-end do site.
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <v-layout row>
          <v-layout column>
            <v-flex
              xs4
              text-xs-right
              class="nome"
            >
              Matheus Puehler
            </v-flex>
            <v-flex
              sm1
              text-xs-right
            >
              Atuei no desenvolvimento do banco de dados, back-end e toda idealização do site.
            </v-flex>
          </v-layout>
          <v-flex
            xs2
            text-xs-center
          >
            <v-avatar
              size="20vh"
              color="blue"
            >
              <img
                src="../assets/team/puehler.png"
                alt="Puehler"
              >
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <v-layout row>
          <v-flex
            sm2
            text-xs-center
          >
            <v-avatar
              size="20vh"
              color="grey"
            >
              <img
                src="../assets/team/bruno.png"
                alt="Bruno"
              >
            </v-avatar>
          </v-flex>                
          <v-layout column>
            <v-flex
              xs4
              class="nome"
            >
              Bruno Witzel
            </v-flex>
            <v-flex xs12>
              Atuei na modelagem do sistema e desenvolvimento de arquivos referentes ao site.
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
    .nome{
      font-size: 25px;
    }
    .sobre{
      font-size: 20px;
    }
    .card{
      border-radius: 35px;
      background-color: rgba(255, 255, 255, 0.6);
    }
</style>

<script>
  export default {
    data () {
      return {
        
      }
    }
  }
</script>