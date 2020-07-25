<template id="404">
  <div class="master">
    <div class="wrap-banner">
      <v-card class="main-title">
        <v-layout row fill-height>
          <v-layout align-center justify-center column fill-height>
            <v-card-text>
              <v-flex text-xs-center>
                <i class="far fa-frown"></i>
              </v-flex>
              <v-flex text-xs-center>
                <v-btn outline round color="#D9D9D9" @click="$router.push('/')">
                  PÁGINA INICIAL
                </v-btn>
              </v-flex>
            </v-card-text>
          </v-layout>
            <v-divider class="divider" vertical/>
          <v-layout align-center justify-center column fill-height>
            <v-card-text class="erro">
              <v-flex text-xs-center>
                404
              </v-flex>
            </v-card-text>
            <v-card-text  class="erro sub">
              <v-flex text-xs-center>
                Página não encontrada
              </v-flex>
            </v-card-text>
            <v-card-text  class="vazio">
              <v-flex text-xs-center>
                Tudo vazio por aqui...
              </v-flex>
            </v-card-text>
          </v-layout>
        </v-layout>
      </v-card>
      <vue-particles
        color="#FFC00C"
        :particleOpacity="0.7"
        linesColor="#162130"
        :particlesNumber="120"
        shapeType="circle"
        :particleSize="5"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  $cor-principal:#D9D9D9CC;
  .divider{
    border-color: #D9D9D966 !important;
  }
  .debug{
   border: 1px solid red; 
  }
  #header{
    visibility: hidden !important;
  }
  .master {
    margin-top: -70px;
    height: 100vh;
  }
  #particles-js {
    background-color:#162130;
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .wrap-banner {
    position: relative;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    justify-content: center;
  }
  .main-title {
    backdrop-filter: blur(5px);
    min-width: 800px;
    height: 400px;
    background-color: #3e485955 !important;
    color: #fff;
    z-index: 999;
    padding: 30px;
    border-radius: 20px;
  }
  .erro{
    user-select: none;
    color: $cor-principal;
    //text-shadow: #FFFFFF 0px 0px 2px;
    font-size: 160px;
    margin-top: -52px;
    padding:0
  }
  .sub{
    font-weight: bold;
    font-size: 20px;
  }
  .vazio{
    padding: 0;
    color: $cor-principal;
    font-size: 15px;
  }
  .far{
    font-size:140px;
    color: $cor-principal;
    margin-bottom: 10px;
  }
</style>