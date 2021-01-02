<template>
  <div class="app-container">
    <br />
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="condition.title" placeholder="课程名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="condition.status" clearable placeholder="课程状态">
          <el-option :value="1" label="已发布" />
          <el-option :value="2" label="未发布" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--课程列表-->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column
        prop="title"
        label="课程名"
        width="200"
      ></el-table-column>
      <el-table-column label="发布状态" width="100">
        <template slot-scope="scope">
          <el-tag
            size="medium"
            :type="scope.row.status == 'Draft' ? 'danger' : 'success'"
          >
            {{ scope.row.status == "Draft" ? "未发布" : "已发布" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="lessonNum"
        label="课程数"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="viewCount"
        label="浏览数"
        width="80"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="`/course/info/` + scope.row.id">
            <el-button size="mini" type="primary">编辑</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total,prev, pager, next,jumper"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>
<script>
import * as courseAPI from "@/api/edu/course";

export default {
  data() {
    return {
      page: 1, // 当前页数
      limit: 10, // 每页显示的条数
      courseQuery: {
        status:""
      }, // 筛选条件
      list: null, // 存放返回的讲师数据
      total: 0, // 符合条件的讲师总数
      condition: {
      },
    };
  },
  created() {
    // 页面渲染之前执行，一般是调用methods里的方法
    this.getList();
  },
  methods: {
    // 获取课程列表
    getList(page = 1) {
      if (this.condition.status == "1") {
        this.courseQuery.status = "Normal";
      } 
      else if(this.condition.status == "2") {
        this.courseQuery.status = "Draft";
      }
      this.courseQuery.title = this.condition.title;
      this.page = page;
      courseAPI
        .pagingFindByCondition(this.page, this.limit, this.courseQuery)
        .then((response) => {
          let data = response.data;
          this.list = data.rows;
          this.total = data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 清空筛选框的数据
    resetData() {
      this.condition = {};
      this.getList();
    },
    // 通过 ID 删除课程
    handleDelete(id) {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          courseAPI
            .deleteById(id)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            })
            .catch((error) => {
              this.$message({
                type: "fail",
                message: response.message,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>