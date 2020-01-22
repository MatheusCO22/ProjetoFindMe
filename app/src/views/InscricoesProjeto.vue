<template>
  <v-container>
    <v-card
      flat
      color="rgba(255, 255, 255, 0.8)"
      class="rounded-card"
      style="border-radius:25px"
    >
      <v-card
        v-for="inscricao in inscricoes"
        :key="inscricao.id"
        flat
        color="rgba(255, 255, 255, 0.8)"
        class="card-projeto"
      >
        <v-card-text
          class="project-container"
          flat
        >
          <v-layout
            align-center
            justify-center
            row
          >
            <v-layout wrap>
              <v-layout row>
                <v-flex xs12>
                  <h4
                    class="router"
                    style="cursor: pointer"
                    @click="redirecionar(inscricao.user)"
                  >
                    {{ inscricao.userName }}
                  </h4>
                </v-flex>
                <v-flex text-xs-right>
                  <v-menu
                    bottom
                    center
                  />
                </v-flex>
              </v-layout>
              <v-flex xs12>
                {{ inscricao.motivo }}
              </v-flex>
            </v-layout>
          </v-layout>
        </v-card-text>
        <v-divider />
      </v-card>
    </v-card>
  </v-container>
</template>


<script>
export default {
    data(){
		return{
         inscricoes:[],
         noneInscritos: 'true'
    }
  },
  created(){
    const idProjeto=this.$route.params.id
    const {db}= this.$store.state
    console.log(idProjeto)

       db.collection('inscricoes').get().then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
          const inscricao  = {
            'id':doc.id,
            'user' : doc.data().user,
            'project' : doc.data().project.id,
            'motivo' : doc.data().motivo,
            'userName' : ''
          }

           db.collection('users').doc(inscricao.user).get().then((userDoc)=>{
            console.log(userDoc.data().nome)
            inscricao.userName = userDoc.data().nome
          })

        if(doc.data().project.id == idProjeto){
            this.noneInscritos=false
            this.inscricoes.push(inscricao)
            console.log(' ')
            console.log('Inscrição: ' +doc.id)
            console.log('User: ' +doc.data().user)
            console.log('Projeto: ' +doc.data().project.id)
            console.log('Motivo: ' +doc.data().motivo)
        }
        })
        })



  },
  methods: {
    redirecionar(idUser){
      console.log('CHEGOU: '+idUser)
       this.$router.push('/estudante/'+idUser)
    }
  }  
}
</script>

<style scoped>
.router{
  font-size: 15px !important; 
  text-decoration: none;
      transition: ease 0.4s;
      color:	#3498db;
      



}
</style>
