<template>
  <v-container fluid pa-4>
    <v-layout v-if="error != null" row wrap>
      <v-flex xs12 sm12 md12>
        <template>
          <v-alert :value="true" type="error">{{ error }}</v-alert>
        </template>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center>
      <!-- <v-flex offset-xs4 pt-12> -->
      <v-card class="elevation-8" height="500" width="400" style="align:center;">
        <br />

        <br />
        <v-divider color="black"></v-divider>
        <img src="/logo.png" class="responsive" />
        <v-divider color="black"></v-divider>
        <br />
        <!-- <br /> -->

        <v-card-text>
          <v-form>
            <v-text-field
              autofocus
              prepend-inner-icon="mdi-account"
              name="login"
              label="Mail Address"
              type="text"
              @change="getInfo()"
              v-model="mailAddress"
              color="blue-grey darken-1"
            ></v-text-field>

            <v-text-field
              @keyup.enter="go()"
              id="password"
              prepend-inner-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              v-model="userPass"
              color="blue-grey darken-1"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <!-- <br /> -->
        <v-card-actions>
          <!-- <span>Guest account(guest/guest)</span> -->
          <v-btn color="#455A64" @click.prevent="go()" dark block>
            <v-icon>mdi-logout</v-icon>Login
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Login",
  data() {
    return {
      mailAddress: "",
      userPass: "",
      reqInfo: null,
      error: null,
      // api: process.env.VUE_APP_URL,
    };
  },
  computed: {},
  created(){
      
  },
  methods: {
    getInfo: function () {
      // if()
      if(this.mailAddress.includes('@')){
        let index = this.mailAddress.indexOf('@')
        // console.log('index',index)
        let cnd = this.mailAddress.substring(index,this.mailAddress.length)
        // console.log(cnd)
        if(cnd!='@hrd-s.com' && cnd!='@ichijo.co.jp' && cnd!='@ichijousa.com'){
            Swal.fire({
            icon: "error",
            title: "Invalid Mail Address!",
            showConfirmButton: false,
            timer: 1500,
            // text: "Please Generate First !!",
          });
          this.mailAddress = ''
        }
      }
      else {
         Swal.fire({
            icon: "error",
            title: "Invalid Mail Address!",
            showConfirmButton: false,
            timer: 1500,
            // text: "Please Generate First !!",
          });
          this.mailAddress = ''
      }
    },
    go: function () {
          let url = `${this.api}getUser/${this.mailAddress}/${this.userPass}`;
      axios.defaults.headers.common["x-api-key"] =
          "H8Pt5n6cbFk95UiXQjwZ9cwu6mcZqfF2rTw3HeS3";
      axios.get(url).then((res) => {
        if(res.data!='error'){
        this.$store.commit('AUTH_SUCCESS', res.data.accessToken)
        this.$router.push('/')
        // console.log('test')
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Invalid Password!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.userPass =''
        }
      })
      
    },
  },
};
</script>
<style  scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.responsive {
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>