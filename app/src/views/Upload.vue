<template>
  <!-- action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :action="uploadFile"-->
  <a-upload :multiple="true" :file-list="fileList" @change="getFile">
    <a-button> <a-icon type="upload" />Upload </a-button>
  </a-upload>
</template>
<script>
import moment from "moment";
import axios from "axios";
import S3 from "aws-s3";
export default {
  data() {
    return {
      fileList: [],
      fileData: {},
      fileExtension: ".png",
      fileURL: "",
      filesToUpload: [],
    };
  },
  created() {
    // let url = `${this.api}getAllFiles`;
    // axios.get(url).then((res) => {
    //   // res.data = res.data.map((rec, index) => {
    //   //   rec.filename = rec.DXFFile;
    //   //   rec.JWWFile = encodeURI(
    //   //     `http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${rec.JWWFile}`
    //   //   );
    //   //   rec.DXFFile = encodeURI(
    //   //     `http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${rec.DXFFile}`
    //   //   );
    //   //   rec.key = index;
    //   //   return rec;
    //   // });
    //   this.filesToUpload = res.data.map((rec) => {
    //     rec.filename = rec.DXFFile;
    //     rec.JWWFile = encodeURI(
    //       `http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${rec.JWWFile}`
    //     );
    //     rec.DXFFile = encodeURI(
    //       `http://hrdapps48.hrd-s.com:3001/ftp/rule_book/${rec.DXFFile}`
    //     );
    //     // rec.key = index;
    //     return { JWWFile: rec.JWWFile, DXFFile: rec.DXFFile };
    //   });
    //   console.log(this.filesToUpload);
    // this.listData = res.data;
    // console.log("data", this.listData);
    // this.listData.sort((a, b) => (a._id > b._id ? 1 : -1));
    // });
  },
  methods: {
    getFile(info) {
      console.log(this.fileList);
      console.log(info.file);
      ////Getting the file type of a file
      this.fileExtension = info.file.type.split("/")[1];
      ////Complete path/url of a file
      this.fileURL = `${this.url}.${this.fileExtension}`;

      //   this.fileData.file_id = shortid.generate();
      this.fileData.filename = info.file.name;
      this.fileData.date_added = moment().format("L");
      this.fileData.file_path = "micsURL"; //this.fileURL;
      this.fileData.uploaded_by = "mics"; //this.userInfo.email;
      console.log("FILE DATA HERE", this.fileData);
      this.uploadFile(info);
    },
    uploadFile(info) {
      console.log("info", info.file);
      this.S3Client.uploadFile(
        info.file.originFileObj,
        this.newFileName
      ).finally(() => {
        this.fileExtension = info.file.type.split("/")[1];
        this.fileURL = `${this.url}.${this.fileExtension}`;
        info = {};
        this.fileData = {};
        console.log("uploaded");
      });
    },
    handleChange(info) {
      console.log(info);
      //   let fileList = [...info.fileList];

      //   // 1. Limit the number of uploaded files
      //   //    Only to show two recent uploaded files, and old ones will be replaced by the new
      //   fileList = fileList.slice(-2);

      //   // 2. read from response and show file link
      //   fileList = fileList.map((file) => {
      //     if (file.response) {
      //       // Component will show file.url as link
      //       file.url = file.response.url;
      //     }
      //     return file;
      //   });

      //   this.fileList = fileList;
    },
  },
  computed: {
    config() {
      return {
        // bucketName: process.env.VUE_APP_S3_BUCKET,
        bucketName: "rulebook.hrd-s.com",
        dirName: this.directory, //Optional --> directory or folder on s3 where the file will be saved.
        // region: process.env.VUE_APP_REGION, //aws region.
        region: "us-east-2",
        // accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
        accessKeyId: "AKIA2FWIWPI5YVES3XEU",
        // secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
        secretAccessKey: "RUH6/lXdqJXyYAyNCXwanauz8/pfDjfDYKRJMY0h",
        s3Url: this.baseURL, //Optional --> url of your s3 bucket.
      };
    },
    S3Client() {
      return new S3(this.config);
    },
    baseURL() {
      //URL OF YOUR BUCKET
      //   return process.env.VUE_APP_BASE_URL;
      return "https://s3.us-east-2.amazonaws.com/rulebook.hrd-s.com";
    },
    newFileName() {
      //returns a random numbers for the new filename
      return Math.random().toString().slice(2);
    },
    directory() {
      return "Document_images";
    },
    url() {
      return `${this.baseURL}/${this.directory}/${this.newFileName}.${this.fileExtension}`;
    },
  },
};
</script>
