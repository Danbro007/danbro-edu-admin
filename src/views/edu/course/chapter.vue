<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <!--添加课程进度条-->
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <div id="insertBtn">
      <el-button @click="openChapterForm" type="danger">添加章节</el-button>
    </div>
    <!--章节的树形展示-->
    <el-tree
      :data="chapterList"
      :props="defaultProps"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => openVideoForm(node, data)"
            v-show="typeof data.children != 'undefined'"
          >
            添加小节
          </el-button>
          <el-button type="text" size="mini" @click="() => update(node, data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <!--上一步、下一步和添加章节按钮-->
    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>

    <!--添加章节对话框-->
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter">
        <el-form-item label="章节名" :label-width="formLabelWidth">
          <el-input v-model="chapter.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number
            :min="1"
            v-model="chapter.sort"
            controls-position="right"
            placeholder="章节排序"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="1"
            controls-
            position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-progress="handleVodUploadProcess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/vod/video'"
            :limit="1"
            :v-text="video.videoOriginalName"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as courseAPI from "@/api/edu/course";
import * as chapterAPI from "@/api/edu/chapter";
import * as videoAPI from "@/api/edu/video";

export default {
  data() {
    return {
      chapterList: [],
      fileList: [],
      video: {
        sort: 1,
        title: "",
        chapterId: "",
        isFree: false,
      },
      // 上传文件期间禁止使用确认按钮
      saveVideoBtnDisabled:false,
      saveBtnDisabled: false,
      courseId: "",
      chapter: {
        title: "",
        sort: 1,
        courseId: "",
      },
      // 章节对话框
      dialogFormVisible: false,
      // 小节对话框
      dialogVideoFormVisible: false,
      // 表单宽度
      formLabelWidth: "120px",

      fileList: [], //上传文件列表
      BASE_API: process.env.BASE_API,
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 返回到课程信息页面
    previous() {
      console.log("previous");
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    // 进入到确认页面
    next() {
      console.log("next");
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
    insert() {},
    // 初始化页面，如果路径上有Id说明是修改
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getChapterInfo(this.courseId);
      }
    },
    // 通过courseId获取章节信息
    getChapterInfo(courseId) {
      courseAPI
        .getChapterInfo(courseId)
        .then((response) => {
          this.chapterList = response.data.chapters;
        })
        .catch((error) => {});
    },
    // 打开更新对话框
    update(node, data) {
      this.resetVideo();
      // 更新小节
      if (typeof data.children == "undefined") {
        console.log(data);
        if (data.videoSourceId !== null && data.videoSourceId != "") {
          this.fileList = [
            { name: data.videoOriginalName, id: data.videoSourceId },
          ];
        }
        // 0 收费 1 免费
        this.video.isFree = data.isFree;
        console.log(this.video)
        this.dialogVideoFormVisible = true;
        this.video.title = data.label;
        this.video.id = data.id;
        this.video.sort = data.sort;
        this.video.videoSourceId = data.videoSourceId;
        this.video.videoOriginalName = data.videoOriginalName;
        
      }
      //更新章节
      else {
        this.dialogFormVisible = true;
        this.chapter.title = data.label;
        this.chapter.sort = data.sort;
        this.chapter.id = data.id;
      }
    },
    // 取消添加章节
    cancel() {
      this.dialogFormVisible = false;
      this.chapter = {
        title: "",
        sort: 1,
        courseId: this.courseId,
      };
    },
    // 添加或更新章节
    saveOrUpdateChapter() {
      this.chapter.courseId = this.courseId;
      if (this.chapter.id) {
        // 更新
        chapterAPI
          .update(this.chapter)
          .then((response) => {
            this.$message({
              type: "success",
              message: "修改章节成功！",
            });
            s;
            this.dialogFormVisible = false;
            this.getChapterInfo(this.courseId);
          })
          .catch(console.error());
      } else {
        // 添加
        chapterAPI
          .insert(this.chapter)
          .then((response) => {
            this.$message({
              type: "success",
              message: "添加章节成功！",
            });
            this.chapterList.push(this.chapter);
            this.chapter = {
              title: "",
              sort: 1,
              courseId: this.courseId,
            };
            this.dialogFormVisible = false;
            // 自动刷新页面
            this.getChapterInfo(this.courseId);
          })
          .catch(console.error());
      }
    },
    // 删除章节或者小节
    remove(node, data) {
      // 删除章节，这里要注意会删除章节下面的小节
      if (typeof data.children != "undefined") {
        this.$confirm("是否删除此章节", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          // 点击确定
          chapterAPI
            .deleteChapter(data.id)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除章节成功！",
              });
              this.getChapterInfo(this.courseId);
            })
            .catch(console.error());
        });
      }
      // 删除视频
      else {
        this.$confirm("是否删除此小节", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          // 点击确定
          const videoId = data.id;
          videoAPI
            .deleteVideo(videoId)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除小节成功！",
              });
              this.getChapterInfo(this.courseId);
              this.fileList = [];
            })
            .catch(console.error());
        });
      }
    },
    // 添加小节对话框
    openVideoForm(node, data) {
      this.fileList = [];
      this.resetVideo();
      this.video.chapterId = data.id;
      this.dialogVideoFormVisible = true;
    },
    // 修改或者添加小节
    saveOrUpdateVideo() {
      // 修改
      if (this.video.id) {
        videoAPI
          .update(this.video)
          .then((response) => {
            this.$message({
              type: "success",
              message: "修改小节成功！",
            });
            this.dialogVideoFormVisible = false;
            this.getChapterInfo(this.courseId);
          })
          .catch(console.error());
      }
      //添加
      else {
        videoAPI
          .insert(this.video)
          .then((response) => {
            this.$message({
              type: "success",
              message: "添加小节成功！",
            });
            this.dialogVideoFormVisible = false;
            this.getChapterInfo(this.courseId);
          })
          .catch(console.error());
      }
      this.video = {};
    },
    openChapterForm() {
      this.dialogFormVisible = true;
      this.chapter.title = "";
      this.chapter.sort = 1;
    },
    resetVideo() {
      this.video = {
        courseId: this.courseId,
        title: "",
        sort: 1,
        isFree: false,
      };
    },
    //视频上传成功的回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId;
      this.video.videoOriginalName = file.name;
      this.saveVideoBtnDisabled = false;
    },
    //视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },
    // 删除上传视频前的确定对话框
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定删除 ${file.name}?`);
    },
    // 执行删除视频的操作
    handleVodRemove() {
      videoAPI
        .deleteVodVideo(this.video.id)
        .then((response) => {
          this.$message({
            type: "success",
            message: "删除视频成功！",
          });
          this.video.videoSourceId = "";
          this.video.videoOriginalName = "";
          this.fileList = [];
        })
        .catch((error) => {});
    },
    handleVodUploadProcess(){
      this.saveVideoBtnDisabled = true;
    }
  },
};
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>