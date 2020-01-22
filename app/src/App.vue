<template>
  <v-app id="app">
    <Popup :dialog.sync="dialogLogin" />
    <global />
    <header-app class="header" />
    <router-view class="view" />
    <Footer class="footer" />
  </v-app>
</template>

<script>
import HeaderApp from './views/Header'
import Popup from './views/Popup'
import Global from './views/GlobalComponents'
import Footer from './views/Footer'

export default {
  components: {
    HeaderApp,
    Popup,
    Global,
    Footer
  },
  data(){
    return{
      dialogLogin: false,
    }
  },
  created(){
    
  }
}
</script>

<style lang="scss">

#app{
  background-attachment: fixed; 
  background-image: url(https://i.redd.it/cdfz5g8yfymz.png);
  background-position: center center;
  background-size: 100% 100%;
  min-width: 750px;
}
*{
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
}

.view{
  min-height: calc(100vh - 90px);
}

</style>
