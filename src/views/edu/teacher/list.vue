<template>
  <div class="app-container">
    <br />
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.start"
          type="date"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="date"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!--讲师列表-->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level == 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="简介" width="280"></el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="180"
      ></el-table-column>
      <el-table-column prop="sort" label="排序" width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="`/edu/teacher/edit/` + scope.row.id">
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
import * as teacherAPI from "@/api/edu/teacher";

export default {
  data() {
    return {
      page: 1, // 当前页数
      limit: 10, // 每页显示的条数
      teacherQuery: {}, // 筛选条件
      list: null, // 存放返回的讲师数据
      total: 0, // 符合条件的讲师总数
    };
  },
  created() {
    // 页面渲染之前执行，一般是调用methods里的方法
    this.getList();
  },
  methods: {
    // 获取讲师列表
    getList(page = 1) {
      this.page = page;
      teacherAPI
        .pagingFindByCondition(this.page, this.limit, this.teacherQuery)
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
      this.teacherQuery = {};
      this.getList();
    },
    // 通过 ID 删除讲师
    handleDelete(id) {
      this.$confirm("此操作将永久删除该讲师记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          teacherAPI
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