<template>
  <v-footer
    dark
    height="auto"
  >
    <v-divider />
    <v-card
      flat
      tile
      color="#162130"
      class=" white--text text-xs-center"
      style="width:100%"
    >
      <v-card-text>
        <v-btn
          color="#162130"
          depressed
          round
          @click="$router.push('/')"
        >
          HOME
        </v-btn>
        <v-btn
          color="#162130"
          depressed
          round
          @click="btnClick()"
        >
          COMEÇAR
        </v-btn>
        <v-btn
          color="#162130"
          depressed
          round
          @click="$router.push('sobre')"
        >
          SOBRE
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Find Me, desenvolvido por estudantes para estudantes.
      </v-card-text>
      <v-card-text class="white--text">
        &copy;2019 — <strong>IFPR</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods:{
      btnClick(arg){
        var user = this.$store.state.dbUser;
        if(user){
          if(arg){
            this.$router.push(arg)
          }else{
            if(user.type == 'empresa'){
              this.$router.push('publique')
            }else{
              this.$$router.push('encontre')
            }
          }
        }
        else{
          this.$parent.$children[0].open()
        }
      }
    }
  }
</script>