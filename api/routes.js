const AWS = require("aws-sdk");
const express = require("express");
const jwt = require("jsonwebtoken");

const IS_OFFLINE = process.env.NODE_ENV !== "production"; //condition if local or AWS

const RULEBOOK_USERS_TBL =
  IS_OFFLINE === true ? "rulebook_users_tbl" : process.env.RULEBOOK_USERS_TBL;

const RULEBOOK_DOCUMENTS_TBL =
  IS_OFFLINE === true
    ? "rulebook_documents_tbl"
    : process.env.RULEBOOK_DOCUMENTS_TBL;

const dynamoDb =
  IS_OFFLINE === true
    ? new AWS.DynamoDB.DocumentClient({
        region: "eu-east-2",
        endpoint: "http://localhost:8000",
      })
    : new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("ルールブック AWS 📑💡");
  // res.send("ANNYEONG");
});

// //GET ALL DATA (list)
router.get("/getAllUsers", (req, res) => {
  const params = { TableName: RULEBOOK_USERS_TBL };
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      res.status(400).json({ error: "Error fetching the employees" });
    }
    res.send(result.Items);
  });
});

//GET USER INFO
router.get("/getUser/:email/:pass", (req, res) => {
  const params = {
    TableName: RULEBOOK_USERS_TBL,
    Key: { MailAddress: req.params.email },
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    if (result) {
      // res.send(result.Item);
      if (result.Item.Password == req.params.pass) {
        //Encryption
        let token = jwt.sign(
          { MailAddress: result.Item.MailAddress },
          process.env.SECRET_KEY,
          {
            expiresIn: 86400, // 12 hours
          }
        );

        res.status(200).send({
          user_info: result.Item,
          accessToken: token,
        });
      } else {
        res.send("error");
      }
    }
  });
});

