<template>
  <v-container>
    <!-- <v-text-field v-model="LINKSSSS"></v-text-field> -->
    <!-- {{$route.params}} -->
    <v-flex>
      <v-card class="scroll" height="800">
        <v-toolbar dense>
          <v-toolbar-title>{{viewedRule._id}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <template
            v-if="!viewedRule.isApproved && this.userInfo.designation === 'Japanese Advisor'"
          >
            <v-tooltip bottom>
              <v-icon large slot="activator" @click="approvedDialog = true">playlist_add_check</v-icon>
              <span>Approved Document</span>
            </v-tooltip>
          </template>
          <v-tooltip bottom>
            <v-icon large slot="activator" @click="historyDialog = true">art_track</v-icon>
            <span>View History</span>
          </v-tooltip>
        </v-toolbar>
        <v-layout pt-4 row wrap>
          <template>
            <v-flex xs12>
              <v-btn round flat>
                メール アドレス:&nbsp;&nbsp;
                <span>{{viewedRule.data[viewedRule.version -1].MailAddress}}</span>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn round flat>
                製品区分&nbsp;-&nbsp;
                <span>{{viewedRule.data[viewedRule.version -1].SeihinKubun}}</span>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn round flat>
                担当&nbsp;-&nbsp;
                <span>{{viewedRule.data[viewedRule.version -1].Tantou}}</span>
              </v-btn>
            </v-flex>

            <v-flex xs3>
              <v-btn round flat>
                担当 部署:&nbsp;&nbsp;
                <span>{{viewedRule.data[viewedRule.version -1].TantouBusho}}</span>
              </v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn round flat>
                適用区分&nbsp;-&nbsp;
                <span>{{viewedRule.data[viewedRule.version -1].TekiyouKubun}}</span>
              </v-btn>
            </v-flex>
            <!-- row2****************************************************************** -->
            <v-flex xs2>
              <v-btn round flat>
                <v-icon v-if="viewedRule.data[viewedRule.version -1].YumeNoIe">check_circle_outline</v-icon>
                <v-icon v-else>close</v-icon>&nbsp;夢の家
              </v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn round flat>
                <v-icon v-if="viewedRule.data[viewedRule.version -1].Ippan">check_circle_outline</v-icon>
                <v-icon v-else>close</v-icon>&nbsp;一般
              </v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn round flat>
                <v-icon v-if="viewedRule.data[viewedRule.version -1].Taishin">check_circle_outline</v-icon>
                <v-icon v-else>close</v-icon>&nbsp;耐震
              </v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn round flat>
                <v-icon v-if="viewedRule.data[viewedRule.version -1].Menshin">check_circle_outline</v-icon>
                <v-icon v-else>close</v-icon>&nbsp;免震
              </v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn round flat>
                <v-icon v-if="viewedRule.data[viewedRule.version -1].Icube">check_circle_outline</v-icon>
                <v-icon v-else>close</v-icon>&nbsp;Icube
              </v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn round flat>
                <v-icon v-if="viewedRule.data[viewedRule.version -1].Ismart">check_circle_outline</v-icon>
                <v-icon v-else>close</v-icon>&nbsp;Ismart
              </v-btn>
            </v-flex>
            <!-- row3****************************************************************** -->
            <v-flex xs12>
              <v-layout pl-4>
                <p
                  style="font-size: 18px;"
                >件名: &nbsp; {{viewedRule.data[viewedRule.version -1].RuleKenmei}}</p>
              </v-layout>
              <br />
              <hr />
            </v-flex>
            <v-flex
              xs12
              v-for="(item, index) in viewedRule.data[viewedRule.version -1].content"
              :key="index"
            >
              <v-card flat>
                <v-card-text class="fr-view" v-html="item"></v-card-text>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "newPage",
  props: ["search"],
  data() {
    return {
      LINKSSSS: "",
      pdfNo: "",
      viewedRule: [],
    };
  },
  created() {
    // this.LINKSSSS = window.location.href;
    // // console.log("The URL of this page is: " + this.LINKSSSS);
    // this.pdfNo = this.LINKSSSS.split("=")[1];
    // // console.log(this.pdfNo)
    let url = `${this.api}get/this/${this.search}`;
    // console.log(url);
    axios.get(url).then((res) => {
      this.viewedRule = res.data;
    });
    console.log(this.$route.query.search);
    console.log(this.$route.params.id);
  },
};
</script> 