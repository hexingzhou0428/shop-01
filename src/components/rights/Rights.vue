<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb
      class="bread"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
      :data="rightsData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsData: [{
        authName: '王小虎',
        path: '王小虎',
        level: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created () {
    this.getRightsData()
  },
  methods: {
    async getRightsData () {
      let res = await this.$axios.get('rights/list')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rightsData = res.data.data
      }
    },
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style>
.bread {
  height: 30px;
}
</style>