router.get("/testtempdelo", (req, res) => {
  let item = {
    _id: "030619-26",
    _rev: "44-65a1544da73fe0f8d5c0ebb9b950ed8b",
    version: 5,
    updated: true,
    data: [
      {
        SeihinKubun: "外部付帯",
        KanriBangou: "030619-26",
        RuleKenmei:
          "スカイライトの水切り板金(ｶﾗｰ鉄板部および鉛板部)を現場交換することは可能か？",
        Kubun: "ルール",
        YumeNoIe: true,
        Ippan: true,
        Icube: false,
        Ismart: false,
        Taishin: true,
        Menshin: true,
        Tantou: "黒田",
        MailAddress: "i-yane-gaiheki@hrd-s.com",
        TantouBusho: "HRD開発",
        TekiyouKubun: "B",
        UpdatedDate: "2019-05-06 09:06:37",
      },
      {
        SeihinKubun: "外部付帯",
        KanriBangou: "030619-26",
        RuleKenmei:
          "スカイライトの水切り板金(ｶﾗｰ鉄板部および鉛板部)を現場交換することは可能か？",
        Kubun: "ルール",
        YumeNoIe: true,
        Ippan: true,
        Icube: false,
        Ismart: false,
        Taishin: true,
        Menshin: true,
        Tantou: "黒田",
        MailAddress: "i-yane-gaiheki@hrd-s.com",
        TantouBusho: "HRD開発",
        TekiyouKubun: "B",
        UpdatedDate: "2019-05-08 05:08:10",
        content: [
          '1. スカイライトの水切り板金は現場交換することは<span style="color: rgb(184, 49, 47);">対応不可</span>である。<div style="margin-left: 20px;">スカイライトの水切り板金は生産段階で全ての重なり部分をシーリング処理を行い、釘止めにて固定</div><div style="margin-left: 20px;">を行っているため、現場で交換を行うことは止水性能の低下を招くだけでなく、施工自体も非常に難</div><div style="margin-left: 20px;">しいものになるため<span style="color: rgb(184, 49, 47);">対応不可</span>である。</div><br><div style="margin-left: 20px;">※水切りが破損し、その場での補修が不能な場合はスカイライト本体ごと交換を行う。</div><div style="margin-left: 20px;"><br></div><div style="margin-left: 20px;"><img src="http://hrdapps48:5010/uploads/image/froala/test/0e506f8956ad10047f018cb1617b8e0d5831a638.PNG" style="width: 432px;" class="fr-dib"></div><div style="text-align: center;">図1-スカイライト横型(カラーベスト用)</div><div style="text-align: center;"><br></div><div style="text-align: center;">&nbsp;<img src="http://hrdapps48:5010/uploads/image/froala/test/12e05fe26ce9d9d613b67b26d85e46e0f7823626.PNG" style="width: 422px;" class="fr-dib"></div><div style="text-align: center;">図2-スカイライト横型(瓦用)</div><br>',
        ],
      },
      {
        SeihinKubun: "外部付帯",
        KanriBangou: "030619-26",
        RuleKenmei:
          "スカイライトの水切り板金(ｶﾗｰ鉄板部および鉛板部)を現場交換することは可能か？",
        Kubun: "ルール",
        YumeNoIe: true,
        Ippan: true,
        Icube: false,
        Ismart: false,
        Taishin: true,
        Menshin: true,
        Tantou: "黒田",
        MailAddress: "i-yane-gaiheki@hrd-s.com",
        TantouBusho: "HRD開発",
        TekiyouKubun: "B",
        UpdatedDate: "2019-07-22 08:05:38",
        content: [
          '1. スカイライトの水切り板金は現場交換することは<span style="color: rgb(184, 49, 47);">対応不可</span>である。<div style="margin-left: 20px;">スカイライトの水切り板金は生産段階で全ての重なり部分をシーリング処理を行い、釘止めにて固定</div><div style="margin-left: 20px;">を行っているため、現場で交換を行うことは止水性能の低下を招くだけでなく、施工自体も非常に難</div><div style="margin-left: 20px;">しいものになるため<span style="color: rgb(184, 49, 47);">対応不可</span>である。</div><br><div style="margin-left: 20px;">※水切りが破損し、その場での補修が不能な場合はスカイライト本体ごと交換を行う。</div><div style="margin-left: 20px;"><br></div><div style="margin-left: 20px;"><img src="http://hrdapps48:5010/uploads/image/froala/test/0e506f8956ad10047f018cb1617b8e0d5831a638.PNG" style="width: 432px;" class="fr-dib"></div><div style="text-align: center;">図1-スカイライト横型(カラーベスト用)</div><div style="text-align: center;"><br></div><div style="text-align: center;">&nbsp;<img src="http://hrdapps48:5010/uploads/image/froala/test/12e05fe26ce9d9d613b67b26d85e46e0f7823626.PNG" style="width: 422px;" class="fr-dib"></div><div style="text-align: center;">図2-スカイライト横型(瓦用)</div><br>',
        ],
        ApprovalRemarks: "test only",
      },
      {
        SeihinKubun: "外部付帯",
        KanriBangou: "030619-26",
        RuleKenmei:
          "スカイライトの水切り板金(ｶﾗｰ鉄板部および鉛板部)を現場交換することは可能か？",
        Kubun: "ルール",
        YumeNoIe: true,
        Ippan: true,
        Icube: false,
        Ismart: false,
        Taishin: true,
        Menshin: true,
        Tantou: "黒田",
        MailAddress: "i-yane-gaiheki@hrd-s.com",
        TantouBusho: "HRD開発",
        TekiyouKubun: "B",
        UpdatedDate: "2020-08-25 03:29:12",
        content: [
          '1. スカイライトの水切り板金は現場交換することは<span style="color: rgb(184, 49, 47);">対応不可</span>である。<div style="margin-left: 20px;">スカイライトの水切り板金は生産段階で全ての重なり部分をシーリング処理を行い、釘止めにて固定</div><div style="margin-left: 20px;">を行っているため、現場で交換を行うことは止水性能の低下を招くだけでなく、施工自体も非常に難</div><div style="margin-left: 20px;">しいものになるため<span style="color: rgb(184, 49, 47);">対応不可</span>である。</div><br><div style="margin-left: 20px;">※水切りが破損し、その場での補修が不能な場合はスカイライト本体ごと交換を行う。</div><div style="margin-left: 20px;"><br></div><div style="margin-left: 20px;"><img src="http://hrdapps48:5010/uploads/image/froala/test/0e506f8956ad10047f018cb1617b8e0d5831a638.PNG" style="width: 432px;" class="fr-dib"></div><div style="text-align: center;">図1-スカイライト横型(カラーベスト用)</div><div style="text-align: center;"><br></div><div style="text-align: center;">&nbsp;<img src="http://hrdapps48:5010/uploads/image/froala/test/12e05fe26ce9d9d613b67b26d85e46e0f7823626.PNG" style="width: 422px;" class="fr-dib"></div><div style="text-align: center;">図2-スカイライト横型(瓦用)</div><br>',
        ],
        ApprovalRemarks: "test only",
      },
      {
        SeihinKubun: "外部付帯",
        KanriBangou: "030619-26",
        RuleKenmei:
          "スカイライトの水切り板金(ｶﾗｰ鉄板部および鉛板部)を現場交換することは可能か？",
        Kubun: "ルール",
        YumeNoIe: true,
        Ippan: true,
        Icube: false,
        Ismart: false,
        Taishin: true,
        Menshin: true,
        Tantou: "黒田",
        MailAddress: "i-yane-gaiheki@hrd-s.com",
        TantouBusho: "HRD開発",
        TekiyouKubun: "B",
        UpdatedDate: "2020-08-26 10:10:00",
        content: [
          '<head>  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet"> </head> 1. スカイライトの水切り板金は現場交換することは<span style="color: rgb(184, 49, 47);">対応不可</span>である。<div style="margin-left: 20px;">スカイライトの水切り板金は生産段階で全ての重なり部分をシーリング処理を行い、釘止めにて固定</div><div style="margin-left: 20px;">を行っているため、現場で交換を行うことは止水性能の低下を招くだけでなく、施工自体も非常に難</div><div style="margin-left: 20px;">しいものになるため<span style="color: rgb(184, 49, 47);">対応不可</span>である。</div><br><div style="margin-left: 20px;">※水切りが破損し、その場での補修が不能な場合はスカイライト本体ごと交換を行う。</div><div style="margin-left: 20px;"><br></div><div style="margin-left: 20px;"><img src="http://hrdapps48.hrd-s.com:5010/uploads/image/froala/test/0e506f8956ad10047f018cb1617b8e0d5831a638.PNG" style="width: 432px;" class="fr-dib"></div><div style="text-align: center;">図1-スカイライト横型(カラーベスト用)</div><div style="text-align: center;"><br></div><div style="text-align: center;">&nbsp;<img src="http://hrdapps48.hrd-s.com:5010/uploads/image/froala/test/12e05fe26ce9d9d613b67b26d85e46e0f7823626.PNG" style="width: 422px;" class="fr-dib"></div><div style="text-align: center;">図2-スカイライト横型(瓦用)</div><br>',
        ],
      },
    ],
    isApproved: true,
    criteria: "ルール",
    method: "JIKU",
    documentType: "RULEBOOK",
    productType: "外部付帯",
    approver: "MARAAN, DELVIE F.",
  };
  let toSend = item.data.map((rec) => {
    if (rec.content) {
      rec.content = rec.content.map((c) => {
        // let str= `http://hrdapps48:5010/uploads/image/froala/test/`
        let re = RegExp(
          `http://hrdapps48:5010/uploads/image/froala/test/`,
          "gi"
        );

        let d = c.replace(re, function () {
          return "https://s3.us-east-2.amazonaws.com/rulebook.hrd-s.com/Document_images/";
        });
        return d;
      });
    }

    return rec;
  });
  res.send(toSend);
});

