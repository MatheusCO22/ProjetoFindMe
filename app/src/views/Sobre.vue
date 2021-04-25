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
          <v-avatar
            size="20vh"
            color="grey"
          >
            <img
              src="../assets/team/carvalho.png"
              alt="avatar"
            >
          </v-avatar>
            <v-divider vertical class="vert"></v-divider>
          <v-layout column>
            <v-flex class="nome">
              Matheus Carvalho
            </v-flex>
            <v-flex>
              Atuei no desenvolvimento front-end, no design e em parte do back-end do site.
            </v-flex>
          </v-layout>
        </v-layout>
      <v-divider class="hrz"></v-divider>
        <v-layout row>
          <v-layout column>
            <v-flex text-xs-right class="nome">
              Matheus Puehler
            </v-flex>
            <v-flex text-xs-right>
              Atuei no desenvolvimento do banco de dados, back-end e toda idealização do site.
            </v-flex>
          </v-layout>
            <v-divider vertical class="vert"></v-divider>
          <v-avatar
            size="20vh"
            color="grey"
          >
            <img
              src="../assets/team/puehler.png"
              alt="avatar"
            >
          </v-avatar>
        </v-layout>
          <v-divider class="hrz"></v-divider>
        <v-layout row>
          <v-avatar
            size="20vh"
            color="grey"
          >
            <img
              src="../assets/team/bruno.png"
              alt="avatar"
            >
          </v-avatar>
            <v-divider vertical class="vert"></v-divider>
          <v-layout column>
            <v-flex class="nome">
              Bruno Witzel
            </v-flex>
            <v-flex>
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
    .vert{
      margin: 0px 20px;
    }
    .hrz{
      margin: 20px 0px;
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