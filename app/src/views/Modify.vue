<template>
  <v-container fluid pa-0>
    <v-layout v-if="selectedItem" pa-2 row wrap>
      <v-flex xs12>
        <v-card class="scroll" height="800">
          <v-toolbar>
            <v-toolbar-title>
              {{selectedItem._id}}
              <v-btn @click="newWindow(selectedItem._id)" round>
                open
                <v-icon right>picture_as_pdf</v-icon>
              </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="alert(selectedItem.approvalRemarks)" round>
              Remarks
              <v-icon right>info</v-icon>
            </v-btn>
            <v-btn @click="updateDoc()" round>
              Save
              <v-icon right>save</v-icon>
            </v-btn>
            <v-btn @click="backToAll()" round>
              Cancel
              <v-icon>keyboard_return</v-icon>
            </v-btn>
          </v-toolbar>
          <!-- <v-layout v-if="selectedItem.data" pa-2 row wrap> -->
          <a-row type="flex" justify="start" v-if="!editMode">
            <!-- <a-col :span="1"></a-col> -->
            &emsp;
            <a-col :span="3">
              <div style="width:140px">
                <v-select label="構法" :items="methodList" v-model="selectedItem.method"></v-select>
              </div>
            </a-col>
            <a-col :span="3">
              <div style="width:140px">
                <v-select label="区分" :items="criteriaList" v-model="selectedItem.criteria"></v-select>
              </div>
            </a-col>
            <a-col :span="6">
              <div style="width:185px">
                <v-select label="製品区分" :items="productTypeList" v-model="selectedItem.productType"></v-select>
              </div>
            </a-col>
            <a-col :span="5"></a-col>
            <a-col :span="3" class="pt-2">
              <v-btn @click="addOne()" round>
                #content
                <v-icon left>queue</v-icon>
                <span style="font-weight: bold; color: red;">{{countContent}}</span>
              </v-btn>
            </a-col>&emsp;
            <a-col :span="3">
              <v-checkbox v-model="editMode" label="Preview"></v-checkbox>
            </a-col>
          </a-row>
          <v-divider></v-divider>
          <a-row type="flex" justify="end" v-if="editMode">
            <a-col :span="4">
              <v-checkbox v-model="editMode" label="Preview"></v-checkbox>
            </a-col>
          </a-row>
          <!-- <v-flex offset-xs8 v-if="!editMode" xs2>
            <v-btn @click="addOne()" round>
              #content
              <v-icon left>queue</v-icon>
              <span style="font-weight: bold; color: red;">{{countContent}}</span>
            </v-btn>
          </v-flex>

          <v-flex offset-xs8 xs2 v-else></v-flex>-->

          <!-- <v-flex offset-xs8 v-if="!editMode" xs2>
              
            
          </v-flex>-->

          <!-- <v-flex xs2>
            <v-checkbox v-model="editMode" label="Preview"></v-checkbox>
          </v-flex>-->
          <!-- EditMode -->
          <template v-if="!editMode">
            <!-- row1****************************************************************** -->
            <a-row type="flex" justify="start" v-if="!editMode">
              <a-col :span="6">
                <v-text-field
                  outline
                  v-model="selectedItem.data[selectedItem.version -1].SeihinKubun"
                  label="製品区分"
                ></v-text-field>
              </a-col>
              <a-col :span="4">
                <v-text-field
                  outline
                  v-model="selectedItem.data[selectedItem.version -1].Tantou"
                  label="担当"
                ></v-text-field>
              </a-col>
              <a-col :span="6">
                <v-text-field
                  outline
                  v-model="selectedItem.data[selectedItem.version -1].MailAddress"
                  label="メール  アドレス"
                ></v-text-field>
              </a-col>
              <a-col :span="4">
                <v-text-field
                  outline
                  v-model="selectedItem.data[selectedItem.version -1].TantouBusho"
                  label="担当  部署"
                ></v-text-field>
              </a-col>
              <a-col :span="4">
                <v-text-field
                  outline
                  v-model="selectedItem.data[selectedItem.version -1].TekiyouKubun"
                  label="適用区分"
                ></v-text-field>
              </a-col>
            </a-row>
            <!-- <v-flex xs3></v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs3></v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs2></v-flex>-->
            <!-- row2****************************************************************** -->
            <a-row type="flex" justify="start" v-if="!editMode">
              &emsp;
              <a-col :span="4">
                <v-checkbox
                  v-model="selectedItem.data[selectedItem.version -1].YumeNoIe"
                  label="夢の家"
                ></v-checkbox>
              </a-col>
              <a-col :span="4">
                <v-checkbox v-model="selectedItem.data[selectedItem.version -1].Ippan" label="一般"></v-checkbox>
              </a-col>
              <a-col :span="4">
                <v-checkbox v-model="selectedItem.data[selectedItem.version -1].Taishin" label="耐震"></v-checkbox>
              </a-col>
              <a-col :span="4">
                <v-checkbox v-model="selectedItem.data[selectedItem.version -1].Menshin" label="免震"></v-checkbox>
              </a-col>
              <a-col :span="4">
                <v-checkbox
                  v-model="selectedItem.data[selectedItem.version -1].Icube"
                  label="Icube"
                ></v-checkbox>
              </a-col>
              <a-col :span="3">
                <v-checkbox
                  v-model="selectedItem.data[selectedItem.version -1].Ismart"
                  label="Ismart"
                ></v-checkbox>
              </a-col>
            </a-row>

            <v-textarea
              auto-grow
              row-height="15"
              outline
              v-model="selectedItem.data[selectedItem.version -1].RuleKenmei"
              label="件名"
            ></v-textarea>

            <!-- froala****************************************************************** -->
            <v-flex
              v-for="(item, index) in selectedItem.data[selectedItem.version -1].content"
              :key="index"
              xs12
            >
              <hr />
              <br />
              <froala
                style="font-size: 30px; color: 'red';"
                :tag="'textarea'"
                :config="config"
                v-model="selectedItem.data[selectedItem.version -1].content[index]"
                :model.sync="selectedItem.data[selectedItem.version -1].content"
              ></froala>
            </v-flex>

            <v-flex v-if="countContent > 1" xs2 offset-xs10>
              <v-btn @click="delOne()" round>
                content #{{countContent}}
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-flex>
            <!-- <span>{{selectedItem.data[selectedItem.version -1]}}</span> -->
          </template>
          <!-- row1****************************************************************** -->
          <!-- EditMode -->

          <template v-else>
            <a-row type="flex" justify="start">
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  製品区分&nbsp;-&nbsp;
                  <span>{{selectedItem.data[selectedItem.version -1].SeihinKubun}}</span>
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  担当&nbsp;-&nbsp;
                  <span>{{selectedItem.data[selectedItem.version -1].Tantou}}</span>
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  メール アドレス:&nbsp;&nbsp;
                  <span>{{selectedItem.data[selectedItem.version -1].MailAddress}}</span>
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  担当 部署:&nbsp;&nbsp;
                  <span>{{selectedItem.data[selectedItem.version -1].TantouBusho}}</span>
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  適用区分&nbsp;-&nbsp;
                  <span>{{selectedItem.data[selectedItem.version -1].TekiyouKubun}}</span>
                </v-btn>
              </a-col>
            </a-row>

            <a-row type="flex" justify="start">
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  <v-icon
                    v-if="selectedItem.data[selectedItem.version -1].YumeNoIe"
                  >check_circle_outline</v-icon>
                  <v-icon v-else>close</v-icon>&nbsp;夢の家
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  <v-icon
                    v-if="selectedItem.data[selectedItem.version -1].Ippan"
                  >check_circle_outline</v-icon>
                  <v-icon v-else>close</v-icon>&nbsp;一般
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  <v-icon
                    v-if="selectedItem.data[selectedItem.version -1].Taishin"
                  >check_circle_outline</v-icon>
                  <v-icon v-else>close</v-icon>&nbsp;耐震
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  <v-icon
                    v-if="selectedItem.data[selectedItem.version -1].Menshin"
                  >check_circle_outline</v-icon>
                  <v-icon v-else>close</v-icon>&nbsp;免震
                </v-btn>
              </a-col>
              <a-col :span="4">
                <v-btn round flat  class="disabled">
                  <v-icon
                    v-if="selectedItem.data[selectedItem.version -1].Icube"
                  >check_circle_outline</v-icon>
                  <v-icon v-else>close</v-icon>&nbsp;Icube
                </v-btn>
              </a-col>
              <a-col :span="4"  class="disabled">
                <v-btn round flat>
                  <v-icon
                    v-if="selectedItem.data[selectedItem.version -1].Ismart"
                  >check_circle_outline</v-icon>
                  <v-icon v-else>close</v-icon>&nbsp;Ismart
                </v-btn>
              </a-col>
            </a-row>

            <!-- row3****************************************************************** -->
            <a-row type="flex" justify="start">
              <a-col :span="1"></a-col>
              <a-col :span="23">
                <h3>件名:</h3>
                <h3 v-html="selectedItem.data[selectedItem.version -1].RuleKenmei"></h3>&nbsp;
                <br />
                <v-divider></v-divider>
                <!-- <hr /> -->
              </a-col>
            </a-row>
            <v-layout row wrap>
              <v-flex
                xs12
                v-for="(item, index) in selectedItem.data[selectedItem.version -1].content"
                :key="index"
              >
                <v-card flat>
                  <v-card-text
                    class="fr-view"
                    v-html="selectedItem.data[selectedItem.version -1].content[index]"
                  ></v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
          <!-- </v-layout> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      editMode: false,
      config: {
        events: {
          "froalaEditor.image.uploaded": function (e, editor, response) {
            var linkURL = editor.opts.imageUploadParams.link1;
            var results = JSON.parse(response);
            var imageTemp = linkURL + results.link.substr(16);
            console.log(linkURL);
            console.log(2);
            console.log(results);
            console.log(3);
            console.log(imageTemp);
            editor.image.insert(
              imageTemp,
              false,
              null,
              editor.image.get(),
              response
            );
            return false;
          },
          "froalaEditor.image.beforeRemove": function (e, editor, $img) {
            $.ajax({
              method: "POST",
              url: editor.opts.imageUploadParams.link2 + "/froalaRemove",
              data: {
                src: $img.attr("src"),
                replace: editor.opts.imageUploadParams.link1,
              },
            }).done(function (data) {
              if (data) {
                ("--");
              }
            });
          },
        },
        fontSize: [
          "8",
          "9",
          "10",
          "11",
          "12",
          "14",
          "15",
          "16",
          "17",
          "18",
          "24",
          "30",
          "36",
          "48",
          "60",
          "72",
          "96",
        ],
        autofocus: true,
        charCounterCount: true,
        documentReady: true,
        height: "600",
        codeMirror: false,
        toolbarButtons: [
          "fullscreen",
          "undo",
          "redo",
          "|",
          "bold",
          "italic",
          "underline",
          "color",
          "|",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          "|",
          "orderList",
          "unorderList",
          "|",
          "paragraphFormat",
          "|",
          "fontFamily",
          "|",
          "fontSize",
          "|",
          "insertImage",
          "quote",
          "insertTable",
          "insertLink",
        ],
        pluginsEnabled: [
          "link",
          "align",
          "codeBeautifier",
          "colors",
          "draggable",
          "embedly",
          "emoticons",
          "entities",
          "fontAwesome",
          "fontFamily",
          "fontSize",
          "fullscreen",
          "help",
          "image",
          "imageTUI",
          "inlineStyle",
          "inlineClass",
          "lineBreaker",
          "lineHeight",
          "lists",
          "paragraphFormat",
          "paragraphStyle",
          "print",
          "quickInsert",
          "quote",
          "save",
          "specialCharacters",
          "spellChecker",
          "table",
          "url",
          "video",
          "wordPaste",
        ],
        enter: $.FroalaEditor.ENTER_BR,
        imageUploadMethod: "POST",
        videoUploadMethod: "POST",
        imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
        imageDefaultAlign: "left",
        imageDefaultDisplay: "block",
        imageEditButtons: [
          "imageRemove",
          "imageAlign",
          "imageCaption",
          "-",
          "imageDisplay",
          "imageStyle",
          "imageSize",
        ],
        imageRoundPercent: true,
        imageSizeButtons: ["imageBack"],
        imageInsertButtons: ["imageBack", "|", "imageUpload"],
        // theme: 'dark',
        zIndex: 2501,
      },
      items: [],
      selectedItem: "",
      // url: 'http://localhost:5000',
      // front: 'http://10.168.236.42:9000',
      paramID: "test",
      methodList: [
        { text: "軸組", value: "JIKU" },
        { text: "枠組", value: "WAKU" },],
      criteriaList: ["ルール", "製品仕様", "基本図面", "パターン一覧"],
      selectedproductType: "",
      productTypeList: [
        `外部付帯`,
        `サッシ`,
        `システムバス`,
        `その他`,
        `出窓`,
        `バルコニー`,
        `和室造作/建具/出窓`,
        `階段`,
        `建具`,
        `構造`,
        `収納`,
        `住設`,
        `設備`,
        `太陽光`,
        `夢の家`,
        `免震`,
        `洋室造作`,
        `洋室造作/和室造作`,
        `和室造作`,
      ],
    };
  },
  created() {
    this.selectThis(this.selectedRule);
    this.config.imageUploadParams = { link1: this.front, link2: this.api2 };
    this.config.imageUploadURL = this.api2 + "/upload_image/" + this.paramID;
  },
  computed: {
    countContent() {
      return this.selectedItem.data[this.selectedItem.version - 1].content
        .length;
    },
  },
  watch: {
    editMode() {
      if (!this.editMode) {
        this.selectedItem.data[
          this.selectedItem.version - 1
        ].RuleKenmei = this.selectedItem.data[
          this.selectedItem.version - 1
        ].RuleKenmei.replace(/<br>/gi, "\n");
      } else {
        this.selectedItem.data[
          this.selectedItem.version - 1
        ].RuleKenmei = this.selectedItem.data[
          this.selectedItem.version - 1
        ].RuleKenmei.replace(/\n/gi, "<br>");
      }
    },
  },
  methods: {
    selectThis(val) {
      let url = `${this.api}get/${val}`;
      axios.get(url).then((res) => {
        if (!res.data.data[res.data.version - 1].content) {
          res.data.data[res.data.version - 1].content = [""];
        }
        this.selectedItem = res.data;
        this.selectedItem.data[
          this.selectedItem.version - 1
        ].RuleKenmei = this.selectedItem.data[
          this.selectedItem.version - 1
        ].RuleKenmei.replace(/<br>/gi, "\n");
      });
    },
    newWindow(val) {
      let url = `http://hrdapps48:3001/ftp/rule_book/${val}.pdf`;
      window.open(url, "newwindow", "width=800,height=1250");
    },
    updateDoc() {
      let url = `${this.api}post/update_doc/${this.selectedItem._id}`;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Saved",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(this.selectedItem);
      axios.post(url, this.selectedItem).then((res) => {
        console.log(res.data);
        this.backToAll();
      });
    },
    addOne() {
      this.selectedItem.data[this.selectedItem.version - 1].content.push("");
    },
    delOne() {
      this.selectedItem.data[this.selectedItem.version - 1].content.pop();
    },
    //   test(a) {
    //     this.selectedItem.data[a].RuleKenmei=this.selectedItem.data[a].RuleKenmei.replace(/\n/ ,'<br>')
    //  }
  },
};
</script>
<style  scoped>
.disabled {
  pointer-events: none;
}

</style>

