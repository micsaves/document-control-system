<template>
  <v-container pa-0 fluid>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="3" tab="Search Rulebook Document">
        <v-layout v-if="loading2">
          <v-flex xs4 offset-xs4>
            <div class="text-xs-center" style="background-color: #fafafa">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-flex>
        </v-layout>

        <v-flex v-else pl-1 class="'sm12'">
          <!-- <v-divider color="black"></v-divider> -->

          <v-card flat v-if="searchGoogle">
            <v-toolbar flat>
              <!-- <div>
                <v-text-field
                  @keyup.enter="searchText ? onSearch() : ''"
                  v-model="searchText"
                  dense
                  label="Search here"
                  clearable
                  style="width:600px"
                  @click:clear="
                    loadAllDocs();
                    loading2 = true;
                  "
                ></v-text-field>
              </div>&emsp;-->
              <span style="font-weight: bold; font-size: 14px">Search:</span>
              &emsp;
              <a-input
                @keyup.enter="searchText ? onSearch() : clearSearch()"
                style="width: 600px"
                v-model="searchText"
                placeholder="Search document"
                append-icon="search"
                outlined
              >
                <a-icon
                  slot="suffix"
                  @click="clearSearch()"
                  type="close-circle"
                  style="color: rgba(0, 0, 0, 0.45)"
                />
              </a-input>

              <a-select v-model="selectedCondition" style="width: 90px">
                <a-select-option
                  v-for="item in condition"
                  :key="item"
                  v-value="item"
                  >{{ item }}</a-select-option
                >
              </a-select>

              <a-button
                class="mx-2"
                dark
                type="primary"
                icon="search"
                @click="
                  selectedCondition != 'MULTI' ? onSearch() : onMultipleSearch()
                "
                :disabled="!searchText"
              >
                Search
                <!-- <v-icon dark>mdi-search-web</v-icon> -->
              </a-button>

              <!-- <a-button
                dark
                type="primary"
                icon="search"
                :disabled="!searchText"
                @click="onMultipleSearch()"
              >Multiple Search</a-button>-->

              <v-spacer></v-spacer>

              <!-- <v-card v-if="searchText" flat color="primary" dark> -->
              <span v-if="searchText && !isMultiple">
                About {{ filteredGoogleRules.length }} results for keywords "{{
                  searchText
                }}"
              </span>
              <span v-else-if="searchText && isMultiple">
                About {{ filteredGoogleRules.length }} results for multiple
                keywords
              </span>

              <!-- </v-card> -->
              <span v-else flat>Total: {{ filteredGoogleRules.length }}</span>
            </v-toolbar>

            <div class="mt-0 pt-0 pb-2" style="background-color: #f5f5f5">
              <a-row type="flex" justify="start" color="primary">
                &emsp;
                <span class="mt-2" style="font-weight: bold; font-size: 14px"
                  >製品区分:</span
                >
                <a-row>
                  <a-col>
                    <a-icon
                      @click="
                        sortByProductTypeASC = true;
                        sortByProductTypeDES = false;
                      "
                      type="caret-up"
                    />
                  </a-col>
                  <a-col>
                    <a-icon
                      @click="
                        sortByProductTypeDES = true;
                        sortByProductTypeASC = false;
                      "
                      type="caret-down"
                    />
                  </a-col>
                </a-row>
                <a-select
                  class="mt-1"
                  v-model="selectedproductType"
                  style="width: 300px"
                >
                  <a-select-option
                    v-for="item in productTypeList"
                    :key="item"
                    v-value="item"
                    >{{ item }}</a-select-option
                  > </a-select
                >&emsp; &emsp;
                <!-- <a-col>
                  <span style="font-weight:bold; font-size:14px;">製品区分:</span>&nbsp;&nbsp;
                  <a-select v-model="selectedproductType" style="width: 300px">
                    <a-select-option
                      v-for="item in productTypeList"
                      :key="item"
                      v-value="item"
                    >{{ item }}</a-select-option>
                  </a-select>&emsp; &emsp;
                </a-col>-->

                <!-- <a-col> -->
                <span class="mt-2" style="font-weight: bold; font-size: 14px"
                  >構法:</span
                >&nbsp;&nbsp;
                <a-row>
                  <a-col>
                    <a-icon
                      @click="
                        sortByMethodTypeASC = true;
                        sortByMethodDES = false;
                      "
                      type="caret-up"
                    />
                  </a-col>
                  <a-col>
                    <a-icon
                      type="caret-down"
                      @click="
                        sortByMethodTypeASC = false;
                        sortByMethodDES = true;
                      "
                    />
                  </a-col>
                </a-row>
                <a-select
                  class="mt-1"
                  v-model="selectedMethod"
                  style="width: 300px"
                >
                  <a-select-option
                    v-for="item in methodList"
                    :key="item.value"
                    v-value="item.value"
                    >{{ item.text }}</a-select-option
                  > </a-select
                >&nbsp;
                <!-- </a-col> -->
                <!-- <a-col> -->
                &emsp;
                <span class="mt-2" style="font-weight: bold; font-size: 14px"
                  >区分:</span
                >
                &nbsp;
                <a-row>
                  <a-col>
                    <a-icon
                      type="caret-up"
                      @click="
                        sortByCriteriaASC = true;
                        sortByCriteriaDES = false;
                      "
                    />
                  </a-col>
                  <a-col>
                    <a-icon
                      type="caret-down"
                      @click="
                        sortByCriteriaTypeASC = false;
                        sortByCriteriaDES = true;
                      "
                    />
                  </a-col>
                </a-row>
                <a-select
                  class="mt-1"
                  v-model="selectedCriteria"
                  style="width: 300px"
                >
                  <a-select-option
                    v-for="item in criteriaList"
                    :key="item"
                    v-value="item"
                    >{{ item }}</a-select-option
                  > </a-select
                >&nbsp;
                <!-- </a-col> -->
              </a-row>
              <p class="pa-1 ma-0"></p>
              <a-row type="flex" justify="start">
                <a-col>
                  &nbsp;
                  <span
                    class="pl-0 ml-0"
                    style="font-weight: bold; font-size: 14px"
                    >建物タイプ:</span
                  >&nbsp;
                  <a-select
                    class="mt-1"
                    mode="multiple"
                    v-model="selectedBuildingType"
                    style="width: 300px"
                  >
                    <a-select-option
                      v-for="item in buildingTypeList"
                      :key="item.value"
                      v-value="item.value"
                      >{{ item.text }}</a-select-option
                    >
                  </a-select>
                </a-col>
                <!-- <a-col> -->
                &nbsp; &nbsp; &nbsp;
                <span class="pt-2" style="font-weight: bold; font-size: 14px"
                  >更新日:</span
                >
                &nbsp;
                <a-row>
                  <a-col>
                    <a-icon
                      type="caret-up"
                      @click="
                        sortByDateASC = true;
                        sortByDateDES = false;
                      "
                    />
                  </a-col>
                  <a-col>
                    <a-icon
                      type="caret-down"
                      @click="
                        sortByDateASC = false;
                        sortByDateDES = true;
                      "
                    />
                  </a-col>
                </a-row>
                <a-range-picker
                  class="mt-1"
                  @change="onChangeDate"
                  style="width: 300px"
                />&nbsp;&nbsp;
                <span class="mt-2" style="font-weight: bold; font-size: 14px"
                  >建物仕様:</span
                >&nbsp;
                <a-select
                  mode="multiple"
                  v-model="selectedBuildingSpecification"
                  style="width: 300px"
                >
                  <a-select-option
                    class="mt-1"
                    v-for="item in buildingSpecificationList"
                    :key="item.value"
                    v-value="item.value"
                    >{{ item.text }}</a-select-option
                  > </a-select
                >&nbsp;
                <!-- </a-col> -->
              </a-row>
            </div>

            <div
              class="text-xs-center"
              v-if="loading2"
              style="background-color: #fafafa"
            >
              <br />
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>

            <v-list v-else style="overflow-y: scroll; height: 52vh">
              <!-- <v-divider color="black"></v-divider> -->
              <div class="pt-1 mt-0"></div>

              <!-- SEARCH RULEBOOK DOCUMENTLIST -->

              <template v-for="(item, i) in cPaginatedData2">
                <v-list-tile
                  @click="
                    viewRuleContent(item._id);
                    selectDoc = item._id;
                    searchGoogle = false;
                    rulecontent = true;
                    searchLists.push(item._id);
                  "
                  :key="i"
                  :class="listColorSearch(item._id)"
                >
                  <v-list-tile-action>
                    <!-- <v-icon color="green">zoom_in</v-icon> -->
                    <v-icon x-small>mdi-file-pdf-outline</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title class="font-weight-medium">
                      {{ item._id }}
                      {{ title_spacer }}
                      <span v-html="`${item.title}${title_spacer}`"></span>
                      <span
                        id="label"
                        style="background-color: #1d7e8f"
                        class="mr-1"
                        >{{ item.productType }}</span
                      >
                      <span
                        id="label"
                        style="background-color: #c7660c"
                        class="mr-1"
                        >{{ item.criteria }}</span
                      >
                      <span
                        id="label"
                        style="background-color: #22a10e"
                        class="mr-1"
                        v-if="item.method == 'JIKU'"
                        >{{ methodList[1].text }}</span
                      >

                      <span
                        id="label"
                        style="background-color: #22a10e"
                        class="mr-1"
                        v-else-if="item.method == 'WAKU'"
                        >{{ methodList[2].text }}</span
                      >

                      <span
                        id="label"
                        style="background-color: #22a10e"
                        class="mr-1"
                        v-else-if="item.method == 'WAKU/JIKU'"
                        >{{ methodList[2].text }}{{ title_spacer
                        }}{{ methodList[1].text }}</span
                      >
                      <span>{{ title_spacer }}</span>
                    </v-list-tile-title>

                    <v-list-tile-sub-title
                      v-if="searchRulebookIconAlignment"
                      v-html="`${title_spacer}${item.content}`"
                    ></v-list-tile-sub-title>
                    <!-- `${item.content.substring(0,60)}...` -->
                  </v-list-tile-content>
                </v-list-tile>
                <!-- <v-divider
                  class="ml-3 mr-3"
                  :key="item"
                  color="black"
                ></v-divider>-->
              </template>
            </v-list>
          </v-card>
        </v-flex>

        <v-pagination
          v-model="intPageNo"
          :length="cPageCount2"
          :total-visible="5"
          dark
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          v-if="!loading2 && !rulecontent"
        ></v-pagination>
        <!-- =======
        >>>>>>> 8078b0450f9f07c841dc8c298b75814b7db071ad-->
        <!-- <div id="remove"> -->
        <!-- <div class="'sm12'" v-if="rulecontent"> -->
        <v-toolbar flat v-if="rulecontent">
          <v-toolbar-title>{{ viewedRule._id }}</v-toolbar-title>
          {{ title_spacer }}
          <v-btn
            color="success"
            @click="
              searchGoogle = true;
              rulecontent = false;
              selectDoc = '';
            "
          >
            <v-icon>mdi-arrow-left</v-icon>Back
          </v-btn>

          <v-btn round color="success">
            <a
              style="color: #ffffff"
              target="_blank"
              :href="`http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${viewedRule._id}.pdf`"
            >
              Open
              <v-icon right>picture_as_pdf</v-icon>
            </a>
          </v-btn>
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn @click="print()" color="success">
            <v-icon>mdi-printer</v-icon>Print
          </v-btn>-->

          <template
            v-if="
              (!viewedRule.isApproved &&
                this.userInfo.designation === 'Japanese Advisor') ||
              userInfo.employee_code == '00136'
            "
          >
            <v-tooltip bottom>
              <v-icon large slot="activator" @click="approvedDialog = true"
                >playlist_add_check</v-icon
              >
              <span>Approved Document</span>
            </v-tooltip>
          </template>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-icon
              large
              slot="activator"
              @click="
                historyDialog = true;
                sortHistory();
              "
              >art_track</v-icon
            >
            <span>View History</span>
          </v-tooltip>
        </v-toolbar>
        <!-- </div> -->
        <!-- RULEBOOKDOCUMENT LIST-->
        <v-flex pl-1 class="'sm12'" v-if="rulecontent">
          <v-card flat style="overflow-y: scroll; height: 72vh">
            <!-- <div id="print"> -->
            <v-layout pt-4 row wrap>
              <template>
                <v-flex xs12>
                  <a-row type="flex" justify="start">
                    <a-col>
                      <v-btn class="disabled" round flat>
                        <span
                          v-if="
                            viewedRule.data[viewedRule.version - 1].MailAddress
                          "
                        >
                          メール アドレス:&nbsp;&nbsp;{{
                            viewedRule.data[viewedRule.version - 1].MailAddress
                          }}
                        </span>
                        <span v-else> メール アドレス:&nbsp;&nbsp; N/A </span>
                      </v-btn>
                      <v-icon
                        small
                        v-clipboard="
                          () =>
                            viewedRule.data[viewedRule.version - 1].MailAddress
                        "
                        @click="Copy()"
                        >mdi-content-copy</v-icon
                      >
                    </a-col>

                    <a-col>
                      <v-btn round flat class="disabled">
                        開始時期:&nbsp;&nbsp;
                        <span
                          v-if="
                            viewedRule.data[viewedRule.data.length - 1]
                              .BeginningPeriod
                          "
                        >
                          {{
                            viewedRule.data[viewedRule.data.length - 1]
                              .BeginningPeriod
                          }}
                        </span>
                        <span v-else>N/A</span>
                      </v-btn>
                    </a-col>
                    <a-col>
                      <!-- <v-spacer></v-spacer> -->
                      <v-btn round flat class="disabled">
                        <span
                          v-if="
                            viewedRule.data[viewedRule.version - 1].UpdatedDate
                          "
                        >
                          システム更新日:&nbsp;&nbsp;
                          {{
                            viewedRule.data[viewedRule.version - 1].UpdatedDate
                          }}
                        </span>
                        <span v-else> システム更新日:&nbsp;&nbsp; N/A </span>
                      </v-btn>
                    </a-col>
                    <a-col>
                      <!-- <v-spacer></v-spacer> -->
                      <v-btn round flat class="disabled">
                        <span v-if="viewedRule.RulebookUpdatedDate">
                          ルールブック更新日:&nbsp;&nbsp;
                          {{ viewedRule.RulebookUpdatedDate }}
                        </span>
                        <span v-else>
                          ルールブック更新日:&nbsp;&nbsp; N/A
                        </span>
                      </v-btn>
                    </a-col>
                  </a-row>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <span
                      v-if="viewedRule.data[viewedRule.version - 1].SeihinKubun"
                    >
                      製品区分&nbsp;-&nbsp;
                      {{ viewedRule.data[viewedRule.version - 1].SeihinKubun }}
                    </span>
                    <span v-else> 製品区分&nbsp;-&nbsp; N/A </span>
                  </v-btn>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    区分&nbsp;-&nbsp;
                    <span v-if="viewedRule.criteria">
                      {{ viewedRule.criteria }}
                    </span>
                    <span v-else>N/A</span>
                  </v-btn>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    担当&nbsp;-&nbsp;
                    <span v-if="viewedRule.data[viewedRule.version - 1].Tantou">
                      {{ viewedRule.data[viewedRule.version - 1].Tantou }}
                    </span>
                    <span v-else>N/A</span>
                  </v-btn>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    担当 部署:&nbsp;&nbsp;
                    <span
                      v-if="viewedRule.data[viewedRule.version - 1].TantouBusho"
                      >{{
                        viewedRule.data[viewedRule.version - 1].TantouBusho
                      }}</span
                    >
                    <span v-else>N/A</span>
                  </v-btn>
                </v-flex>
                <v-flex xs4>
                  <v-btn round flat class="disabled">
                    適用区分&nbsp;-&nbsp;
                    <span
                      v-if="
                        viewedRule.data[viewedRule.version - 1].TekiyouKubun
                      "
                      >{{
                        viewedRule.data[viewedRule.version - 1].TekiyouKubun
                      }}</span
                    >
                    <span v-else>N/A</span>
                  </v-btn>
                </v-flex>

                <!-- row2****************************************************************** -->
                <!-- <a-row type="flex" justify="start">
                    <a-col>
                </a-col>-->

                <!-- <v-flex xs4> -->
                <!-- <v-layout row wrap> -->
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon
                      v-if="viewedRule.data[viewedRule.version - 1].YumeNoIe"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;夢の家
                  </v-btn>
                </v-flex>
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon v-if="viewedRule.data[viewedRule.version - 1].Ippan"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;一般
                  </v-btn>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon v-if="viewedRule.data[viewedRule.version - 1].G"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;グランド セゾン
                  </v-btn>
                </v-flex>
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon v-if="viewedRule.data[viewedRule.version - 1].F"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;セゾンF
                  </v-btn>
                </v-flex>
                <!-- </v-layout> -->
                <!-- </v-flex> -->

                <!-- <v-flex xs4> -->
                <!-- <v-layout row wrap> -->
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon v-if="viewedRule.data[viewedRule.version - 1].A"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;セゾンA
                  </v-btn>
                </v-flex>
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon v-if="viewedRule.data[viewedRule.version - 1].B"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;ブリアール
                  </v-btn>
                </v-flex>
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon
                      v-if="viewedRule.data[viewedRule.version - 1]['F2-TD']"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;セゾンF2-TD
                  </v-btn>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon v-if="viewedRule.data[viewedRule.version - 1].Icube"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;Icube
                  </v-btn>
                </v-flex>
                <!-- </v-layout> -->
                <!-- </v-flex> -->

                <!-- <v-flex xs4> -->
                <!-- <v-layout row wrap> -->
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon
                      v-if="viewedRule.data[viewedRule.version - 1].Ismart"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;Ismart
                  </v-btn>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon
                      v-if="viewedRule.data[viewedRule.version - 1].Ismile"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;Ismile
                  </v-btn>
                </v-flex>

                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon
                      v-if="viewedRule.data[viewedRule.version - 1].Taishin"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;耐震
                  </v-btn>
                </v-flex>
                <v-flex xs2>
                  <v-btn round flat class="disabled">
                    <v-icon
                      v-if="viewedRule.data[viewedRule.version - 1].Menshin"
                      >check_circle_outline</v-icon
                    >
                    <v-icon v-else>close</v-icon>&nbsp;免震
                  </v-btn>
                </v-flex>
                <!-- </v-layout> -->
                <!-- </v-flex> -->

                <!-- row3****************************************************************** -->
                <v-flex xs12>
                  <v-layout pl-4 pt-2>
                    <p style="font-size: 16px; padding-top: 0">件名: &nbsp;</p>
                    <p>
                      <span
                        style="font-size: 16px; padding-top: 0"
                        v-html="
                          viewedRule.data[viewedRule.version - 1].RuleKenmei
                        "
                      ></span>
                    </p>
                  </v-layout>
                  <br />
                  <hr />
                </v-flex>
                <v-flex
                  xs12
                  v-for="(item, index) in viewedRule.data[
                    viewedRule.version - 1
                  ].content"
                  :key="index"
                >
                  <v-card flat>
                    <!-- {{item}} -->
                    <v-card-text class="fr-view" v-html="item"></v-card-text>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
            <!-- </div> -->
          </v-card>
        </v-flex>

        <!-- </v-layout> -->

        <!-- dialog*********************************************************************************** -->
        <v-dialog v-model="historyDialog" width="500">
          <v-card>
            <v-list>
              <template v-for="(item, index) in historyDetails">
                <v-list-tile @click="viewHistory(index)" :key="index">
                  <v-list-tile-content>
                    {{ index + 1 }} . {{ item.UpdatedDate }}&emsp;{{
                      item.ApprovalRemarks
                    }}
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
      </a-tab-pane>
      <a-tab-pane
        key="1"
        tab="Rulebook Documents"
        v-if="
          userInfo.employee_code == 'japanese' ||
          userInfo.employee_code == '00136'
        "
      >
        <v-layout v-if="loading">
          <v-flex xs4 offset-xs4>
            <div class="text-xs-center">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-flex>
        </v-layout>

        <v-layout v-else id="mycard">
          <v-flex
            sm3
            pl-1
            v-if="
              userInfo.employee_code == 'japanese' ||
              userInfo.employee_code == '00136'
            "
          >
            <v-card>
              <v-toolbar flat>
                <v-text-field
                  :label="docStatus"
                  v-model="toSearch"
                  append-icon="search"
                  style="width: 100px"
                  @keypress="intPageNo = 1"
                ></v-text-field>

                <!-- <v-tooltip bottom>
              <v-icon
                color="green"
                right
                slot="activator"
                @click="searchGoogle = true; rulecontent = false;selectDoc='' "
              >mdi-database-search</v-icon>
              <span>Search Text Content</span>
                </v-tooltip>-->
                &emsp;
                <v-menu>
                  <template #activator="{ on: menu }">
                    <v-tooltip bottom>
                      <template #activator="{ on: tooltip }">
                        <v-icon
                          color="green"
                          left
                          v-on="{ ...tooltip, ...menu }"
                          >keyboard_arrow_down</v-icon
                        >
                      </template>
                      <span>Document status ({{ docStatus }})</span>
                    </v-tooltip>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in docStatusOption"
                      :key="index"
                      @click="getRdoc(item)"
                    >
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-icon x-small>mdi-file-pdf-outline</v-icon>
                {{ filteredItem.length }}
              </v-toolbar>

              <v-list style="overflow-y: scroll; height: 65vh">
                <v-flex xs4 offset-xs4 v-if="loading">
                  <div class="text-xs-center">
                    <v-progress-circular
                      :size="50"
                      color="primary"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </v-flex>
                <template else v-for="(item, i) in cPaginatedData">
                  <v-list-tile
                    @click="
                      viewRule(item._id);
                      selectDoc = item._id;
                    "
                    :key="i"
                    :class="listColor(item._id)"
                  >
                    <v-list-tile-action>
                      <v-icon color="green">zoom_in</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-title
                      v-text="`${item._id}${title_spacer}${item.title}`"
                      class="font-weight-medium"
                    ></v-list-tile-title>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
            <v-pagination
              v-model="intPageNo"
              :length="cPageCount"
              :total-visible="5"
              dark
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
            ></v-pagination>
          </v-flex>

          <!-- Rulebook Document ViewRuleContent -->
          <v-flex
            pl-1
            :class="userInfo.employee_code == 'japanese' ? 'sm9' : 'sm12'"
            v-if="rulecontent"
          >
            <v-card flat>
              <v-toolbar flat>
                <v-toolbar-title>{{ viewedRule._id }}</v-toolbar-title>
                <v-btn round color="success">
                  <a
                    style="color: #ffffff"
                    target="_blank"
                    :href="`http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${viewedRule._id}.pdf`"
                  >
                    Open
                    <v-icon right>picture_as_pdf</v-icon>
                  </a>
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  color="success"
                  @click="
                    searchGoogle = true;
                    rulecontent = false;
                    selectDoc = '';
                  "
                  >Back</v-btn
                >
                <template
                  v-if="
                    this.userInfo.designation === 'Japanese Advisor' ||
                    this.userInfo.employee_code === '00136'
                  "
                >
                  <v-tooltip bottom>
                    <v-icon
                      large
                      slot="activator"
                      @click="approvedDialog = true"
                      >playlist_add_check</v-icon
                    >
                    <span>Approved Document</span>
                  </v-tooltip>
                </template>
                <v-tooltip bottom>
                  <v-icon
                    large
                    slot="activator"
                    @click="
                      historyDialog = true;
                      sortHistory();
                    "
                    >art_track</v-icon
                  >
                  <span>View History</span>
                </v-tooltip>
              </v-toolbar>
              <v-layout row wrap>
                <template class="ma-0 pa-0">
                  <v-flex xs12>
                    <a-row type="flex" justify="start">
                      <a-col>
                        <v-btn round flat class="disabled">
                          メール アドレス:&nbsp;&nbsp;
                          <span
                            v-if="
                              viewedRule.data[viewedRule.version - 1]
                                .MailAddress
                            "
                          >
                            {{
                              viewedRule.data[viewedRule.version - 1]
                                .MailAddress
                            }}
                          </span>
                          <span v-else>N/A</span>
                        </v-btn>
                      </a-col>
                      <a-col>
                        <v-btn round flat class="disabled">
                          開始時期:&nbsp;&nbsp;
                          <span
                            v-if="
                              viewedRule.data[viewedRule.data.length - 1]
                                .BeginningPeriod
                            "
                          >
                            {{
                              viewedRule.data[viewedRule.data.length - 1]
                                .BeginningPeriod
                            }}
                          </span>
                          <span v-else>N/A</span>
                        </v-btn>
                      </a-col>
                    </a-row>
                    <a-row type="flex" justify="start">
                      <a-col>
                        <v-btn round flat class="disabled">
                          システム更新日:&nbsp;&nbsp;
                          <span
                            v-if="
                              viewedRule.data[viewedRule.data.length - 1]
                                .UpdatedDate
                            "
                          >
                            {{
                              viewedRule.data[viewedRule.data.length - 1]
                                .UpdatedDate
                            }}
                          </span>
                          <span v-else>N/A</span>
                        </v-btn>
                      </a-col>
                      <a-col>
                        <v-btn round flat class="disabled">
                          ルールブック更新日:&nbsp;&nbsp;
                          <span v-if="viewedRule.RulebookUpdatedDate">
                            {{ viewedRule.RulebookUpdatedDate }}
                          </span>
                          <span v-else>N/A</span>
                        </v-btn>
                      </a-col>
                    </a-row>
                  </v-flex>
                  <v-flex xs3>
                    <v-btn round flat class="disabled">
                      製品区分&nbsp;-&nbsp;
                      <span
                        v-if="
                          viewedRule.data[viewedRule.version - 1].SeihinKubun
                        "
                      >
                        {{
                          viewedRule.data[viewedRule.version - 1].SeihinKubun
                        }}
                      </span>
                      <span v-else>N/A</span>
                    </v-btn>
                  </v-flex>
                  <v-flex xs3>
                    <v-btn round flat class="disabled">
                      担当&nbsp;-&nbsp;
                      <span
                        v-if="viewedRule.data[viewedRule.version - 1].Tantou"
                      >
                        {{ viewedRule.data[viewedRule.version - 1].Tantou }}
                      </span>
                      <span v-else>N/A</span>
                    </v-btn>
                  </v-flex>

                  <v-flex xs3>
                    <v-btn round flat class="disabled">
                      担当 部署:&nbsp;&nbsp;
                      <span
                        v-if="
                          viewedRule.data[viewedRule.version - 1].TantouBusho
                        "
                      >
                        {{
                          viewedRule.data[viewedRule.version - 1].TantouBusho
                        }}
                      </span>
                      <span v-else>N/A</span>
                    </v-btn>
                  </v-flex>
                  <v-flex xs3>
                    <v-btn round flat class="disabled">
                      適用区分&nbsp;-&nbsp;
                      <span
                        v-if="
                          viewedRule.data[viewedRule.version - 1].TekiyouKubun
                        "
                      >
                        {{
                          viewedRule.data[viewedRule.version - 1].TekiyouKubun
                        }}
                      </span>
                      <span v-else>N/A</span>
                    </v-btn>
                  </v-flex>
                  <!-- row2****************************************************************** -->
                  <!-- <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].YumeNoIe"
                      >check_circle_outline</v-icon>
                      <v-icon v-else>close</v-icon>&nbsp;夢の家
                    </v-btn>
                  </v-flex>

                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Ippan"
                      >check_circle_outline</v-icon>
                      <v-icon v-else>close</v-icon>&nbsp;一般
                    </v-btn>
                  </v-flex>

                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Taishin"
                      >check_circle_outline</v-icon>
                      <v-icon v-else>close</v-icon>&nbsp;耐震
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Menshin"
                      >check_circle_outline</v-icon>
                      <v-icon v-else>close</v-icon>&nbsp;免震
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Icube"
                      >check_circle_outline</v-icon>
                      <v-icon v-else>close</v-icon>&nbsp;Icube
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Ismart"
                      >check_circle_outline</v-icon>
                      <v-icon v-else>close</v-icon>&nbsp;Ismart
                    </v-btn>
                  </v-flex>-->
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].YumeNoIe"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;夢の家
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Ippan"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;一般
                    </v-btn>
                  </v-flex>

                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon v-if="viewedRule.data[viewedRule.version - 1].G"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;グランド セゾン
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon v-if="viewedRule.data[viewedRule.version - 1].F"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;セゾンF
                    </v-btn>
                  </v-flex>
                  <!-- </v-layout> -->
                  <!-- </v-flex> -->

                  <!-- <v-flex xs4> -->
                  <!-- <v-layout row wrap> -->
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon v-if="viewedRule.data[viewedRule.version - 1].A"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;セゾンA
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon v-if="viewedRule.data[viewedRule.version - 1].B"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;ブリアール
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1]['F2-TD']"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;セゾンF2-TD
                    </v-btn>
                  </v-flex>

                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Icube"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;Icube
                    </v-btn>
                  </v-flex>
                  <!-- </v-layout> -->
                  <!-- </v-flex> -->

                  <!-- <v-flex xs4> -->
                  <!-- <v-layout row wrap> -->
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Ismart"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;Ismart
                    </v-btn>
                  </v-flex>

                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Ismile"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;Ismile
                    </v-btn>
                  </v-flex>

                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Taishin"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;耐震
                    </v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn round flat class="disabled">
                      <v-icon
                        v-if="viewedRule.data[viewedRule.version - 1].Menshin"
                        >check_circle_outline</v-icon
                      >
                      <v-icon v-else>close</v-icon>&nbsp;免震
                    </v-btn>
                  </v-flex>
                  <!-- row3****************************************************************** -->
                  <v-flex xs12>
                    <v-layout pl-4>
                      <p>件名: &nbsp;</p>
                      <p>
                        <span
                          style="font-size: 18px; padding-top: 0"
                          v-html="
                            viewedRule.data[viewedRule.version - 1].RuleKenmei
                          "
                        ></span>
                      </p>
                    </v-layout>
                    <br />
                    <hr />
                  </v-flex>
                  <v-flex
                    xs12
                    v-for="(item, index) in viewedRule.data[
                      viewedRule.version - 1
                    ].content"
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
        </v-layout>

        <!-- dialog*********************************************************************************** -->
        <v-dialog v-model="historyDialog" width="500">
          <v-card>
            <v-list>
              <template v-for="(item, index) in historyDetails">
                <v-list-tile @click="viewHistory(index)" :key="index">
                  <v-list-tile-content>
                    {{ index + 1 }} . {{ item.UpdatedDate }}&emsp;{{
                      item.ApprovalRemarks
                    }}
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-dialog>

        <v-dialog width="500" v-model="approvedDialog">
          <v-card>
            <v-toolbar dense flat color="#FAFAFA">
              <v-toolbar-title>Confirmation</v-toolbar-title>
              <v-spacer />
              <v-icon @click="approvedDialog = false">mdi-close</v-icon>
            </v-toolbar>
            <v-layout pa-2 row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="approvalRemarks"
                  label="Remarks (if disapproved)"
                ></v-text-field>
              </v-flex>
              <v-btn @click="approvedDocs" color="green accent-3"
                >approved</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn @click="disapprovedDocs" color="red accent-3"
                >disapproved</v-btn
              >
            </v-layout>
          </v-card>
        </v-dialog>

        <!-- <v-dialog width="500" v-model="searchDialog">
          <v-card hover>
            <v-layout row wrap pa-2>
              <v-text-field
                @keyup.enter="onSearch()"
                append-icon="search"
                label="Search Text"
                v-model="searchText"
              ></v-text-field>
            </v-layout>
          </v-card>
        </v-dialog>-->
      </a-tab-pane>
      <a-tab-pane key="2" tab="JWW/DXF Files">
        <v-toolbar flat dense>
          <a-input
            style="width: 20%"
            v-model="toSearchJWW"
            placeholder="Search 品番"
            append-icon="search"
            outlined
          ></a-input
          >&emsp;&emsp; <span style="font-weight: bold">品種:</span> &emsp;
          <a-select v-model="Variety" style="width: 30%">
            <a-select-option
              v-for="item in OptVariety"
              :key="item"
              v-value="item"
              >{{ item }}</a-select-option
            > </a-select
          >&emsp; <span style="font-weight: bold">Specifications:</span> &emsp;
          <a-select mode="multiple" v-model="Specifications" style="width: 20%">
            <a-select-option
              v-for="item in OptSpecs"
              :key="item.value"
              v-value="item.value"
              >{{ item.text }}</a-select-option
            >
          </a-select>
          <v-spacer />
          Total Records: {{ filteredJWW.length }}
        </v-toolbar>
        <a-table
          :columns="columns"
          :data-source="filteredJWW"
          :pagination="pagination"
          bordered
        >
          <span slot="JWWFile" slot-scope="text, record">
            <a :href="record.JWWFile">データリンク</a>
          </span>
          <span slot="DXFFile" slot-scope="text, record">
            <a :href="record.DXFFile">データリンク</a>
          </span>
          <span slot="Ippan" slot-scope="text, record">
            <v-icon v-if="record.Ippan" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
          <span slot="YumeNoIe" slot-scope="text, record">
            <v-icon v-if="record.YumeNoIe" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
          <span slot="G" slot-scope="text, record">
            <v-icon v-if="record.G" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
          <span slot="F" slot-scope="text, record">
            <v-icon v-if="record.F" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
          <span slot="A" slot-scope="text, record">
            <v-icon v-if="record.A" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
          <span slot="B" slot-scope="text, record">
            <v-icon v-if="record.B" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
          <span slot="iCube" slot-scope="text, record">
            <v-icon v-if="record.iCube" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
          <span slot="iSmart" slot-scope="text, record">
            <v-icon v-if="record.iSmart" style="font-size: 18px"
              >mdi-circle-outline</v-icon
            >
            <!-- <v-icon v-else> </v-icon> -->
          </span>
        </a-table>
      </a-tab-pane>
      <!-- 
      <a-tab-pane key="4" tab="Comment, Suggestion, and Feedback">
        <feed-back></feed-back>
      </a-tab-pane> -->
    </a-tabs>
  </v-container>
