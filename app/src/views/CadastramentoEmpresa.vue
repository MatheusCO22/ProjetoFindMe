<template>
  <v-container>
    <v-card
      flat
      color="rgba(255, 255, 255, 0.8)"
      class="rounded-card"
    >
      <v-card-text flat>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="submit"
        >
          <v-container
            grid-list-xl
            fluid
            class="container-texts"
          >
            <v-flex
              xs12
              text-xs-center
            >
              <v-avatar
                size="180"
                color="blue-grey lighten-4"
                class="foto"
                @click="photoPicker()"
              >
                <v-layout
                  v-if="!fotoUrl"
                  column
                  justify-center
                  fill-height
                >
                  <i class="fas fa-user" />
                </v-layout>  
                <img
                  v-if="fotoUrl" 
                  :src="fotoUrl"
                  alt="20px"
                >
              </v-avatar>
              <p class="adc-foto">
                Escolha uma foto de perfil
              </p>
            </v-flex>
            <input 
              ref="fotoInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="imagemEscolhida"
            >
            <v-spacer />
            <v-layout wrap>
              <v-flex
                xs12
                sm6
              >
                <v-text-field
                  ref="nome"
                  v-model="form.nome"
                  label="Nome / Razão Social"
                  placeholder="Nome / Razão Social"
                  color="#1867C0"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-text-field
                  id="email"
                  ref="email"
                  v-model="form.email"
                  label="E-Mail"
                  placeholder="exemplo@email.com"
                  color="#1867C0"
                  :rules="[rules.email]"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-text-field
                  id="cnpj"
                  v-model="form.cnpj"
                  label="CNPJ"
                  placeholder="12.345.678/9000-00"
                  color="#1867C0"
                  mask="##.###.###/####-##"
                  :rules="[rules.cnpj]"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-text-field
                  id="fone"
                  v-model="form.fone"
                  label="Telefone"
                  placeholder="(XX) xxxx-xxxx"
                  color="#1867C0"
                  mask="(##) #####-####"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-text-field 
                  v-model="form.password"
                  label="Senha"
                  hint="Pelo menos 6 caracteres"
                  color="#1867C0"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :type="show1 ? 'text' : 'password'"
                  :rules="[rules.required, rules.min]"
                  counter
                  @click:append="show1 = !show1"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-text-field
                  id="confirm-password"
                  v-model="form.confirmPassword"
                  label="Confirmar senha"
                  color="#1867C0"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :error-messages=" compararSenha"
                  :type="show1 ? 'text' : 'password'"
                  counter
                  @click:append="show1 = !show1"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-autocomplete
                  v-model="form.area"
                  label="Área de Atuação"
                  placeholder="Área de Atuação"
                  color="#1867C0"
                  :rules="[rules.required]"
                  :items="areas"
                />
              </v-flex>
              <v-flex
                xs12
                sm6
              >
                <v-autocomplete
                  ref="country"
                  v-model="form.estado"
                  color="#1867C0"
                  :rules="[rules.required]"
                  :items="estados"
                >
                  <template
                    v-slot:label
                  >
                    <div>
                      UF <small><small> (Estado)</small></small>
                    </div>
                  </template>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  v-model="form.terms"
                  color="#1867C0"
                  :rules="[(v) => !!v || 'Por favor, aceite os termos antes de continuar.']"
                >
                  <template v-slot:label>
                    <div class="texto-check">
                      Você aceita os
                      <a
                        href="javascript:;"
                        @click.stop="terms = true"
                      >termos</a>
                      e
                      <a
                        href="javascript:;"
                        @click.stop="conditions = true"
                      >condições</a>
                      ?
                    </div>
                  </template>
                </v-checkbox>
              </v-flex>
              <v-divider />
            </v-layout>
          </v-container>

          <v-dialog
            v-model="terms"
            width="70%"
          >
            <v-card>
              <v-card-title class="title">
                Terms
              </v-card-title>
              <v-card-text
                v-for="n in 1"
                :key="n"
              >
                <br>O QUE FAREMOS COM ESTA INFORMAÇÃO?
                <br>Quando você realiza alguma transação com nossa loja, como parte do processo de compra e venda, coletamos as informações pessoais que você nos dá tais como: nome, e-mail e endereço.
                Quando você acessa nosso site, também recebemos automaticamente o protocolo de internet do seu computador, endereço de IP, a fim de obter informações que nos ajudam a aprender sobre seu navegador e sistema operacional.
                Email Marketing será realizado apenas caso você permita. Nestes emails você poderá receber notícia sobre nosso site, novos produtos e outras atualizações.              
                <br>
                <br>
                CONSENTIMENTO
                <br>Como vocês obtêm meu consentimento?
                Quando você fornece informações pessoais como nome, telefone e endereço, para completar: uma transação, verificar seu cartão de crédito, fazer um pedido, providenciar uma entrega ou retornar uma compra. Após a realização de ações entendemos que você está de acordo com a coleta de dados para serem utilizados pela nossa empresa.
                Se pedimos por suas informações pessoais por uma razão secundária, como marketing, vamos lhe pedir diretamente por seu consentimento, ou lhe fornecer a oportunidade de dizer não.
                E caso você queira retirar seu consentimento, como proceder?
                Se após você nos fornecer seus dados, você mudar de ideia, você pode retirar o seu consentimento para que possamos entrar em contato, para a coleção de dados contínua, uso ou divulgação de suas informações, a qualquer momento, entrando em contato conosco em matheus.puehler@gmail.com ou nos enviando uma correspondência em: matheus.puehler@gmail.com
                <br>
                <br>
                DIVULGAÇÃO
                <br> Podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.
                <br>
                <br>
                SERVIÇOS DE TERCEIROS
                <br>No geral, os fornecedores terceirizados usados por nós irão apenas coletar, usar e divulgar suas informações na medida do necessário para permitir que eles realizem os serviços que eles nos fornecem.
                Entretanto, certos fornecedores de serviços terceirizados, tais como gateways de pagamento e outros processadores de transação de pagamento, têm suas próprias políticas de privacidade com respeito à informação que somos obrigados a fornecer para eles de suas transações relacionadas com compras.
                Para esses fornecedores, recomendamos que você leia suas políticas de privacidade para que você possa entender a maneira na qual suas informações pessoais serão usadas por esses fornecedores.
                Em particular, lembre-se que certos fornecedores podem ser localizados em ou possuir instalações que são localizadas em jurisdições diferentes que você ou nós. Assim, se você quer continuar com uma transação que envolve os serviços de um fornecedor de serviço terceirizado, então suas informações podem tornar-se sujeitas às leis da(s) jurisdição(ões) nas quais o fornecedor de serviço ou suas instalações estão localizados.
                Como um exemplo, se você está localizado no Canadá e sua transação é processada por um gateway de pagamento localizado nos Estados Unidos, então suas informações pessoais usadas para completar aquela transação podem estar sujeitas a divulgação sob a legislação dos Estados Unidos, incluindo o Ato Patriota.
                Uma vez que você deixe o site da nosso site ou seja redirecionado para um aplicativo ou site de terceiros, você não será mais regido por essa Política de Privacidade ou pelos Termos de Serviço do nosso site.
                Links
                Quando você clica em links na nosso site, eles podem lhe direcionar para fora do nosso site. Não somos responsáveis pelas práticas de privacidade de outros sites e lhe incentivamos a ler as declarações de privacidade deles.
                <br>
                SEGURANÇA
                <br>
                <br> Para proteger suas informações pessoais, tomamos precauções razoáveis e seguimos as melhores práticas da indústria para nos certificar que elas não serão perdidas inadequadamente, usurpadas, acessadas, divulgadas, alteradas ou destruídas.
                Usando sempre um banco de dados seguro, com criptografia de todos os dados fornecidos
              </v-card-text>
              <v-divider />  
              <v-card-actions>
                <v-spacer />
                <v-btn
                  flat
                  color="purple"
                  @click="terms = false"
                >
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="conditions"
            width="70%"
          >
            <v-card>
              <v-card-title class="title">
                Conditions
              </v-card-title>
              <v-card-text
                v-for="n in 1"
                :key="n"
              >
                <br>  O QUE FAREMOS COM ESTA INFORMAÇÃO?
                <br>Quando você realiza alguma função em noso site, como parte do processo, coletamos as informações pessoais que você nos dá tais como: nome, e-mail e endereço.
                Quando você acessa nosso site, também recebemos automaticamente o protocolo de internet do seu computador, endereço de IP, a fim de obter informações que nos ajudam a aprender sobre seu navegador e sistema operacional.
                Email Marketing será realizado apenas caso você permita. Nestes emails você poderá receber notícia sobre nosso site, novos produtos e outras atualizações.              
                <br>
                <br>
                CONSENTIMENTO
                <br>Como vocês obtêm meu consentimento?
                Quando você fornece informações pessoais como nome, telefone e endereço, para completar: uma transação, verificar seu cartão de crédito, fazer um pedido, providenciar uma entrega ou retornar uma compra. Após a realização de ações entendemos que você está de acordo com a coleta de dados para serem utilizados pela nossa empresa.
                Se pedimos por suas informações pessoais por uma razão secundária, como marketing, vamos lhe pedir diretamente por seu consentimento, ou lhe fornecer a oportunidade de dizer não.
                E caso você queira retirar seu consentimento, como proceder?
                Se após você nos fornecer seus dados, você mudar de ideia, você pode retirar o seu consentimento para que possamos entrar em contato, para a coleção de dados contínua, uso ou divulgação de suas informações, a qualquer momento, entrando em contato conosco em matheus.puehler@gmail.com ou nos enviando uma correspondência em: matheus.puehler@gmail.com
                <br>
                <br>
                DIVULGAÇÃO
                <br> Podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.
                <br>
                <br>
                SERVIÇOS DE TERCEIROS
                <br>No geral, os fornecedores terceirizados usados por nós irão apenas coletar, usar e divulgar suas informações na medida do necessário para permitir que eles realizem os serviços que eles nos fornecem.
                Entretanto, certos fornecedores de serviços terceirizados, tais como gateways de pagamento e outros processadores de transação de pagamento, têm suas próprias políticas de privacidade com respeito à informação que somos obrigados a fornecer para eles de suas transações relacionadas com compras.
                Para esses fornecedores, recomendamos que você leia suas políticas de privacidade para que você possa entender a maneira na qual suas informações pessoais serão usadas por esses fornecedores.
                Em particular, lembre-se que certos fornecedores podem ser localizados em ou possuir instalações que são localizadas em jurisdições diferentes que você ou nós. Assim, se você quer continuar com uma transação que envolve os serviços de um fornecedor de serviço terceirizado, então suas informações podem tornar-se sujeitas às leis da(s) jurisdição(ões) nas quais o fornecedor de serviço ou suas instalações estão localizados.
                Como um exemplo, se você está localizado no Canadá e sua transação é processada por um gateway de pagamento localizado nos Estados Unidos, então suas informações pessoais usadas para completar aquela transação podem estar sujeitas a divulgação sob a legislação dos Estados Unidos, incluindo o Ato Patriota.
                Uma vez que você deixe o site da nosso site ou seja redirecionado para um aplicativo ou site de terceiros, você não será mais regido por essa Política de Privacidade ou pelos Termos de Serviço do nosso site.
                Links
                Quando você clica em links na nosso site, eles podem lhe direcionar para fora do nosso site. Não somos responsáveis pelas práticas de privacidade de outros sites e lhe incentivamos a ler as declarações de privacidade deles.
                <br>
                SEGURANÇA
                <br>
                <br> Para proteger suas informações pessoais, tomamos precauções razoáveis e seguimos as melhores práticas da indústria para nos certificar que elas não serão perdidas inadequadamente, usurpadas, acessadas, divulgadas, alteradas ou destruídas.
                Usando sempre um banco de dados seguro, com criptografia de todos os dados fornecidos
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  flat
                  color="purple"
                  @click="conditions = false"
                >
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-card-actions>
            <v-btn
              color="red"
              class="white--text"
              fab
              @click="resetForm"
            >
              <i class="fas fa-times" />
            </v-btn>

            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="green"
              class="white--text"
              type="submit"
              fab
            >
              <i class="fas fa-check" />
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase'
  export default {
      data () {
        const defaultForm = Object.freeze({
          nome: '', email: '', cnpj: '', fone:'', school: '',
          curso: '', password:'', confirmPassword:'', estado:'',
          birth: new Date().toISOString().substring(0,10),
          terms: false, type:'empresa'    
        })

      return {
        valid:false,
        estados:[
          'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA',
          'PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'
        ],
        areas:[
          'Programação', 'Design', 'Mecânica', 'Eletrônica', 'Edificações', 'Publicidade', 'Economia'
        ],
        menu2: false, show2: true, show1:false,

        form: Object.assign({}, defaultForm),
        rules: {
          required: value => !!value || 'Campo obrigatório',
          email : value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'E-Mail inválido.'
          },
          min: v => v.length >= 6 || 'Min 6 characters',
          cnpj: v => this.testaCNPJ(v) || 'CNPJ inválido.',
        },
        conditions: false,
        snacksucesso: false,
        snackerro: false,
        terms: false,
        fotoUrl: '', imagemFirebase: ''
      }
    },
    computed: {
        compararSenha () {
            return this.form.password !== this.form.confirmPassword ? 'As senhas não são iguais' : ''
        }
    },

    methods: {
      photoPicker(){
        console.log('chegou')
        this.$refs.fotoInput.click()
      },
      	imagemEscolhida(event){
				const storage = firebase.storage();
				const storageRef = storage.ref();
        console.log('entrouuuu')

        const imagem=event.target.files
        let photoName=imagem[0].name
				console.log(photoName)
				
				if(photoName.lastIndexOf('.')<=0){
					
          return alert ('Selecione um arquivo válido')
				}
        const leitorFoto = new FileReader()
        leitorFoto.addEventListener('load', () =>{
          this.fotoUrl=leitorFoto.result
          console.log(this.fotoUrl)
        })
        leitorFoto.readAsDataURL(imagem[0])
        console.log('aqui chegaste')
        this.imagemFirebase=imagem[0]
			},
      testaCNPJ(cnpj) {
        if(cnpj.length == 14){
          var tamanho;
          var numeros;
          var digitos;
          var soma;
          var pos;
          var resultado;
         
          if (cnpj == "00000000000000" || 
              cnpj == "11111111111111" || 
              cnpj == "22222222222222" || 
              cnpj == "33333333333333" || 
              cnpj == "44444444444444" || 
              cnpj == "55555555555555" || 
              cnpj == "66666666666666" || 
              cnpj == "77777777777777" || 
              cnpj == "88888888888888" || 
              cnpj == "99999999999999"){
                return false;
          }

          tamanho = cnpj.length - 2;
          numeros = cnpj.substring(0,tamanho);
          digitos = cnpj.substring(tamanho);
          soma = 0;
          pos = tamanho - 7;
          var i;
          for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2){
              pos = 9;
            }
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0)){
            return false;
          }
          tamanho = tamanho + 1;
          numeros = cnpj.substring(0,tamanho);
          soma = 0;
          pos = tamanho - 7;
          for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2){
              pos = 9;
            }
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1)){
            return false;
          }     
          return true;
        }
    },
      formattedDate(date) {
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
    
      submit () {
        const { 
          nome,
          email,
          cnpj,
          fone,
          password,
          area,
          estado
        } = this.form

        const user = { 
          nome,
          email,
          cnpj,
          fone,
          password,
          area,
          estado,
          type: 'empresa'
        }

          this.$store.dispatch('signUserUp', user).then(()=>{
          return this.uploadFiles(user.email)
          this.resetForm()
          this.$router.push('/publique')
          this.$parent.$children[1].openSnack('success','Cadastro concluído!')
         },
          err=>{
            if(err.code =='auth/email-already-in-use'){
              this.$parent.$children[1].openSnack('error','Email em uso!')
             }
          })
      },
      uploadFiles(email){
        console.log("CHEGGGOOOOOOUUUUU")
        const imgRef = firebase.storage().ref('users/'+email+'/'+'image')
        const imagePromise = imgRef.put(this.imagemFirebase).then(() => {
          console.log("foto upada")
          this.$parent.$children[2].atualizarImagem()
        })
        return Promise.all([imagePromise])
      }
      }
  }
</script>

<style lang="scss" scoped>
  .texto-check{
    font-weight:bold ;
  }
  .fas{
    font-size: 35px;
  }
  .container-texts{
      background-color: rgba(255, 255, 255, 0);
  }
  .bg{
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-image: url("https://www.stcqa.com/wp-content/uploads/2018/03/Website-Design-Background.jpg");
    background-size: 100% 100%; 
  }
  .rounded-card{
    border-radius: 30px;
  }
  .foto{
    transition: ease 0.2s;
    cursor:pointer;
    &:hover{
      transition: ease 0.2s;
      box-shadow: 0px 1px 15px rgba(0,0,0,100);
    }
  }
  .adc-foto{
    margin-top: 10px;
    font-family: 'Raleway', 'sans-serif';
    font-size: 15px;
  }
  .fas.fa-user{
    color: #546E7A;
    font-size: 45px;
  }
</style>