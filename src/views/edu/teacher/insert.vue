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

export default {
  data() {
    return {
      teacher: {
        sort: 0,
        level: 1,
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    this.init();
  },
  watch: {// 监听路由变化
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    init() {
      // 判断路径里有没有id，有的话会先查找teacher消息，没有则会清空表单数据。
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getTeacherById(id);
      } else {
        this.teacher = {};
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
        .catch((error) => {});
    },
  },
};
</script>