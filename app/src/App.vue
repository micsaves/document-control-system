<template>
  <v-app id="inspire">
    <!-- <div id="hidePrint"> -->
    <v-toolbar flat app v-if="$router.currentRoute.name != 'login'">
      <v-layout row wrap>
        <v-flex xs9>
          <v-layout pt-3>
            <v-toolbar-title>
              <img src="/rule.ico" width="35" height="25" />
              <span style="color: #1565c0">Rulebook</span>
              Document Control System
            </v-toolbar-title>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-icon style="color: #1565c0" left slot="activator" @click="backHome()"
          >mdi-home</v-icon
        >
        <span>Return to home</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-icon
          style="color: #1565c0"
          v-if="
            userInfo.employee_code == 'japanese' ||
            userInfo.employee_code == '00136'
          "
          left
          slot="activator"
          @click="backToAll()"
          >mdi-pencil-outline</v-icon
        >
        <span>Update Documents</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-icon
          style="color: #1565c0"
          v-if="
            userInfo.employee_code == 'japanese' ||
            userInfo.employee_code == '00136'
          "
          left
          slot="activator"
          @click="showInfo()"
          >info</v-icon
        >
        <span>Status Counter</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-icon style="color: #1565c0" slot="activator" @click="deleteInfo"
          >exit_to_app</v-icon
        >
        <span>Logout</span>
      </v-tooltip>
    </v-toolbar>
    <!-- </div> -->

    <v-content>
      <router-view />
    </v-content>
    <!-- <v-dialog max-width="500" v-model="infoDialog">
      <v-card>
        <v-toolbar flat dense>
          <v-toolbar-title>Summary</v-toolbar-title>
        </v-toolbar>
        <BarChart></BarChart>
      </v-card>
    </v-dialog>-->
  </v-app>
</template>

<script>
import axios from "axios";
// import BarChart from "./views/StatusCounter";
export default {
  name: "App",

  data() {
    return {
      avatar: "favicon.ico",
      infoDialog: false,
      counter: {},
      masters: [
        { title: "AllRules", to: "/rules" },
        { title: "Account", to: "/account" },
      ],
    };
  },
  components: {
    // BarChart,
  },
  methods: {
    getCount() {
      // let url = `${this.api}counter`;
      // axios.get(url).then((res) => {
      //   this.counter = res.data;
      // });
    },

    showInfo() {
      this.getCount();
      this.infoDialog = true;
    },
  },
  computed: {},
  mounted() {
    // clearContent()
  },
};
</script>

<style>
* :not(.v-icon, .fa) {
  font-family: "MS PGothic", Osaka, Arial, sans-serif;
}

/* i.fa {
    font-family: FontAwesome!important;
} */

.smallerH {
  font-size: 15px;
}
/* .v-dialog{
    position: absolute;
    bottom: 0;
    right: 0;
} */

.fr-view {
  font-family: "MS PGothic", Osaka, Arial, sans-serif;
  font-size: 18px;
}

a[href="https://www.froala.com/wysiwyg-editor?k=u"]
{
  position: absolute;
  top: -99999999px;
}

.dialog {
  position: absolute;
  bottom: 0;
  right: 0;
}

.scroll {
  overflow-y: auto;
}

/* .v-dialog .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
} */

#myTable {
  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: auto;
}
#app {
  text-align: left;
}
/* @media only print {
  body {
    margin: 0mm;
    padding: 0mm;
  }
  .hidePrint {
    display: none !important;
  }
} */
</style>
