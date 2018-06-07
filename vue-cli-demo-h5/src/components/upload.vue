<script>
import Vue from "vue";

Vue.component("upload", {
  props: {
    showMessage: String,
    fileList: { type: Array, default: [] },
    accept: String,
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      config: { uploadUrl: "http://localhost:2858/Students/SaveAttachment" } // this.$store.state.config,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      if (response.Code == 0) {
        this.$emit("uploadSuccess", JSON.parse(response.Data));
      }
    }
  },
  template:
    '<el-upload class="upload-demo" ref="upload" :action="config.uploadUrl"\
                        :on-preview="handlePreview"\
                        :on-remove="handleRemove"\
                        :on-success="handleSuccess"\
                        :limit="limit"\
                        :file-list="fileList">\
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>\
                    <div slot="tip" class="el-upload__tip">{{showMessage}}</div>\
		        </el-upload>'
});
</script>