router.get("/allid", (req, res) => {
  const data = require("./copy.json");
  let toSend = data.map((rec) => rec._id);
  res.send(toSend);
});
router.get("/tempdelo2", (req, res) => {
  let page = req.query.page;
  const data = require("./copy.json");
  let n = 3;
  let p = parseInt(page) * n;
  let toSend = data.splice(p, n);
  res.send(toSend);
});

router.get("/getFile/:_id", (req, res) => {
  const params = {
    TableName: RULEBOOK_DOCUMENTS_TBL,
    Key: { _id: req.params._id, documentType: req.query.docType },
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    if (result) {
      if (req.query.docType == "RULEBOOK") {
        let toSend = result.Item.data.map((rec) => {
          if (rec.content) {
            rec.content = rec.content.map((c) => {
              // let str= `http://hrdapps48:5010/uploads/image/froala/test/`
              let re = RegExp(
                `http://hrdapps48:5010/uploads/image/froala/test/`,
                "gi"
              );

              let d = c.replace(re, function () {
                return "https://s3.us-east-2.amazonaws.com/rulebook.hrd-s.com/Document_images/";
              });
              return d;
            });
          }

          return rec;
        });
        res.send(toSend);
      } else {
        res.send(result.Item);
      }
    }
  });
});

//ADD NEW USER
router.get("/registerUser", (req, res) => {
  let toAdd = {
    UserId: "03328",
    Password: "03328",
    Name: "ESTEBAN, JOAN R.",
    MailAddress: "sd2@hrd-s.com",
    UpdatedDate: "2020-09-15",
    RegisteredDate: "2020-09-15",
    RegisteredBy: "36822",
  };
  let params = { TableName: RULEBOOK_USERS_TBL, Item: toAdd };
  dynamoDb.put(params, (err) => {
    if (err) {
      console.log(err.message);
      res.send(err.message);
    } else {
      res.send("User Successfully Registered");
    }
  });
});

