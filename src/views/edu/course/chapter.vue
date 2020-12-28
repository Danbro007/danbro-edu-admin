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
      <el-button @click="dialogFormVisible = true" type="danger"
        >添加章节</el-button
      >
    </div>
    <!--章节的树形展示-->
    <el-tree
      show-checkbox
      :data="chapterList"
      :props="defaultProps"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => updateChapter(node, data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="() => removeChapter(node, data)">
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

    <!--对话框-->
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter">
        <el-form-item label="章节名" :label-width="formLabelWidth">
          <el-input v-model="chapter.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as courseAPI from "@/api/edu/course";

export default {
  data() {
    return {
      chapterList: [],
      saveBtnDisabled: false,
      courseId: "",
      chapter: {
        title: "",
      },
      dialogFormVisible: false,
      // 表单宽度
      formLabelWidth: "120px",
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 返回到课程信息页面
    previous() {
      console.log("previous");
      this.$router.push({ path: "/edu/course/info/" + this.courseId });
    },
    // 进入到确认页面
    next() {
      console.log("next");
      this.$router.push({ path: "/edu/course/publish/" + this.courseId });
    },
    insert() {},
    // 初始化页面，如果路径上有Id说明是修改
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getChapterInfo(this.courseId);
      }
    },
    getChapterInfo(courseId) {
      courseAPI
        .getChapterInfo(courseId)
        .then((response) => {
          this.chapterList = response.data.chapters;
        })
        .catch((error) => {});
    },
    updateChapter(node,data){
      
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