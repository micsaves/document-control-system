<template>
  <v-container fluid class="pt-0">
    <v-toolbar flat dense color="#FAFAFA">
      <v-spacer></v-spacer>

      <v-btn dark color="primary" @click="openFeedBackDialog()" style="width:120px">
        <span class="pl-3">COMPOSE</span>
        <v-icon class="ml-1" color="white" left>mdi-message-text-outline</v-icon>
      </v-btn>
    </v-toolbar>

    <template v-for="(items,i) in feedbackDetails.comments">
      <a-row :key="i" type="flex" justify="start" color="primary">
        <a-col :span="1">
          <a-avatar icon="user" :key="i" />
        </a-col>
        <a-col :span="23">
          <v-card :key="i" class="rounded-card" color="#e9f7f6">
            <v-card-title dense class="ma-0 pa-0">
              <span class="pa-2" style="font-weight:bold">{{items.feedbackBy}} :</span>
              <v-spacer></v-spacer>
              <span class="pa-2">Date Posted : {{items.feedbackDetailsDate}}</span>&emsp;
              <v-icon
                :disabled="userInfo.full_name == items.feedbackBy ? false : true"
                color="green"
                @click="editRec(items,items.index)"
              >mdi-pencil-outline</v-icon>&emsp;
              <v-icon
                :disabled="userInfo.full_name == items.feedbackBy ? false : true"
                color="pink"
                @click="deleteRec(items,i)"
              >mdi-close-circle</v-icon>
            </v-card-title>
            <div id="p" class="mr-2">
              <p id="p2" v-html="items.feedbackDetails"></p>
            </div>

            <v-card-actions>
              <v-icon>mdi-account-supervisor</v-icon>&emsp;
              <v-text-field
                :disabled="userInfo.employee_code == '35339' || userInfo.employee_code == '36822' ? false : true"
                v-model="items.feedbackAnswer"
              ></v-text-field>

              <!-- <v-spacer></v-spacer> -->
              <span
                class="pa-2"
                v-if="items.feedbackAnswerDate"
              >Date Replied : {{items.feedbackAnswerDate}}</span>
              &emsp;
              <v-icon
                style="width:50px"
                :disabled="userInfo.employee_code == '35339' || userInfo.employee_code == '36822' ? false : true"
                color="primary"
                @click="replyRec(items,i)"
              >mdi-comment-arrow-right-outline</v-icon>
            </v-card-actions>
          </v-card>
        </a-col>
      </a-row>
    </template>

    <v-dialog v-model="feedbackDialog">
      <v-card>
        <v-card-actions>
          <v-card-title
            style="font-weight:bold; font-size:20px"
            class="pa-0 ma-0"
          >Comment, Suggestion, and Feedback</v-card-title>
          <v-spacer></v-spacer>
          <v-icon dark color="primary" @click="feedbackDialog=false">mdi-close-box-outline</v-icon>
        </v-card-actions>

        <vue-editor id="editorHeight" v-model="feedbackEditItem[0].comments[0].feedbackDetails" />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn class="mx-2" color="primary" @click="SaveRec()">
            <span class="pt-1">Save</span>
            <v-icon class="pl-2" color="white">mdi-content-save</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      title_spacer: "　",
      currentDateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
      addRecord: false,
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
        },
      },
      feedbackDialog: false,
      feedbackDetails: {},
      feedbackEditItem: [
        {
          comments: [
            {
              feedbackDetails: "",
              feedbackDetailsDate: "",
              feedbackAnswer: "",
              feedbackAnswerDate: "",
              feedbackBy: "",
              deletedDate: "",
            },
          ],
          documentType: "FEEDBACK",
        },
      ],
    };
  },

  created() {
    this.getData();
  },
  methods: {
    openFeedBackDialog() {
      // this.feedbackEditItem[0].comments[0].feedbackDetails = "";
      (this.feedbackEditItem[0].comments[0] = {
        feedbackDetails: "",
        feedbackDetailsDate: "",
        feedbackAnswer: "",
        feedbackAnswerDate: "",
        feedbackBy: "",
        deletedDate: "",
      }),
        (this.addRecord = true);
      this.feedbackDialog = true;
    },
    SaveRec() {
      this.feedbackEditItem._id = this.feedbackDetails._id;
      this.feedbackEditItem._rev = this.feedbackDetails._rev;
      this.feedbackEditItem[0].comments[0].feedbackBy = this.userInfo.full_name;
      this.feedbackEditItem[0].comments[0].feedbackDetailsDate = this.currentDateTime;
      if (this.addRecord) {
        axios
          .post(`${this.api}addFeedBack/`, this.feedbackEditItem[0])
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Message Sent!",
              showConfirmButton: false,
              timer: 750,
            });
            this.getData();
          });
      } else {
        // this.feedbackEditItem[0]._id = this.feedbackDetails._id;
        // this.feedbackEditItem[0]._rev = this.feedbackDetails._rev;
        // this.feedbackEditItem[0].comments[0].feedbackBy = this.userInfo.full_name;
        // this.feedbackEditItem[0].comments[0].feedbackDetailsDate = this.currentDateTime;
        axios
          .post(`${this.api}editFeedBack/`, this.feedbackEditItem[0])
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Update Successfully!",
              showConfirmButton: false,
              timer: 750,
            });
            this.getData();
          });
      }
      this.feedbackDialog = false;
    },

    replyRec(val, index) {
      // let date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
      this.feedbackDetails.comments[index] = val;
      this.feedbackDetails.comments[
        index
      ].feedbackAnswerDate = this.currentDateTime;
      axios.post(`${this.api}editFeedBack/`, this.feedbackDetails).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message Sent!",
          showConfirmButton: false,
          timer: 750,
        });
        this.getData();
      });
    },

    editRec(val, index) {
      this.addRecord = false;
      this.feedbackDialog = true;
      this.feedbackEditItem[0].comments[0] = this.feedbackDetails.comments.filter(rec=>{
        return rec.index == index
      })[0]
    },

    deleteRec(val, index) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.value) {
          this.feedbackEditItem[0] = this.feedbackDetails;
          this.feedbackEditItem[0]._id = this.feedbackDetails._id;
          this.feedbackEditItem[0]._rev = this.feedbackDetails._rev;
          this.feedbackEditItem[0].comments[
            index
          ].deletedDate = this.currentDateTime;

          axios
            .post(`${this.api}editFeedBack/`, this.feedbackEditItem[0])
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.getData();
            });
        }
      });
    },

    getData() {
      this.feedbackDetails = [];
      axios.get(`${this.api}get/feedback`).then((res) => {
        this.feedbackDetails = res.data
        this.feedbackDetails.comments = this.feedbackDetails.comments.map((rec,index)=>{
          rec.index = index
          return rec
        });
        // console.log(this.feedbackDetails.comments )
         this.feedbackDetails.comments = this.feedbackDetails.comments.reverse()
        
      });
    },
  },
};
</script>

<style>
#editorHeight {
  height: 300px;
  margin-left: 0%;
  margin-right: 0%;
  margin-bottom: 0%;
}

.rounded-card {
  border-radius: 15px;
  margin-bottom: 5px;
}

#p {
  margin-left: 8px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}

#p2 {
  margin: 5px;
}

#goRight {
  right: 100%;
}
</style>