//UPDATE USER INFO
router.put("/updateUserAccount", (req, res) => {
  const params = { TableName: RULEBOOK_USERS_TBL, Item: req.body };

  dynamoDb.put(params, (error) => {
    if (error) {
      res.send(error.message);
    } else {
      res.send("Record Saved");
    }
  });
});

//HARD DELETE USER ACCOUNT
router.delete("/deleteUserAccount/:user_id", (req, res) => {
  const params = {
    TableName: RULEBOOK_USERS_TBL,
    Key: { UserId: req.params.user_id },
  };
  dynamoDb.delete(params, (error) => {
    if (error) {
      res.send(error.message);
    } else {
      res.send("User Account Successfully Deleted");
    }
  });
});

//GET ALL DOCUMENTS JWW
router.get("/getAllFiles", (req, res) => {
  const params = {
    TableName: RULEBOOK_DOCUMENTS_TBL,
    IndexName: "documentTypeIndex", // optional (if querying an index)
    KeyConditionExpression: "documentType = :value",
    ExpressionAttributeValues: {
      ":value": req.query.docType,
    },
  };
  dynamoDb.query(params, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    if (result) {
      res.send(result.Items);
    }
  });
});

// GET ALL DOCS
router.get("/getAllDocs", (req, res) => {
  console.log(req.ip);
  const params = {
    TableName: RULEBOOK_DOCUMENTS_TBL,
    IndexName: "documentTypeIndex", // optional (if querying an index)
    KeyConditionExpression: "documentType = :value",
    ExpressionAttributeValues: {
      ":value": "RULEBOOK",
    },
  };
  dynamoDb.query(params, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    if (result) {
      let toSend = result.Items.map((rec) => {
        // rec.YumeNoIe = rec.data[rec.version - 1].YumeNoIe;
        // rec.title = rec.data[rec.version - 1].RuleKenmei;
        // return rec;
        return {
          _id: rec._id,
          title: rec.data[rec.version - 1].RuleKenmei,
          content: "",
          criteria: rec.criteria,
          method: rec.method,
          productType: rec.productType,
          YumeNoIe: rec.data[rec.version - 1].YumeNoIe,
          Ippan: rec.data[rec.version - 1].YumeNoIe,
          Icube: rec.data[rec.version - 1].Icube,
          Ismart: rec.data[rec.version - 1].Ismart,
          Taishin: rec.data[rec.version - 1].Taishin,
          Menshin: rec.data[rec.version - 1].Menshin,
          G: rec.data[rec.version - 1].G,
          F: rec.data[rec.version - 1].F,
          A: rec.data[rec.version - 1].A,
          B: rec.data[rec.version - 1].B,
          "F2-TD": rec.data[rec.version - 1]["F2-TD"],
          Ismile: rec.data[rec.version - 1].Ismile,
        };
      });
      res.send(toSend);
    }
  });
});

