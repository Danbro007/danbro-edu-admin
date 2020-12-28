<template>
  <div class="app-container">
    <el-form label-width="200px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
          数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number
	        -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址@close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/upload/image/avatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as teacherAPI from "@/api/edu/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
      teacher: {
        sort: 0,
        level: 1,
        avatar: "",
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    this.init();
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    // 上传头像完成的函数
    cropSuccess(data) {
      this.imagecropperShow = false;
      this.teacher.avatar = data.imgUrl;
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    init() {
      // 判断路径里有没有id，有的话会先查找teacher消息，没有则会清空表单数据。
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getTeacherById(id);
      } else {
        this.teacher = {};
        this.teacher.avatar =
          "https://edu-danbro.oss-cn-hangzhou.aliyuncs.com/default/default-avatar.jpg";
      }
    },

    // 通过 teacher 对象有没有id来判断是修改还是添加
    saveOrUpdate(teacher) {
      if (!this.teacher.id) {
        this.insertTeacher(this.teacher);
      } else {
        this.updateTeacher(this.teacher);
      }
    },
    // 添加讲师
    insertTeacher(teacher) {
      teacherAPI
        .save(this.teacher)
        .then((response) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          // 跳转页面
          this.$router.push({ path: "/teacher/list" });
        })
        .catch((error) => {
          this.$message({
            type: "fail",
            message: response.message,
          });
        });
    },
    // 通过讲师id获取讲师信息
    getTeacherById(id) {
      teacherAPI
        .getById(id)
        .then((response) => {
          this.teacher = response.data.items;
        })
        .catch((error) => {});
    },
    // 更新讲师信息
    updateTeacher(teacher) {
      teacherAPI
        .update(this.teacher)
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          // 跳转页面
          this.$router.push({ path: "/teacher/list" });
        })
        .catch((error) => {
          this.$message.error("修改失败!");
        });
    },
  },
};
</script>