</template>

<script>
// var wshShell = new ActiveXObject("WScript.Shell");
const columns = [
  {
    dataIndex: "variety",
    key: "variety",
    title: "品種",
  },
  {
    title: "品番",
    dataIndex: "hinban",
    key: "hinban",
  },
  {
    title: "部材説明",
    dataIndex: "buzai",
    key: "buzai",
  },
  {
    title: "JWW",
    key: "JWWFile",
    dataIndex: "JWWFile",
    scopedSlots: { customRender: "JWWFile" },
  },
  {
    title: "DXF",
    key: "DXFFile",
    dataIndex: "DXFFile",
    scopedSlots: { customRender: "DXFFile" },
  },
  {
    title: "一般工法",
    key: "Ippan",
    dataIndex: "Ippan",
    scopedSlots: { customRender: "Ippan" },
  },
  {
    title: "夢の家",
    key: "YumeNoIe",
    dataIndex: "YumeNoIe",
    scopedSlots: { customRender: "YumeNoIe" },
  },
  {
    title: "G",
    key: "G",
    dataIndex: "G",
    scopedSlots: { customRender: "G" },
  },
  {
    title: "F",
    key: "F",
    dataIndex: "F",
    scopedSlots: { customRender: "F" },
  },
  {
    title: "A",
    key: "A",
    dataIndex: "A",
    scopedSlots: { customRender: "A" },
  },
  {
    title: "B",
    key: "B",
    dataIndex: "B",
    scopedSlots: { customRender: "B" },
  },
  {
    title: "i-cube",
    key: "iCube",
    dataIndex: "iCube",
    scopedSlots: { customRender: "iCube" },
  },
  {
    title: "i-smart",
    key: "iSmart",
    dataIndex: "iSmart",
    scopedSlots: { customRender: "iSmart" },
  },
];