router.get("/get/title_rules", (req, res) => {
  const params = {
    TableName: RULEBOOK_DOCUMENTS_TBL,
    IndexName: "documentTypeIndex", // optional (if querying an index)
    KeyConditionExpression: "documentType = :value",
    ExpressionAttributeValues: {
      ":value": "RULEBOOK",
    },
  };
  dynamoDb.query(params, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    if (result) {
      let data = result.Items.map((rec) => {
        // rec.YumeNoIe = rec.data[rec.version - 1].YumeNoIe;
        // rec.title = rec.data[rec.version - 1].RuleKenmei;
        // return rec;
        return {
          _id: rec._id,
          title: rec.data[rec.version - 1].RuleKenmei,
          content: rec.data[rec.version - 1].content,
          criteria: rec.criteria,
          method: rec.method,
          productType: rec.productType,
          YumeNoIe: rec.data[rec.version - 1].YumeNoIe,
          Ippan: rec.data[rec.version - 1].YumeNoIe,
          Icube: rec.data[rec.version - 1].Icube,
          Ismart: rec.data[rec.version - 1].Ismart,
          Taishin: rec.data[rec.version - 1].Taishin,
          Menshin: rec.data[rec.version - 1].Menshin,
          G: rec.data[rec.version - 1].G,
          F: rec.data[rec.version - 1].F,
          A: rec.data[rec.version - 1].A,
          B: rec.data[rec.version - 1].B,
          "F2-TD": rec.data[rec.version - 1]["F2-TD"],
          Ismile: rec.data[rec.version - 1].Ismile,
        };
      });

      let search = [];
      if (req.query.search.includes("　")) {
        search = req.query.search.toUpperCase().replace(/\s+/g, " ").split(" ");
      } else {
        search = req.query.search.toUpperCase().replace(/\s+/g, " ").split(" ");
      }

      let searchArr = search.map((searchKey) => {
        let temp = data.filter((rec) => {
          if (rec.content) {
            let len = rec.content
              .map((rec) => {
                return `'${rec}'`;
              })
              .toString();
            return (
              rec.title.includes(searchKey) ||
              len
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .includes(searchKey) ||
              rec._id.includes(searchKey)
            );
          }
        });
        return temp;
      });
      // console.log(searchArr);
      let toSend = searchArr.map((data) => {
        let content = data.map((rec) => {
          let str = rec.content.toString().replace(/(<([^>]+)>)/gi, "");
          let fStr = str.replace(/&nbsp;/gi, "");
          search.map((q) => {
            var re = new RegExp(q, "g");
            fStr = fStr.replace(re, function (str) {
              return `<span style="background-color:yellow"> <b> ${str} </b> </span>`;
            });
            let index = fStr.indexOf(`${q}`);
            fStr = fStr.substring(index - 50, fStr.length - 1);
            rec.title = rec.title.replace(re, function (str) {
              return `<b> ${str} </b>`;
            });
          });

          return {
            title: rec.title,
            _id: rec._id,
            content: fStr,
            YumeNoIe: rec.YumeNoIe,
            Ippan: rec.YumeNoIe,
            Icube: rec.Icube,
            Ismart: rec.Ismart,
            Taishin: rec.Taishin,
            Menshin: rec.Menshin,
            productType: rec.productType,
            method: rec.method,
            criteria: rec.criteria,
            RulebookUpdatedDate: rec.RulebookUpdatedDate,
            G: rec.G,
            F: rec.F,
            A: rec.A,
            B: rec.B,
            "F2-TD": rec["F2-TD"],
            Ismile: rec.Ismile,
          };
        });
        return content;
      });
      let content = [];
      for (let i = 0; i < toSend.length; i++) {
        for (let h = 0; h < toSend[i].length; h++) {
          content.push(toSend[i][h]);
        }
      }
      const uniqueElementsBy = (arr, fn) =>
        arr.reduce((acc, v) => {
          if (!acc.some((x) => fn(v, x))) acc.push(v);
          return acc;
        }, []);

      let x = uniqueElementsBy(content, (a, b) => a._id == b._id);

      var br = new RegExp("<br>", "g");
      x = x.map((rec) => {
        rec.title = rec.title.replace(br, function () {
          return "";
        });
        let index = rec.title.indexOf("、");
        if (index != -1) {
          rec.title = rec.title.substring(0, index);
        }
        // rec.title
        return rec;
      });
      res.send(x);

      // res.send(toSend);
    }
  });
});

