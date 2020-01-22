<template>
  <main class="main">
    <div class="imagem elevation-0">
      <v-layout column align-center justify-center style="height:500px; background-color:#16213070">
        <v-card-text>
          <v-flex
            class="titulo fadeIn"
            text-xs-center
          >
            <img src="../assets/logoAlt.png" width="275vw" alt="logo">
          </v-flex>
          <v-flex
            class="slogan fadeIn"
            text-xs-center
          >
            Uma ponte entre o estudante e o mercado de trabalho
          </v-flex>
          <v-flex
            xs12
            text-xs-center
            style="margin-top:50px;"
          >
            <v-btn
              outline
              round
              color="#FFC00C"
              @click="btnClick()"
            >
              Vamos começar!
            </v-btn>
          </v-flex>
        </v-card-text>
      </v-layout> 
    </div>
    <v-card color="#EFEFEF">
      <v-card-text>
        <v-flex
          xs12
          text-xs-center
          class="como-funciona fadeIn"
        >
          Como funciona?
        </v-flex>
          <v-divider />
      </v-card-text>
      <v-card class="elevation-0" color="#EFEFEF">
        <v-card-text>
          <v-layout row justify-space-between style="padding: 20px;">
            <v-card class="etapa elevation-3">
              <v-flex
                xs12
                text-xs-center
              >
                <i class="fas fa-folder-plus"/>
              </v-flex>
              <v-flex
                class="titulo-etapa fadeIn"
                xs12
                text-xs-center
              >
                PUBLICAÇÃO
              </v-flex>
                <v-divider />
              <v-card-text>
                <v-flex
                  xs12
                  text-xs-center
                  class=""
                >
                  Após o cadastro, a empresa poderá publicar projetos, 
                  que ficarão disponíveis para visualização.
                </v-flex>
              </v-card-text>
            </v-card>

            <v-card class="etapa elevation-3">
              <v-flex
                xs12
                text-xs-center
              >
                <i class="fas fa-comments"/>
              </v-flex>
              <v-flex
                class="titulo-etapa fadeIn"
                xs12
                text-xs-center
              >
                COMUNICAÇÃO
              </v-flex>
                <v-divider />
              <v-card-text>
                <v-flex
                  xs12
                  text-xs-center
                  class=""
                >
                  Após o cadastro, o estudante poderá interagir com os projetos 
                  já publicados, e notificar o interesse para a empresa.
                </v-flex>
              </v-card-text>
            </v-card>

            <v-card class="etapa elevation-3">
              <v-flex
                xs12
                text-xs-center
              >
                <i class="fas fa-code"/>
              </v-flex>
              <v-flex
                class="titulo-etapa fadeIn"
                xs12
                text-xs-center
              >
                TRABALHO
              </v-flex>
                <v-divider />
              <v-card-text>
                <v-flex
                  xs12
                  text-xs-center
                  class=""
                >
                  A empresa irá analisar os interessados e selecionar um para trabalhar no projeto, 
                  que será notificado.
                </v-flex>
              </v-card-text>
            </v-card>

            <v-card class="etapa elevation-3">
              <v-flex
                xs12
                text-xs-center
              >
                <i class="fas fa-check"/>
              </v-flex>
              <v-flex
                class="titulo-etapa fadeIn"
                xs12
                text-xs-center
              >
                ETAPA FINAL
              </v-flex>
                <v-divider />
              <v-card-text>
                <v-flex
                  xs12
                  text-xs-center
                  class=""
                >
                  Após a conclusão e entrega do projeto, os participantes poderão avaliar um ao outro.
                </v-flex>
              </v-card-text>
            </v-card>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-layout row align-center style="padding-bottom: 50px;">
        <v-flex
          xs12
          text-xs-center
        >
          <v-btn
            outline
            round
            color="blue darken-1"
            style="width:200px"
            @click="btnClick('encontre')"
          >
            Encontrar projetos
          </v-btn>
          <v-btn
            outline
            round
            color="blue darken-1"
            style="width:200px"
            @click="btnClick('publique')"
          >
            Publicar projetos
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </main>
</template>

<script>
  export default {
    data () {
      return {
        
      }
   },
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

<style lang="scss" scoped>
  .main{
    width: 100%;
  }
  .imagem{
    height: 500px;
    background-image: url(https://www.africarising.tv/wp-content/uploads/2017/03/African-stock-video-of-a-white-caucasian-photographer-or-graphic-designer-working-on-his-laptop.jpg);
    background-attachment: fixed; 
    background-position: center 0px;
    background-size: 100vw 700px;
  }
  .titulo{
    font-family: 'Open Sans', 'sans-serif';
    font-weight: 600;
    font-size: 50px;
    text-shadow: -3px 3px 3px #000000d0;
    color: #FFF;
  }
  .slogan{
    font-family:'Raleway', 'sans-serif';
    font-size: 25px;
    color: #FFF;
    font-weight: lighter;
    text-shadow: -3px 3px 3px #000000d0;

  }
  .como-funciona{
    color: #575757;
    font-family: 'Ranga', 'sans-serif';
    font-size: 50px;
  }
  .etapa{
    height: auto;
    width: 22%;
    border-radius: 30px;
    padding: 15px;
    background-color: #FFFFFF;
  }
  .titulo-etapa{
    padding: 5px 15px 0px 15px;
    font-weight: bold;
    color: #575757;
  }
  .fas{
    font-size: 50px;
    color: #1976D2;
  }
</style>

<style lang="scss" scoped>
  .fadeIn{
    -moz-animation: fadein 2s; /* Firefox */
    -webkit-animation: fadein 2s; /* Safari and Chrome */
    -o-animation: fadein 2s; /* Opera */
  }

  @keyframes fadein {
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
  @-moz-keyframes fadein { /* Firefox */
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
  @-webkit-keyframes fadein { /* Safari and Chrome */
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
  @-o-keyframes fadein { /* Opera */
    from {
      opacity:0;
    }
    to {
      opacity: 1;
    }
  }
</style>