import axios from "axios";
import Swal from "sweetalert2";
// import {
//   tokenize,
//   isHiragana,
//   isKatakana,
//   toHiragana,
//   toKatakana,
// } from "wanakana";
import { mask } from "vue-the-mask";
// import document from "../components/Document";
// import VueHtml2pdf from "vue-html2pdf";
import moji from "moji";

export default {
  directives: {
    mask,
  },
  components: {
    // document,
    // VueHtml2pdf,
    // FeedBack: () => import("./FeedBack"),
  },
  data() {
    return {
      sortByProductTypeASC: false,
      sortByProductTypeDES: false,
      sortByMethodASC: false,
      sortByMethodDES: false,
      sortByCriteriaASC: false,
      sortByCriteriaDES: false,
      sortByDateASC: false,
      sortByDateDES: false,
      printPreview: false,
      isMultiple: false,
      columns,
      title_spacer: "　",
      selectedCondition: "",
      intPageNo: 1,
      intRowNoRulebookDocument: 11,
      intRowNoSearchDocument: 30,
      condition: ["OR", "AND", "MULTI"],
      rulecontent: false,
      googleRules: [],
      searchGoogle: true,
      updatedRules: [],
      viewedRule: {
        approver: "",
        criteria: "",
        data: [
          {
            SeihinKubun: "",
            KanriBangou: "",
            RuleKenmei: "",
            Kubun: "",
            YumeNoIe: true,
            Ippan: true,
            Icube: false,
            Ismart: false,
            Taishin: true,
            Menshin: true,
            Tantou: "",
            MailAddress: "",
            TantouBusho: "",
            TekiyouKubun: "",
            UpdatedDate: "",
          },
        ],
        documentType: "RULEBOOK",
        isApproved: true,
        method: "JIKU",
        productType: "外部付帯",
        updated: true,
        version: 1,
        _id: "",
        _rev: "0",
      },
      toSearch: "",
      approvalRemarks: "",
      approvedDialog: false,
      historyDialog: false,
      searchDialog: false,
      searchText: "",
      docStatus: "approved",
      docStatusOption: ["approved", "for approval", "obsolete"],
      hideResult: true,
      loading: true,
      selectDoc: "",
      searchLists: [],
      criteriaList: ["ALL", "ルール", "製品仕様", "基本図面", "パターン"],
      // criteriaList: [
      //   {text:"ALL", value:""},
      //    {text: "ルール" ,value: "ルール"},
      //   {text:"製品仕様", value:"製品仕様"},
      //   {text:"基本図面", value:"基本図面"},
      //   {text:"パターン", value:"パターン一覧"},
      //   ],
      selectedCriteria: "",
      methodList: [
        { text: "ALL", value: "ALL" },
        { text: "軸組", value: "JIKU" },
        { text: "枠組", value: "WAKU" },
      ],
      selectedMethod: "",
      selectedproductType: "",
      productTypeList: [
        `ALL`,
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
      loading2: false,
      listData: [],
      toSearchJWW: "",
      pagination: {
        // onChange: (page) => {
        // },
        // pageSize: 6,
      },
      OptVariety: [
        "All",
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
      Variety: "All",
      OptSpecs: [
        { text: "All", value: "All" },
        { text: "一般工法", value: "Ippan" },
        { text: "夢の家", value: "YumeNoIe" },
        { text: "G", value: "G" },
        { text: "F", value: "F" },
        { text: "A", value: "A" },
        { text: "B", value: "B" },
        { text: "i-cube", value: "iCube" },
        { text: "i-smart", value: "iSmart" },
      ],
      Specifications: ["All"],
      buildingTypeList: [
        { text: "ALL", value: "ALL" },
        { text: "夢の家", value: "YumeNoIe" },
        { text: "一般", value: "Ippan" },
        { text: "グランド セゾン", value: "G" },
        { text: "セゾンF", value: "F" },
        { text: "セゾンA", value: "A" },
        { text: "ブリアール", value: "B" },
        { text: "セゾンF2-TD", value: "F2-TD" },
        { text: "i-cube", value: "Icube" },
        { text: "i-smart", value: "Ismart" },
        { text: "i-smile", value: "Ismile" },
      ],
      buildingSpecificationList: [
        { text: "ALL", value: "ALL" },
        { text: "耐震", value: "Taishin" },
        { text: "免震", value: "Menshin" },
      ],
      selectedBuildingType: ["ALL"],
      selectedBuildingSpecification: ["ALL"],
      historyDetails: "",
      // dateFrom: new Date().toISOString().substr(0, 10),
      // dateTo: new Date().toISOString().substr(0, 10),
      dateFrom: "",
      dateTo: "",
      dateFromMenu: false,
      dateToMenu: false,
      mask: "####-##-##",
      synonymsData: [],
      searchRulebookIconAlignment: false,
    };
  },
  created() {
    if (this.userInfo.employee_code != "japanese") {
      this.searchGoogle = true;
    }
    this.loading2 = true;
    this.docStatus = "approved";
    this.getDataRules();
    this.selectedCondition = "AND";
    this.selectedCriteria = "ALL";
    this.selectedMethod = "ALL";
    this.selectedproductType = "ALL";
    this.loadFile();
    this.loadAllDocs();
    // this.loadSynonyms();
    this.loading2 = false;
  },
  watch: {
    // searchText() {
    //   if (!this.searchText) {
    //     this.loading2 = true;
    //     this.isMultiple = false;
    //     this.loadAllDocs();
    //   }
    // },
    // searchText() {
    //     if(this.searchText) {
    //       this.searchRulebookIconAlignment = false
    //     }
    //     else {
    //       this.searchRulebookIconAlignment = true
    //     }
    // },
    dateTo() {
      if (this.dateTo < this.dateFrom) {
        this.dateTo = "";
      }
    },
    docStatus() {
      this.getDataRules();
    },
    selectedBuildingType() {
      if (
        this.selectedBuildingType.includes("ALL") &&
        this.selectedBuildingType.length == 2
      ) {
        this.selectedBuildingType.splice(0, 1);
      }
      if (this.selectedBuildingType.length == 0) {
        this.selectedBuildingType = ["ALL"];
      }
      if (
        this.selectedBuildingType.includes("ALL") &&
        this.selectedBuildingType.length != 1
      ) {
        this.selectedBuildingType = ["ALL"];
      }
    },

    selectedBuildingSpecification() {
      if (
        this.selectedBuildingSpecification.includes("ALL") &&
        this.selectedBuildingSpecification.length == 2
      ) {
        this.selectedBuildingSpecification.splice(0, 1);
      }
      if (this.selectedBuildingSpecification.length == 0) {
        this.selectedBuildingSpecification = ["ALL"];
      }
      if (
        this.selectedBuildingSpecification.includes("ALL") &&
        this.selectedBuildingSpecification.length != 1
      ) {
        this.selectedBuildingSpecification = ["ALL"];
      }
    },

    Specifications() {
      if (
        this.Specifications.includes("All") &&
        this.Specifications.length == 2
      ) {
        this.Specifications.splice(0, 1);
      }
      if (this.Specifications.length == 0) {
        this.Specifications = ["All"];
      }
      if (
        this.Specifications.includes("All") &&
        this.Specifications.length != 1
      ) {
        this.Specifications = ["All"];
      }
    },
  },
  methods: {
    generateReport() {
      this.printPreview = true;
      this.$refs.html2Pdf.generatePdf();
    },
    print() {
      // this.$htmlToPaper("print");
      window.print();
    },
    clearSearch() {
      this.searchRulebookIconAlignment = false;
      this.loading2 = true;
      this.isMultiple = false;
      this.loadAllDocs();
      this.searchText = "";
    },
    Copy() {
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Copy mail address to clipboard",
        showConfirmButton: false,
        timer: 800,
      });
    },
    convert2FullKatakana(str) {
      var kanaMap = {
        ｶﾞ: "ガ",
        ｷﾞ: "ギ",
        ｸﾞ: "グ",
        ｹﾞ: "ゲ",
        ｺﾞ: "ゴ",
        ｻﾞ: "ザ",
        ｼﾞ: "ジ",
        ｽﾞ: "ズ",
        ｾﾞ: "ゼ",
        ｿﾞ: "ゾ",
        ﾀﾞ: "ダ",
        ﾁﾞ: "ヂ",
        ﾂﾞ: "ヅ",
        ﾃﾞ: "デ",
        ﾄﾞ: "ド",
        ﾊﾞ: "バ",
        ﾋﾞ: "ビ",
        ﾌﾞ: "ブ",
        ﾍﾞ: "ベ",
        ﾎﾞ: "ボ",
        ﾊﾟ: "パ",
        ﾋﾟ: "ピ",
        ﾌﾟ: "プ",
        ﾍﾟ: "ペ",
        ﾎﾟ: "ポ",
        ｳﾞ: "ヴ",
        ﾜﾞ: "ヷ",
        ｦﾞ: "ヺ",
        ｱ: "ア",
        ｲ: "イ",
        ｳ: "ウ",
        ｴ: "エ",
        ｵ: "オ",
        ｶ: "カ",
        ｷ: "キ",
        ｸ: "ク",
        ｹ: "ケ",
        ｺ: "コ",
        ｻ: "サ",
        ｼ: "シ",
        ｽ: "ス",
        ｾ: "セ",
        ｿ: "ソ",
        ﾀ: "タ",
        ﾁ: "チ",
        ﾂ: "ツ",
        ﾃ: "テ",
        ﾄ: "ト",
        ﾅ: "ナ",
        ﾆ: "ニ",
        ﾇ: "ヌ",
        ﾈ: "ネ",
        ﾉ: "ノ",
        ﾊ: "ハ",
        ﾋ: "ヒ",
        ﾌ: "フ",
        ﾍ: "ヘ",
        ﾎ: "ホ",
        ﾏ: "マ",
        ﾐ: "ミ",
        ﾑ: "ム",
        ﾒ: "メ",
        ﾓ: "モ",
        ﾔ: "ヤ",
        ﾕ: "ユ",
        ﾖ: "ヨ",
        ﾗ: "ラ",
        ﾘ: "リ",
        ﾙ: "ル",
        ﾚ: "レ",
        ﾛ: "ロ",
        ﾜ: "ワ",
        ｦ: "ヲ",
        ﾝ: "ン",
        ｧ: "ァ",
        ｨ: "ィ",
        ｩ: "ゥ",
        ｪ: "ェ",
        ｫ: "ォ",
        ｯ: "ッ",
        ｬ: "ャ",
        ｭ: "ュ",
        ｮ: "ョ",
        "｡": "。",
        "､": "、",
        ｰ: "ー",
        "｢": "「",
        "｣": "」",
        "･": "・",
      };

      var reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
      return str
        .replace(reg, function (match) {
          return kanaMap[match];
        })
        .replace(/ﾞ/g, "゛")
        .replace(/ﾟ/g, "゜");
    },
    convert2FullHiragana(str) {
      var kanaMap = {
        ぁ: "あ",
        ぃ: "い",
        ぅ: "う",
        ぇ: "え",
        ぉ: "お",
        ゃ: "や",
        ゅ: "ゆ",
        ょ: "よ",
      };

      var reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
      return str.replace(reg, function (match) {
        return kanaMap[match];
      });
    },
    loadFile() {
      axios.defaults.headers.common["x-api-key"] =
        "H8Pt5n6cbFk95UiXQjwZ9cwu6mcZqfF2rTw3HeS3";
      let url = `${this.api}getAllFiles?docType=JWW`;
      axios.get(url).then((res) => {
        res.data = res.data.map((rec, index) => {
          rec.key = index;
          rec.filename = rec.DXFFile;
          rec.JWWFile = encodeURI(
            `http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${rec.JWWFile}`
          );
          rec.DXFFile = encodeURI(
            `http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${rec.DXFFile}`
          );

          return rec;
        });

        this.listData = res.data;
      });
    },
    callback() {
      // this.rulecontent = false;
      this.searchGoogle = true;
      this.rulecontent = false;
      this.selectDoc = "";
    },
    listColor(id) {
      if (id == this.selectDoc) {
        return "bgYellow";
      } else return "bgWhite";
    },

    listColorSearch(id) {
      if (this.searchLists.includes(id)) {
        return "viewed";
      }
    },
    getDataRules() {
      this.updatedRules = [];
      this.loading = true;

      if (this.docStatus != "obsolete") {
        let url = `${this.api}get/updated_rules/${this.docStatus}`;
        axios.get(url).then((res) => {
          this.updatedRules = res.data;

          this.updatedRules = this.updatedRules.map((a) => {
            if (a.title) {
              a.title = a.title.replace(/<br>/gi, "\n");
            }
            return a;
          });

          this.loading = false;
        });
      } else {
        let url = `${this.api}get/all/obsolete`;
        axios.get(url).then((res) => {
          this.updatedRules = res.data;

          this.updatedRules = this.updatedRules.map((a) => {
            a.title = a.title.replace(/<br>/gi, "\n");
            return a;
          });

          this.loading = false;
        });
      }
    },
    viewRule(val) {
      // this.viewedRule = [];

      let url = `${this.api}get/this/${val}`;
      axios.get(url).then((res) => {
        this.viewedRule = res.data;
      });
      this.searchGoogle = false;
      this.rulecontent = true;
    },
    viewRuleContent(val) {
      let url = "";
      if (!this.isMultiple) {
        if (this.searchText && this.searchText.match(/[^0-9]/gi) != "-") {
          let search = this.convert2FullKatakana(this.searchText);
          search = this.convert2FullHiragana(this.searchText);
          url = `${this.api}get/morethanthis/test/${val}?search=${search}`;
          axios.get(url).then((res) => {
            this.viewedRule = res.data;
          });
        } else {
          url = url = `${this.api}get/this/${val}`;
          axios.get(url).then((res) => {
            this.viewedRule = res.data;
          });
        }
      } else {
        if (this.searchText) {
          let search = this.convert2FullKatakana(this.searchText);
          url = `${this.api}get/morethanthis/multiple/${val}?search=${search}`;
          axios.get(url).then((res) => {
            this.viewedRule = {};
            this.viewedRule = res.data;
          });
        }
      }

      this.rulecontent = true;
      this.searchGoogle = false;
    },
    viewHistory(val) {
      this.viewedRule.version = val + 1;
      // this.historyDialog = false
    },
    splitSelectedSpecs() {
      this.selectedBuildingType = this.selectedBuildingType.split(",");
    },
    onSearch() {
      axios.defaults.headers.common["x-api-key"] =
        "H8Pt5n6cbFk95UiXQjwZ9cwu6mcZqfF2rTw3HeS3";
      this.searchRulebookIconAlignment = true;
      this.isMultiple = false;
      // this.$router.push("?type=SEARCH");
      // console.log(
      //   tokenize(this.searchText, {
      //     detailed: true,
      //   })
      // );
      // console.log(isHiragana(this.searchText));
      // console.log(isKatakana(this.searchText));
      // console.log(toHiragana(this.searchText));
      // console.log(toKatakana(this.searchText));

      let search = this.convert2FullKatakana(this.searchText);
      // search = this.convert2FullHiragana(this.searchText);
      // console.log("1", search);

      // console.log(this.convert2FullKatakana(this.searchText));
      this.searchLists = [];
      // this.googleRules = [];
      if (this.searchText != "") {
        this.loading2 = true;
        // window.location.href = `http://${window.location.host}?search=${this.searchText}`;
      }
      // if (!this.searchText) {
      //   this.loading2 = true;
      //   // this.loadAllDocs();
      // }
      if (this.searchText) {
        let url = "";
        if (this.selectedCondition == "OR") {
          let ishiragana = moji(search).filter("HG").toString();
          let iskatakana = moji(search).filter("KK").toString();
          let hiragana = "";
          let katakana = "";
          // console.log(ishiragana);
          // console.log(iskatakana);
          if (ishiragana) {
            hiragana = moji(this.searchText).convert("HG", "KK").toString();
            search = `${search}${this.title_spacer}${hiragana}`;
          } else if (iskatakana) {
            search = this.convert2FullKatakana(this.searchText);
            katakana = moji(search).convert("KK", "HG").toString();
            // console.log(katakana);
            // this.searchText
            search = this.convert2FullKatakana(search);
            katakana = this.convert2FullHiragana(katakana);
            search = `${search}${this.title_spacer}${katakana}`;
          } else {
            // console.log(combine)
            search = this.convert2FullKatakana(this.searchText);
          }
          url = `${this.api}get/title_rules?search=${search}`;
        } else {
          url = `${this.api}get/title_rules/and?search=${search}`;
        }
        // console.log(url);
        axios.get(url).then((res) => {
          this.googleRules = res.data;
          console.log(this.googleRules);
          this.searchDialog = false;
          this.loading2 = false;
        });
        this.hideResult = false;
      } else {
        this.googleRules = [];
        this.hideResult = true;
      }
      this.searchGoogle = true;
      this.rulecontent = false;
    },

    onMultipleSearch() {
      this.searchRulebookIconAlignment = true;
      // this.$router.push("?type=SEARCH");
      this.isMultiple = true;
      // console.log(
      //   tokenize(this.searchText, {
      //     detailed: true,
      //   })
      // );

      let search = this.convert2FullKatakana(this.searchText);
      // console.log(search);
      // console.log(this.convert2FullKatakana(this.searchText));
      this.searchLists = [];
      // this.googleRules = [];
      if (this.searchText != "") {
        this.loading2 = true;
        // window.location.href = `http://${window.location.host}?search=${this.searchText}`;
      }
      // if (!this.searchText) {
      //   this.loading2 = true;
      //   // this.loadAllDocs();
      // }

      if (this.searchText) {
        axios.defaults.headers.common["x-api-key"] =
          "H8Pt5n6cbFk95UiXQjwZ9cwu6mcZqfF2rTw3HeS3";
        let url = "";
        // if (this.selectedCondition == "OR") {
        url = `${this.api}get/multiple_rules?search=${search}&criteria=${
          this.selectedCriteria
        }&method=${this.selectedMethod}&productType=${
          this.selectedproductType
        }&specs=${this.selectedBuildingType.toString()}`;
        // } else {
        //   url = `${this.api}get/multiple_rules/and?search=${search}&criteria=${
        //     this.selectedCriteria
        //   }&method=${this.selectedMethod}&productType=${
        //     this.selectedproductType
        //   }&specs=${this.selectedBuildingType.toString()}`;
        // }
        // console.log(url);
        axios.get(url).then((res) => {
          // console.log(res.data);
          if (typeof res.data != "string") {
            this.googleRules = res.data;
          } else {
            // Swal.fire({
            //   icon: "error",
            //   title: res.data,
            // });
            this.loading2 = true;
            // this.searchText = "";
            // this.loadAllDocs();
            this.selectedCondition = "OR";
            this.onSearch();

            this.isMultiple = false;
          }
          this.getDataRules();
          this.approvedDialog = false;
          this.searchDialog = false;
          this.loading2 = false;
        });
        this.hideResult = false;
      } else {
        this.googleRules = [];
        this.hideResult = true;
      }
      this.searchGoogle = true;
      this.rulecontent = false;
    },

    disapprovedDocs() {
      if (this.approvalRemarks) {
        this.viewedRule.isApproved = "disapproved";
        this.viewedRule.approver = this.userInfo.full_name;
        this.viewedRule.approvalRemarks = this.approvalRemarks;
        let toUpdate = {};
        toUpdate.isApproved = "disapproved";
        toUpdate.approver = this.userInfo.full_name;
        toUpdate._id = this.viewedRule._id;
        toUpdate.approvalRemarks = this.approvalRemarks;
        let url = `${this.api}update/document`;
        axios.post(url, toUpdate).then((res) => {
          this.viewedRule._rev = res.data.rev;
          Swal.fire({
            icon: "error",
            title: "Disapproved.",
          });
          this.getDataRules();
          this.approvedDialog = false;
          this.rulecontent = false;
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Please add remarks.",
        });
      }
    },
    approvedDocs() {
      this.viewedRule.isApproved = true;
      this.viewedRule.approver = this.userInfo.full_name;
      let toUpdate = {};
      toUpdate.isApproved = true;
      toUpdate.approver = this.userInfo.full_name;
      toUpdate._id = this.viewedRule._id;
      let url = `${this.api}update/document`;
      axios.post(url, toUpdate).then((res) => {
        this.viewedRule._rev = res.data.rev;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Approved !",
          showConfirmButton: false,
          timer: 1500,
        });
        this.getDataRules();
        this.approvedDialog = false;
      });
    },

    getRdoc(val) {
      this.docStatus = val;
    },
    loadAllDocs() {
      this.isMultiple = false;
      let url = `${this.api}getAllDocs?docType=RULEBOOK&method=${this.selectedMethod}&criteria=${this.selectedCriteria}&productType=${this.selectedproductType}`;
      axios.get(url).then((res) => {
        this.googleRules = res.data.map((r) => {
          let i = 0;
          r.key = i++;
          return r;
        });
        this.loading2 = false;
      });
    },
    SpecInclude(specs) {
      return this.Specifications.includes(specs);
    },

    sortHistory() {
      let viewedRuleDataHolder = this.viewedRule.data;
      this.historyDetails = viewedRuleDataHolder.reverse();
    },
    onChangeDate(date, datestring) {
      this.dateFrom = datestring[0];
      this.dateTo = datestring[1];
    },

    loadSynonyms() {
      axios.get(`${this.api}get/SynonymChars`).then((res) => {
        this.synonymsData = res.data;
      });
    },

    newSearch() {
      // let search = [];
      // if (this.searchText.includes(`${title_spacer}`)) {
      //   search = this.searchText.replace(/\s+/g, " ").split(" ");
      // } else {
      //   search = this.searchText.replace(/\s+/g, " ").split(" ");
      // }

      // let Multiple = await this.synonymsData.data
      //   .map((rec, index) => {
      //     return search.filter((rec2) => {
      //       if (rec.indexOf(rec2) >= 0) {
      //         return rec;
      //       }
      //     });
      //   })
      //   .filter((rec) => {
      //     return rec.length > 0;
      //   });
      // // console.log(Multiple);
      // await Multiple.map((rec) => {
      //   console.log(rec, search);
      //   // if (search.includes(rec)) {
      //   search.splice(search.indexOf(rec[0]), 1);
      //   // }
      // });
      // console.log(search.toString().replace(",", " "));
      // console.log(Multiple.toString().replace(",", " "));

      // await this.onSearch(search.toString().replace(",", " "));
      // await this.onMultipleSearch(Multiple.toString().replace(",", " "));
      // this.onMultipleSearch();
      // this.onSearch();

      if (this.synonymsData.data.toString().includes(this.searchText)) {
        this.onMultipleSearch();
      } else {
        this.onSearch();
      }
    },
  },
  computed: {
    htmlToPdfOptions() {
      return {
        margin: 0,
        filename: this.viewedRule._id,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        enableLinks: true,
        html2canvas: {
          scale: 100,
          // useCORS: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };
    },
    filteredSpecs() {
      if (this.listData.length > 0) {
        let notAll = this.SpecInclude("All");
        return this.listData
          .filter((r) => {
            if (this.Variety == "All") {
              return r;
            } else {
              return r.variety == this.Variety;
            }
          })
          .filter((s) => {
            if (this.SpecInclude("All")) {
              return s;
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("Ippan") && !notAll) {
              return r.Ippan;
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("YumeNoIe") && !notAll) {
              return r["YumeNoIe"];
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("G") && !notAll) {
              return r["G"];
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("F") && !notAll) {
              return r["F"];
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("A") && !notAll) {
              return r["A"];
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("B") && !notAll) {
              return r["B"];
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("iCube") && !notAll) {
              return r["iCube"];
            } else {
              return [];
            }
          })
          .filter((r) => {
            if (this.SpecInclude("iSmart") && !notAll) {
              return r["iSmart"];
            } else {
              return [];
            }
          });
      } else {
        return [];
      }
    },
    filteredJWW() {
      if (this.filteredSpecs.length > 0) {
        return this.filteredSpecs.filter((data) => {
          if (typeof data.hinban == "number") {
            data.hinban = `${data.hinban}`;
          }
          return data.hinban.includes(this.toSearchJWW);
        });

        // .filter((s) => {
        //   if (this.Specifications == ["All"]) {
        //     return r;
        //   } else {
        //     if (this.Specifications.includes("Ippan")) {
        //       return rec.Ippans;
        //     }
        //   }
        // });
      } else {
        return [];
      }
    },
    filteredItem() {
      if (this.updatedRules.length > 0) {
        return this.updatedRules.filter((data) => {
          return data._id.toLowerCase().includes(this.toSearch.toLowerCase());
        });
        // } else if (this.searchText) {
        //   return this.updatedRules
        //     .filter((r) => {
        //       if (this.selectedproductType != "ALL") {
        //         return r.productType == this.selectedproductType;
        //       } else {
        //         return r;
        //       }
        //     })
        //     .filter((r) => {
        //       if (this.selectedMethod != "ALL") {
        //         return r.method == this.selectedMethod;
        //       } else {
        //         return r;
        //       }
        //     })
        //     .filter((r) => {
        //       if (this.selectedCriteria != "ALL") {
        //         return r.criteria == this.selectedCriteria;
        //       } else {
        //         return r;
        //       }
        //     });
      } else {
        return [];
      }
    },

    filteredGoogleRules() {
      let data = [];
      if (this.googleRules.length > 0) {
        //   return this.filteredRuleSpecs;
        // } else if (!this.searchText) {
        data = this.googleRules
          .filter((r) => {
            if (this.selectedproductType != "ALL") {
              return r.productType == this.selectedproductType;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (this.selectedMethod != "ALL") {
              return r.method == this.selectedMethod || r.method == "WAKU/JIKU";
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (this.selectedCriteria != "ALL") {
              return r.criteria == this.selectedCriteria;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("Ippan") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.Ippan == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("YumeNoIe") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.YumeNoIe == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("Icube") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.Icube == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("Ismart") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.Ismart == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("Ismile") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.Ismart == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingSpecification.includes("Taishin") &&
              !this.selectedBuildingSpecification.includes("ALL")
            ) {
              return r.Taishin == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingSpecification.includes("Menshin") &&
              !this.selectedBuildingSpecification.includes("ALL")
            ) {
              return r.Menshin == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (this.dateFrom) {
              return r.RulebookUpdatedDate >= `${this.dateFrom}`;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (this.dateTo) {
              return r.RulebookUpdatedDate <= `${this.dateTo}`;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("G") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.G == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("F") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.F == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("A") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.A == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("B") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r.B == true;
            } else {
              return r;
            }
          })
          .filter((r) => {
            if (
              this.selectedBuildingType.includes("F2-TD") &&
              !this.selectedBuildingType.includes("ALL")
            ) {
              return r["F2-TD"] == true;
            } else {
              return r;
            }
          });
      } else {
        data = [];
      }
      if (this.sortByProductTypeASC) {
        data.sort((a, b) => (a.productType > b.productType ? 1 : -1));
      }
      if (this.sortByProductTypeDES) {
        data.sort((a, b) => (a.productType < b.productType ? 1 : -1));
      }
      if (this.sortByMethodASC) {
        data.sort((a, b) => (a.method > b.method ? 1 : -1));
      }
      if (this.sortByMethodDES) {
        data.sort((a, b) => (a.method < b.method ? 1 : -1));
      }
      if (this.sortByCriteriaASC) {
        data.sort((a, b) => (a.criteria > b.criteria ? 1 : -1));
      }
      if (this.sortByCriteriaDES) {
        data.sort((a, b) => (a.criteria < b.criteria ? 1 : -1));
      }
      if (this.sortByDateASC) {
        data.sort((a, b) => {
          let key1 = a.RulebookUpdatedDate;
          let key2 = b.RulebookUpdatedDate;
          if (key1 < key2) {
            return -1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return 1;
          }
        });
      }
      if (this.sortByDateDES) {
        data.sort((a, b) => {
          let key1 = a.RulebookUpdatedDate;
          let key2 = b.RulebookUpdatedDate;
          if (key1 > key2) {
            return -1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return 1;
          }
        });
      }
      return data;
    },

    //Rulebook Document Data with pagination
    cPageCount() {
      let l = this.filteredItem.length,
        s = this.intRowNoRulebookDocument;
      return Math.ceil(l / s);
    },
    cPaginatedData() {
      const start = (this.intPageNo - 1) * this.intRowNoRulebookDocument,
        end = start + this.intRowNoRulebookDocument;
      return this.filteredItem.slice(start, end);
    },

    //Search Rulebook Document Data with pagination
    cPageCount2() {
      let l = this.filteredGoogleRules.length,
        s = this.intRowNoSearchDocument;
      return Math.ceil(l / s);
    },
    cPaginatedData2() {
      const start = (this.intPageNo - 1) * this.intRowNoSearchDocument,
        end = start + this.intRowNoSearchDocument;
      return this.filteredGoogleRules.slice(start, end);
    },
  },
};
</script>

<style>
.v-btn {
  border-radius: 28px !important;
}
.bgYellow {
  background-color: #a8e5f5;
}
.bgWhite {
  background-color: white;
}
.viewed {
  background-color: white;
  color: purple;
}
div {
  margin: 0 0 0 0;
}
thead.ant-table-thead > tr > th {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  text-align: left;
  color: #fafafa;
  background-color: gray;
  border-bottom: 1px solid #e8e8e8;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
}

.border {
  box-sizing: content-box;
  width: 80px;
  height: 20px;
  padding: 5px;
  border: 1px solid #c7c1c1;
}

.disabled {
  pointer-events: none;
}

#mycard {
  /* min-height: calc(100vh - 100px);
  max-height: calc(100vh - 100px); */
  overflow-y: auto;
  overflow-x: auto;
}

.test {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  text-align: left;
  color: #fafafa;
  background-color: gray;
  border-bottom: 1px solid #e8e8e8;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
}

#label {
  border-radius: 5px;
  font-size: 15px;
  padding: 0 0.5rem;
  color: honeydew;
}

div.ant-tabs-bar {
  margin: 0;
}
/* .print {
  background-color: white;
} */
@media only print {
  body {
    margin: 0mm;
    padding: 0mm;
  }
  /* #app {
    display: none !important;
  } */
  div.v-toolbar * {
    display: none !important;
  }
  div.v-toolbar__content * {
    display: none !important;
  }
  nav.v-toolbar.elevation-0.theme--light {
    display: none !important;
  }

  div.ant-tabs-nav-scroll * {
    display: none !important;
  }
  div.v-card.v-card--flat.v-sheet.theme--light {
    margin: 0mm;
    padding: 0mm;
  }
}
</style>