router.get("/get/title_rules/and", (req, res) => {
  // RuleBook.view("delo", "new_title_content", {}).then((body) => {
  const params = {
    TableName: RULEBOOK_DOCUMENTS_TBL,
    IndexName: "documentTypeIndex", // optional (if querying an index)
    KeyConditionExpression: "documentType = :value",
    ExpressionAttributeValues: {
      ":value": "RULEBOOK",
    },
  };
  dynamoDb.query(params, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    if (result) {
      let body = result.Items.map((rec) => {
        return {
          title: rec.data[rec.version - 1].RuleKenmei,
          content: rec.data[rec.version - 1].content,
          _id: rec._id,
          criteria: rec.criteria,
          method: rec.method,
          productType: rec.productType,
          YumeNoIe: rec.data[rec.version - 1].YumeNoIe,
          Ippan: rec.data[rec.version - 1].Ippan,
          Icube: rec.data[rec.version - 1].Icube,
          Ismart: rec.data[rec.version - 1].Ismart,
          Taishin: rec.data[rec.version - 1].Taishin,
          Menshin: rec.data[rec.version - 1].Menshin,
          RulebookUpdatedDate: rec.RulebookUpdatedDate,
          G: rec.data[rec.version - 1].G,
          F: rec.data[rec.version - 1].F,
          A: rec.data[rec.version - 1].A,
          B: rec.data[rec.version - 1].B,
          "F2-TD": rec.data[rec.version - 1]["F2-TD"],
          Ismile: rec.data[rec.version - 1].Ismile,
        };
      });

      //Array
      let search = [];

      if (req.query.search.includes("　")) {
        search = req.query.search.toUpperCase().replace(/\s+/g, " ").split(" ");
      } else {
        search = req.query.search.toUpperCase().replace(/\s+/g, " ").split(" ");
      }

      // res.send(search)
      // body = body.map((a) => a.value);

      let searchArr = search.map((searchKey) => {
        let temp = body.filter((rec) => {
          if (rec.content) {
            let len = rec.content
              .map((rec) => {
                return `'${rec}'`;
              })
              .toString();
            return (
              rec.title.includes(searchKey) ||
              len
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .includes(searchKey) ||
              rec._id.includes(searchKey)
            );
          }
        });
        return temp;
      });

      var result = searchArr.reduce((res, arr, index) => {
        arr.forEach(({ _id, value }) => {
          res[_id] = res[_id] || { occurrences: 0 };
          res[_id]["where"] = res[_id]["where"] || [];
          if (!res[_id]["where"].includes(index)) {
            res[_id].occurrences += 1;
          }
        });
        return res;
      }, {});

      searchArr.forEach((arr) =>
        arr.forEach((obj) => Object.assign(obj, result[obj._id]))
      );

      let toSend = searchArr.map((data) => {
        let content = data.map((rec) => {
          let str = rec.content.toString().replace(/(<([^>]+)>)/gi, "");
          let fStr = str.replace(/&nbsp;/gi, "");

          search.map((q) => {
            var re = new RegExp(q, "i");
            fStr = fStr.replace(re, function (str) {
              return `<span style="background-color:yellow"> <b> ${str} </b> </span>`;
            });
            let index = fStr.indexOf(`${q}`);
            fStr = fStr.substring(index - 50, fStr.length - 1);
            rec.title = rec.title.replace(re, function (str) {
              return `<b> ${str} </b>`;
            });
          });

          return {
            title: rec.title,
            _id: rec._id,
            content: fStr,
            YumeNoIe: rec.YumeNoIe,
            Ippan: rec.YumeNoIe,
            Icube: rec.Icube,
            Ismart: rec.Ismart,
            Taishin: rec.Taishin,
            Menshin: rec.Menshin,
            productType: rec.productType,
            method: rec.method,
            criteria: rec.criteria,
            occurrences: rec.occurrences,
            RulebookUpdatedDate: rec.RulebookUpdatedDate,
            G: rec.G,
            F: rec.F,
            A: rec.A,
            B: rec.B,
            "F2-TD": rec["F2-TD"],
            Ismile: rec.Ismile,
          };
        });
        return content;
      });
      let content = [];
      for (let i = 0; i < toSend.length; i++) {
        for (let h = 0; h < toSend[i].length; h++) {
          if (toSend[i][h].occurrences >= toSend.length) {
            content.push(toSend[i][h]);
          }
        }
      }
      // res.send(toSend)
      const uniqueElementsBy = (arr, fn) =>
        arr.reduce((acc, v) => {
          if (!acc.some((x) => fn(v, x))) acc.push(v);
          return acc;
        }, []);

      let x = uniqueElementsBy(content, (a, b) => a._id == b._id);
      var br = new RegExp("<br>", "g");
      x = x.map((rec) => {
        rec.title = rec.title.replace(br, function () {
          return "";
        });
        let index = rec.title.indexOf("、");
        if (index != -1) {
          rec.title = rec.title.substring(0, index);
        }
        return rec;
      });
      // res.send(x);
      res.send(x);
    }
  });
});

