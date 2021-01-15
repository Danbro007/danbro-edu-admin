<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="查询关键字"
      style="margin-bottom: 30px"
    />
    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import * as subjectAPI from "@/api/edu/subject";
export default {
  data() {
    return {
      filterText: "",
      subjectList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  watch: {
    filterText(val) {
      debugger
      this.$refs.subjectTree.filter(val);
    },
  },

  created() {
    this.fetchNodeList();
  },

  methods: {
    fetchNodeList() {
      subjectAPI.getNestedTreeList().then((response) => {
        if (response.isSuccess === true) {
          this.subjectList = response.data;
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
  },
};
</script>