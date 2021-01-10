import { mapState, mapMutations } from "vuex";
// import _ from 'lodash'
import axios from 'axios'
// import moment from 'moment'

const myPlugin = {
  install(Vue) {
    Vue.mixin({
      data: () => ({
        api: process.env.VUE_APP_URL,
        api2: process.env.VUE_APP_URL2,
        front: process.env.VUE_APP_URL3,
      }),

      computed: {
        ...mapState(["userInfo", "selectedRule"]),


        isLeader() {
          let leader = [
            "Japanese Advisor",
            "Department In-Charge",
            "Department Head Trainee",
            "Department Head",
          ];
          if (leader.includes(this.userInfo.designation)) {
            return true;
          } else {
            return false;
          }
        },
      },
      methods: {
        alert(val) {
          alert(val);
        },
        ...mapMutations(["ADD_INFO", "CHANGE_ITEM"]),
        deleteInfo: function() {
          this.ADD_INFO("a");
          this.$router.push("/login");
          this.$store.commit('AUTH_SUCCESS', [])
        },
        selectRule: function(val) {
          this.CHANGE_ITEM(val);
          this.$router.push("/modify");
        },

        backHome() {
          this.$router.push("/");
          location.reload();
        },
        backToAll() {
          this.$router.push("/rules");
        },
      },
      filters: {},
    });
  },
  mounted(){
    axios.defaults.headers.common['x-api-key'] = 'H8Pt5n6cbFk95UiXQjwZ9cwu6mcZqfF2rTw3HeS3';
  }
};

export default myPlugin;