router.get("/get/this/:_id", (req, res) => {
  const params = {
    TableName: RULEBOOK_DOCUMENTS_TBL,
    Key: { _id: req.params._id, documentType: "RULEBOOK" },
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    if (result) {
      let toSend = result.Item;

      for (let i = 0; i < toSend.data[toSend.version - 1].content.length; i++) {
        toSend.data[toSend.version - 1].content[
          i
        ] = `<head>  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet"> </head> ${
          toSend.data[toSend.version - 1].content[i]
        }`;

        var re2 = new RegExp("</a>", "gi");
        toSend.data[toSend.version - 1].content[i] = toSend.data[
          toSend.version - 1
        ].content[i].replace(re2, function (str) {
          let index = toSend.data[toSend.version - 1].content[i].indexOf(str);

          if (
            toSend.data[toSend.version - 1].content[i][index - 8].match(
              /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/gi
            ) == null
          )
            return `${str} <i class="small mdi mdi-file-pdf-outline" style="color:red"></i> `;
          else {
            return `${str} <i class="small mdi mdi-link" style="color:green"></i> `;
          }
        });

        var pdfURL = new RegExp("hrdapps48", "gi");
        toSend.data[toSend.version - 1].content[i] = toSend.data[
          toSend.version - 1
        ].content[i].replace(pdfURL, function (str) {
          return `${str}.hrd-s.com`;
        });

        var page2 = new RegExp("：P", "g");
        let cnt = 0;

        toSend.data[toSend.version - 1].content[i] = toSend.data[
          toSend.version - 1
        ].content[i]
          .toString()
          .replace(page2, function (str) {
            cnt = cnt + 1;
            return `<a href="#p${cnt}"> ${str}</a>`;
          });
      }

      var idImg = new RegExp("<img", "g");
      let cnt = 0;
      let cnt2 = 0;
      let imgsrc = [
        toSend.data[toSend.version - 1].content
          .toString()
          .replace(idImg, function (str) {
            cnt = cnt + 1;
            return `${str} id=p${cnt}`;
          }),
      ];
      toSend.data[toSend.version - 1].content = imgsrc;
      let PageCount = toSend.data[toSend.version - 1].content
        .toString()
        .match(/:P/g);
      if (PageCount) {
        if (PageCount.length > 0) {
          let pagelink = [
            toSend.data[toSend.version - 1].content
              .toString()
              .replace(/:P/g, function (str) {
                cnt2 = cnt2 + 1;
                return `<a href="#p${cnt2}"> ${str}</a>`;
              }),
            ,
          ];
          toSend.data[toSend.version - 1].content = pagelink;
        }
      }

      res.send(toSend);
    }
  });
  // RuleBook.get(val).then(body => {
  //   res.send(body)
  // })
  // RuleBook.view("delo", "searchDocument", {
  //   include_docs: true,
  //   key: val,
  // }).then((body) => {

  // });
});

// router.get('/countlng', (req, res) => {
//   const myData = require("./JWW.json");
//   res.send(myData)
// })
router.get("/tempdelo2", (req, res) => {
  let page = req.query.page;
  const data = require("./copy.json");
  let n = 3;
  let p = parseInt(page) * n;
  let toSend = data.splice(p, n);
  res.send(toSend);
});

router.get("/bulkInsert", (req, res) => {
  // import data
  // const myData = require("./rulebook_FinalDocs.json");
  let page = req.query.page;
  const data = require("./copy.json");
  let n = 30;
  let p = parseInt(page) * n;
  let myData = data.splice(p, n);
  let toInsert = myData.map((rec) => {
    delete rec._rev;
    return rec;
  });
  // .filter((rec) => {
  //   return typeof rec._id == "string";
  // });
  // res.send(toInsert);
  var batchRequest = {};
  var myArr = [];
  for (let i = 0; i < toInsert.length / 25; i++) {
    batchRequest = {};
    myArr = [];
    for (var j = i * 25; j < i * 25 + 25; j++) {
      if (j < toInsert.length) {
        let newData = toInsert[j];
        myArr.push({ PutRequest: { Item: newData } });
      }
    }

    batchRequest = {
      RequestItems: {
        [RULEBOOK_DOCUMENTS_TBL]: myArr,
      },
    };
    dynamoDb.batchWrite(batchRequest, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  setTimeout(() => {
    res.send("OK");
  }, 50000);
});

module.exports = router;
