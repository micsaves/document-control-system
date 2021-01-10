<template>
  <v-container pa-1 fluid>
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Rulebook Documents">
          <v-layout v-if="loading" pt-5>
            <v-flex xs4 offset-xs4>
              <div class="text-xs-center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
              </div>
            </v-flex>
          </v-layout>

          <v-layout v-else row fixed>
            <v-flex lg12 pl-1>
              <v-card>
                <v-toolbar flat color="#ffffff">
                  <v-text-field
                    v-model="toSearchRule"
                    :label="docStatus"
                    append-icon="search"
                    @keypress="intPageNo = 1"
                    outlined
                  ></v-text-field>&emsp;
                  <v-layout row wrap>
                    <template>
                      <div class="text-center">
                        <v-btn
                          class="ma-2"
                          :loading="loading1"
                          :disabled="loading1"
                          color="success"
                          @click="
                            loader = 'loading1';
                            getRdoc('for encoding');
                          "
                        >
                          For Encoding
                          <template v-slot:loader>
                            <span>Loading...</span>
                          </template>
                        </v-btn>

                        <v-btn
                          class="ma-2"
                          :loading="loading2"
                          :disabled="loading2"
                          color="success"
                          @click="
                            loader = 'loading2';
                            getRdoc('for approval');
                          "
                        >
                          For Approval
                          <template v-slot:loader>
                            <span>Loading...</span>
                          </template>
                        </v-btn>

                        <v-btn
                          class="ma-2"
                          :loading="loading3"
                          :disabled="loading3"
                          color="success"
                          @click="
                            loader = 'loading3';
                            getRdoc('approved');
                          "
                        >
                          Approved
                          <template v-slot:loader>
                            <span>Loading...</span>
                          </template>
                        </v-btn>

                        <v-btn
                          class="ma-2"
                          :loading="loading4"
                          :disabled="loading4"
                          color="success"
                          @click="
                            loader = 'loading4';
                            getRdoc('disapproved');
                          "
                        >
                          Disapproved
                          <template v-slot:loader>
                            <span>Loading...</span>
                          </template>
                        </v-btn>

                        <v-btn
                          class="ma-2"
                          :loading="loading5"
                          :disabled="loading5"
                          color="success"
                          @click="
                            loader = 'loading5';
                            getRdoc('ALL');
                          "
                        >
                          ALL
                          <template v-slot:loader>
                            <span>Loading...</span>
                          </template>
                        </v-btn>
                      </div>
                    </template>
                  </v-layout>
                  Total Records: {{ filteredRule.length }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="ml-4"
                        v-on="on"
                        @click="NewRec()"
                        color="green"
                        left
                      >mdi-plus-circle-outline</v-icon>
                    </template>
                    <span>Register New Document</span>
                  </v-tooltip>

                  <!-- <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" @click="ForEncoding()" color="blue">mdi-pencil-outline</v-icon>
              </template>
              <span>For Encoding Document</span>
                  </v-tooltip>-->
                </v-toolbar>

                <div id="myTable">
                  <v-list>
                    <template v-for="(item, i) in cPaginatedData">
                      <v-list-tile :key="i">
                        <v-list-tile-action>
                          <v-icon
                            @click="
                              docStatus == 'disapproved' ||
                              docStatus == 'for encoding'
                                ? selectRule(item._id)
                                : deleteRule(item)
                            "
                            v-if="
                              docStatus != 'disapproved' &&
                                docStatus != 'for encoding' &&
                                docStatus != `ALL`
                            "
                            color="green"
                          >mdi-delete-forever</v-icon>

                          <v-icon
                            @click="
                              docStatus == 'disapproved' ||
                              docStatus == 'for encoding' 
                                ? selectRule(item._id)
                                : addBeginningPeriod(item._id);
                            "
                            v-else
                            color="green"
                          >mdi-content-save-edit-outline</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-action v-if="docStatus == `approved`">
                          <v-icon
                            @click="
                              addReviseReason(item._id);
                              getID(item._id);
                            "
                            color="green"
                          >mdi-content-save-edit-outline</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                          <v-list-tile-title
                            v-if="docStatus != `ALL`"
                            v-text="`${item._id}${title_spacer}${item.title}`"
                            class="font-weight-medium"
                          ></v-list-tile-title>

                          <v-list-tile-title
                            v-if="docStatus == `ALL`"
                            v-text="`${item._id}`"
                            class="font-weight-medium"
                          ></v-list-tile-title>

                          <v-list-tile-sub-title
                            v-if="docStatus == `disapproved`"
                            v-text="`Remarks:${title_spacer}${item.remarks}`"
                          ></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                  <v-divider></v-divider>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-dialog v-model="addReviseReasonDialog" max-width="400" persistent>
            <v-card>
              <v-toolbar dense flat>
                <span
                  style="font-weight:bold; font-size:12px"
                >Document Revision Details for {{ documentID }}</span>
                <v-spacer />

                <v-icon
                  @click="
                    addReviseReasonDialog = false;
                    ReviseReason = '';
                  "
                >mdi-close</v-icon>
              </v-toolbar>

              <v-card-text>
                <v-text-field label="Reason" v-model="ReviseReason"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <template v-for="(item, i) in filteredForEncoding"> -->
                <v-btn @click="SaveRec('RevisionReason')" color="success">SAVE</v-btn>
                <!-- </template> -->
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="addBeginningPeriodDialog" max-width="465" persistent>
            <v-card>
              <v-toolbar dense flat>
                <span style="font-weight:bold; font-size:12px">Beginning Period of the document</span>
                <v-btn round color="success" x-small>
                  <a
                    style="color:#FFFFFF"
                    target="_blank"
                    :href="
                    `http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${documentID}.pdf`
                  "
                  >
                    {{ documentID }}
                    <!-- <v-icon right>picture_as_pdf</v-icon> -->
                  </a>
                </v-btn>
                <v-spacer />

                <v-icon
                  @click="
                    addBeginningPeriodDialog = false;
                    BeginningPeriod = '';
                  "
                >mdi-close</v-icon>
              </v-toolbar>

              <v-card-text>
                <v-text-field label="Beginning Period" v-model="BeginningPeriod"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <template v-for="(item, i) in filteredForEncoding"> -->
                <v-btn @click="SaveRec('BeginningPeriod')" color="success">SAVE</v-btn>
                <!-- </template> -->
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="addDialog" max-width="400" persistent>
            <v-card>
              <v-toolbar dense flat>
                <v-toolbar-title>Register New Document</v-toolbar-title>
                <v-spacer />

                <v-icon
                  @click="
                    addDialog = false;
                    ControlNum = '';
                  "
                >mdi-close</v-icon>
              </v-toolbar>

              <v-card-text>
                <v-text-field label="Document Number" v-model="ControlNum" v-mask="mask"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <template v-for="(item, i) in filteredForEncoding"> -->
                <v-btn @click="SaveRec('AddNewDocument')" color="success">SAVE</v-btn>
                <!-- </template> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="text-center">
            <a-row>
              <a-col align="center">
                <v-pagination
                  v-model="intPageNo"
                  :length="cPageCount"
                  :total-visible="5"
                  dark
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  v-if="!loading4"
                ></v-pagination>
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="JWW/DXF Files" force-render>
          <div class="ml-3">
            <v-toolbar flat dense color="#ffffff">
              <v-text-field v-model="toSearchJWW" label="Search File" append-icon="search" outlined></v-text-field>
              <v-spacer />Total Records:
              <span v-if="listData.length > 0">{{ filteredJWW.length }}</span>
              <span v-else>0</span>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon
                    @click="
                      addFilesDialog = true;
                      toSendFile = {};
                      JWWTitle = 'Register New File';
                    "
                    class="ml-4"
                    v-on="on"
                    color="green"
                    left
                  >mdi-plus-circle-outline</v-icon>
                </template>
                <span>Register New File</span>
              </v-tooltip>
            </v-toolbar>

            <a-list
              item-layout="horizontal"
              size="small"
              :pagination="pagination"
              :data-source="filteredJWW"
              class="ml-2"
            >
              <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <a-list-item-meta
                  :description="
                    `部材説明: ${item.buzai} || 品種: ${item.variety}`
                  "
                >
                  <a slot="title">
                    <v-icon color="green" xs @click="editFile(item)">mdi-content-save-edit-outline</v-icon>
                    {{ item.hinban }}
                  </a>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
            <v-dialog v-model="addFilesDialog" max-width="800" persistent>
              <v-card>
                <v-toolbar dense flat>
                  <v-toolbar-title>{{ JWWTitle }}</v-toolbar-title>
                  <v-spacer />

                  <v-icon @click="addFilesDialog = false">mdi-close</v-icon>
                </v-toolbar>
                <v-layout row wrap pt-2>
                  <v-flex xs3 sm2 class="pa-1">
                    <a-checkbox v-model="toSendFile.Ippan">一般工法</a-checkbox>
                  </v-flex>
                  <v-flex xs2 sm2 class="pa-1">
                    <a-checkbox v-model="toSendFile.YumeNoIe">夢の家</a-checkbox>
                  </v-flex>
                  <v-flex xs2 sm1 class="pa-1">
                    <a-checkbox v-model="toSendFile.G">G</a-checkbox>
                  </v-flex>
                  <v-flex xs2 sm1 class="pa-1">
                    <a-checkbox v-model="toSendFile.F">F</a-checkbox>
                  </v-flex>
                  <v-flex xs2 sm1 class="pa-1">
                    <a-checkbox v-model="toSendFile.A">A</a-checkbox>
                  </v-flex>
                  <v-flex xs2 sm1 class="pa-1">
                    <a-checkbox v-model="toSendFile.B">B</a-checkbox>
                  </v-flex>
                  <v-flex xs2 sm2 class="pa-1">
                    <a-checkbox v-model="toSendFile.iCube">i-cube</a-checkbox>
                  </v-flex>
                  <v-flex xs2 sm2 class="pa-1">
                    <a-checkbox v-model="toSendFile.iSmart">i-smart</a-checkbox>
                  </v-flex>
                  <v-flex xs12 sm6 class="pa-1">
                    <a-input
                      placeholder="ID"
                      v-model="toSendFile._id"
                      :disabled="!toSendFile._rev ? false : true"
                    />
                  </v-flex>
                  <v-flex xs12 sm6 class="pa-1">
                    <!-- <a-input placeholder="Variety" v-model="toSendFile.variety" /> -->
                    <a-select
                      v-model="toSendFile.variety"
                      style="width: 100%"
                      placeholder="Variety"
                    >
                      <a-select-option
                        v-for="item in OptVariety"
                        :key="item"
                        v-value="item"
                      >{{ item }}</a-select-option>
                    </a-select>
                  </v-flex>
                  <v-flex xs12 sm6 class="pa-1">
                    <a-input placeholder="Hinban" v-model="toSendFile.hinban" />
                  </v-flex>
                  <v-flex xs12 sm6 class="pa-1">
                    <a-input placeholder="Buzai" v-model="toSendFile.buzai" />
                  </v-flex>
                  <v-flex xs12 sm6 class="pa-1">
                    <a-input placeholder="JWW File Path" v-model="toSendFile.JWWFile" />
                  </v-flex>
                  <v-flex xs12 sm6 class="pa-1">
                    <a-input placeholder="DXF File Path" v-model="toSendFile.DXFFile" />
                  </v-flex>
                </v-layout>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" @click="SaveFile()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Master for Multiple/Synonym Search" force-render>
          <v-toolbar flat dense>
            <span style="font-weight:bold">Search: &emsp;</span>
            <a-input style="width:50%" v-model="toSearchSynonym" append-icon="search" outlined></a-input>
            <v-spacer></v-spacer>
            <a-button
              type="primary"
              icon="plus-square"
              @click="synonymDialog=true; toInsertSynonym=[]; title_Synonym='New'"
            >New</a-button>
          </v-toolbar>
          <a-table
            :columns="columns"
            :data-source="filteredSynonymData"
            :pagination="pagination"
            bordered
          >
            <span slot="Actions" slot-scope="record">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <a-button @click="EditKeyword(record)" icon="edit" v-on="on"></a-button>
                </template>
                <span>Edit</span>
              </v-tooltip>
            </span>
          </a-table>
          <v-dialog v-model="synonymDialog" max-width="800" persistent>
            <v-card>
              <v-toolbar dense flat>
                <v-toolbar-title>{{title_Synonym}} Synonym Characters</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="synonymDialog=false">mdi-close</v-icon>
              </v-toolbar>
              <br />
              <v-layout row wrap pt-2>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[0]" placeholder="A" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[1]" placeholder="B" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[2]" placeholder="C" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[3]" placeholder="D" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[4]" placeholder="E" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[5]" placeholder="F" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[6]" placeholder="G" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[7]" placeholder="H" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[8]" placeholder="I" />
                </v-flex>
                <v-flex xs12 sm6 class="pa-1">
                  <a-input v-model="toInsertSynonym[9]" placeholder="J" />
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer />
                <a-button type="primary" icon="save" @click="SaveKeywords()">Save</a-button>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </a-tab-pane>
      </a-tabs>
    </div>
  </v-container>
</template>

<script>
const columns = [
  {
    title: "A",
    dataIndex: 0,
    key: 0,
  },
  {
    title: "B",
    dataIndex: 1,
    key: 1,
  },
  {
    title: "C",
    key: 2,
    dataIndex: 2,
  },
  {
    title: "D",
    key: 3,
    dataIndex: 3,
  },
  {
    title: "E",
    key: 4,
    dataIndex: 4,
  },
  {
    title: "F",
    key: 5,
    dataIndex: 5,
  },
  {
    title: "G",
    key: 6,
    dataIndex: 6,
  },
  {
    title: "H",
    key: 7,
    dataIndex: 7,
  },
  {
    title: "I",
    key: 8,
    dataIndex: 8,
  },
  {
    title: "J",
    key: 9,
    dataIndex: 9,
  },
  {
    title: "",
    width: "5%",
    key: 10,
    scopedSlots: { customRender: "Actions" },
  },
];
import axios from "axios";
import { mask } from "vue-the-mask";
import Swal from "sweetalert2";
// import localdb from '../../../'

export default {
  directives: {
    mask,
  },
  data() {
    return {
      title_Synonym: "",
      toInsertSynonym: [],
      SynonymData: [],
      synonymDialog: false,
      toSearchSynonym: "",
      columns,
      title_spacer: "　",
      intPageNo: 1,
      intRowNo: 9,
      mask: "######-##",
      test: "hi delo",
      allRule: [],
      forEncodingData: [],
      toSearchRule: "",
      toSearchForEncoding: "",
      loading: true,
      addDialog: false,
      addFilesDialog: false,
      forEncodingDialog: false,
      ControlNum: "",
      updateMasterCondition: "approved",
      approvedData: [],
      docStatusOption: [
        "for encoding",
        "approved",
        "for approval",
        "disapproved",
      ],
      docStatus: "disapproved",
      allData: [],
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      listData: [],
      pagination: {
        onChange: () => {},
        pageSize: 6,
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
      ],
      toSendFile: {},
      addReviseReasonDialog: false,
      ReviseReason: "",
      documentID: "",
      page: 1,
      toSearchJWW: "",
      OptVariety: [
        "エコカラット割り付け図(｢i-cube 240+｣)",
        "エコカラット割り付け図(｢i-cube 260+｣)",
        "エコカラット割り付け図(｢i-smart 240+｣)",
        "エコカラット割り付け図(｢i-smart 260+｣)",
        "エコカラット割り付け図(｢夢の家 240｣)",
        "エコカラット割り付け図(｢夢の家 265｣)",
        "オリジナルテレビボード",
        "玄関上がり框",
        "勾配天井",
        "自在棚",
        "システムクローゼット(ユニット) ケーシング枠",
        "システムパントリー(ユニット)ケーシング枠",
        "白木調造作造作材",
        "スリットウォール",
        "スリットスライダー建具 (洋室)",
        "スリットスライダー建具 (和室)",
        "スリットルーバー",
        "ソリッドウッドパネル",
        "ソロモンマホガニー造作材",
        "タレ壁３方枠（白木調造作）",
        "タレ壁３方枠（白松造作）",
        "タレ壁３方枠（木調造作）",
        "タレ壁３方枠（木調造作/白木調造作）",
        "トータルシステムクローゼット(ウォークインタイプ)",
        "トータルシステムクローゼット(ユニット)",
        "トータルシステムクローゼット(ユニット) ケーシング枠",
        "ブックシェルフ(ユニット))ケーシング枠",
        "フリーカウンター",
        "丸棒手摺金物",
        "ユニット出窓",
        "リモコンニッチ",
        "ロフト",
        "和室建具平面図（白木調造作）",
        "和室建具平面図（白松造作）",
        "和室建具平面図（檜造作）",
        "階段関係",
        "階段関係　（240+）",
        "階段関係　（260+）",
        "掘座卓",
        "高性能樹脂サッシ(Sマホガ二ー造作)",
        "高性能樹脂サッシ(キッチン樹脂枠)",
        "高性能樹脂サッシ(白木調造作)",
        "高性能樹脂サッシ(白松造作)",
        "高性能樹脂サッシ(白松造作・内障子枠)",
        "高性能樹脂サッシ(檜造作)",
        "高性能樹脂サッシ(木調造作)",
        "高性能樹脂サッシ（木調造作/白木調造作）",
        "室内明かりとり",
        "住設",
        "造作材",
        "白松造作造作材",
        "木調造作材",
        "洋室建具平面図（Sマホガニー造作）",
        "洋室建具平面図（木調造作）",
        "洋室建具平面図（木調造作/白木調造作）",
        "檜造作造作材",
      ],
      JWWTitle: "",
      indexOfKeyword: -1,
      addBeginningPeriodDialog: false,
      BeginningPeriod: "",
    };
  },

  created() {
    this.loadData();
    this.loadAllData();
    this.loadFile();
    this.loadSynonymData();
  },
  watch: {
    docStatus() {
      this.loadData();
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  computed: {
    filteredSynonymData() {
      return this.SynonymData;
    },
    filteredJWW() {
      if (this.listData.length > 0) {
        return this.listData.filter((data) => {
          if (typeof data.hinban == "number") {
            data.hinban = `${data.hinban}`;
          }
          return data.hinban.includes(this.toSearchJWW);
        });
      } else {
        return [];
      }
    },
    cPageCount() {
      let l = this.filteredRule.length,
        s = this.intRowNo;
      return Math.ceil(l / s);
    },
    cPaginatedData() {
      const start = (this.intPageNo - 1) * this.intRowNo,
        end = start + this.intRowNo;
      return this.filteredRule.slice(start, end);
    },
    filteredRule() {
      if (this.allRule.length > 0) {
        return this.allRule.filter((data) => {
          return data._id
            .toLowerCase()
            .includes(this.toSearchRule.toLowerCase());
        });
      } else {
        return [];
      }
    },

    filteredForEncoding() {
      if (this.forEncodingData.length > 0) {
        return this.forEncodingData.filter((data) => {
          return data._id
            .toLowerCase()
            .includes(this.toSearchForEncoding.toLowerCase());
        });
      } else {
        return [];
      }
    },
  },
  methods: {
    EditKeyword(val) {
      this.synonymDialog = true;
      this.indexOfKeyword = this.SynonymData.indexOf(val);
      // let data = Object.assign({}, val);
      let arr = Object.values(val).filter((rec) => {
        return typeof rec != "number";
      });
      console.log(arr);
      this.toInsertSynonym = arr;
      console.log(this.toInsertSynonym);
    },
    SaveKeywords() {
      console.log(this.toInsertSynonym);
      this.synonymDialog = false;
      let url = "";
      if (this.title_Synonym == "New") {
        url = `${this.api}insert/keywords`;
        axios.post(url, this.toInsertSynonym).then(() => {
          // console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Save Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.loadSynonymData();
        });
      } else {
        url = `${this.api}update/keywords?index=${this.indexOfKeyword}`;
        axios.post(url, this.toInsertSynonym).then(() => {
          // console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.loadSynonymData();
        });
      }
    },
    loadSynonymData() {
      let url = `${this.api}get/SynonymChars`;
      axios.get(url).then((res) => {
        this.SynonymData = res.data.data.map((rec, index) => {
          return {
            key: index,
            0: rec[0],
            1: rec[1],
            2: rec[2],
            3: rec[3],
            4: rec[4],
            5: rec[5],
            6: rec[6],
            7: rec[7],
            8: rec[8],
            9: rec[9],
          };
        });
        // console.log(this.SynonymData);
      });
    },
    SaveFile() {
      this.toSendFile.documentType = "JWW";
      let title = "";
      if (!this.toSendFile._rev) {
        title = "Successfully Saved";
      } else {
        title = "Successfully Updated";
      }
      let url = `${this.api}add/docs`;
      axios.post(url, this.toSendFile).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: title,
          showConfirmButton: false,
          timer: 1500,
        });
        this.addFilesDialog = false;
        this.loadFile();
      });
    },

    loadFile() {
      let url = `${this.api}getAllFiles`;
      axios.get(url).then((res) => {
        this.listData = res.data;
      });
    },
    editFile(data) {
      this.JWWTitle = "Edit File Details";
      this.addFilesDialog = true;
      this.toSendFile = Object.assign({}, data);
    },
    loadData() {
      this.allRule = [];
      if (this.docStatus == "disapproved") {
        this.loading4 = true;
        let url = `${this.api}get/all/title`;
        axios.get(url).then((res) => {
          this.allRule = res.data;

          this.allRule = this.allRule.map((a) => {
            a.title = a.title.replace(/<br>/gi, "\n");
            return a;
          });

          this.loading = false;
          this.loading4 = false;
        });
      } else if (this.docStatus == "for encoding") {
        this.loading1 = true;
        let url = `${this.api}for_encoding`;
        axios.get(url).then((res) => {
          this.allRule = res.data;

          this.allRule = this.allRule.map((a) => {
            a.title = a.title.replace(/<br>/gi, "\n");
            return a;
          });
          this.loading = false;
          this.loading1 = false;
        });
      } else if (this.docStatus == "approved") {
        this.loading3 = true;
        let url = `${this.api}get/updated_master/${this.docStatus}`;

        axios.get(url).then((res) => {
          this.allRule = res.data;

          this.allRule = this.allRule.map((a) => {
            a.title = a.title.replace(/<br>/gi, "\n");
            return a;
          });
          this.loading3 = false;
        });
      } else if (this.docStatus == "for approval") {
        this.loading2 = true;
        let url = `${this.api}get/updated_master/${this.docStatus}`;

        axios.get(url).then((res) => {
          this.allRule = res.data;

          this.allRule = this.allRule.map((a) => {
            a.title = a.title.replace(/<br>/gi, "\n");
            return a;
          });
          this.loading2 = false;
        });
      } else if (this.docStatus == "ALL") {
        this.loading5 = true;
        axios.get(`${this.api}get/all/data`).then((res) => {
          this.allRule = res.data.filter((rec) => {
            return !rec.obsolete && !rec.BeginningPeriod
          });
          this.loading5 = false;
        });
      } else {
        this.allRule = [];
      }
    },
    loadAllData() {
      axios.get(`${this.api}get/all/data`).then((res) => {
        this.allData = res.data;
      });
    },
    ForEncoding() {
      let url = `${this.api}for_encoding`;
      axios.get(url).then((res) => {
        this.forEncodingData = res.data;
        this.forEncodingDialog = true;
      });
    },
    NewRec() {
      this.addDialog = true;
    },
    getID(val) {
      this.documentID = val;
    },
    SaveRec(val) {
      if (val == "AddNewDocument") {
        let ifExist = this.allData.map((data) => {
          return data._id;
        });
        if (ifExist.includes(this.ControlNum)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Document No. is already exist !!",
          });

          return false;
        }

        if (this.ControlNum.length > 8 && val == "AddNewDocument") {
          axios
            .post(`${this.api}registerNewRecord/${this.ControlNum}`)
            .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Saved",
                showConfirmButton: false,
                timer: 1500,
              });

              // alert("Successfully Saved!");

              this.addDialog = false;
              this.loadData();
              // this.$router.push('/modify')
              this.selectRule(this.ControlNum);
            });
        }
      } else {
        if (!this.ReviseReason && val == "RevisionReason") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please give me a reason !!",
          });

          return false;
        } else {
          if (val == "RevisionReason") {
            axios
              .post(
                `${this.api}AddRevisionReason/${this.ReviseReason}/${this.documentID}`
              )
              .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Successfully Moved to Approval",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });

            this.addReviseReasonDialog = false;
            this.loadData();
            // this.selectRule(this.documentID);
          }
        }
        if (val == "BeginningPeriod") {
          if (!this.BeginningPeriod && val == "BeginningPeriod") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Input Beginning Period !!",
            });
          } else {
            axios
              .post(
                `${this.api}AddBeginningPeriod/${this.BeginningPeriod}/${this.documentID}`
              )
              .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Successfully Save!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });

            this.addBeginningPeriodDialog = false;
            this.BeginningPeriod = ""
            this.loadData();
          }
        }
      }
    },
    getRdoc(val) {
      this.docStatus = val;
    },

    addReviseReason() {
      this.addReviseReasonDialog = true;
    },
    deleteRule(val) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, Delete ${val._id}!`,
      }).then((result) => {
        if (result.value) {
          let url = `${this.api}update/obsolete?ID=${val._id}`;
          axios.post(url).then(() => {});

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.loadData();
        }
      });
    },

    addBeginningPeriod(val) {
      this.documentID = val;
      this.addBeginningPeriodDialog = true;
    },
  },
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.v-btn {
  border-radius: 28px !important;
}
#mycard {
  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  overflow-x: auto;
}
</style>
