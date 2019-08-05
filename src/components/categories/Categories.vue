
<template>
  <div>
    <!-- 点击按钮 -->
    <el-button
      @click='addCat'
      type='success'
      plain
    >添加分类</el-button>
    <!-- 点击出现添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAddCatFormVisible"
    >
      <el-form :model="dialogAddCatForm">
        <el-form-item label="分类名称">
          <el-input
            v-model="dialogAddCatForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <!-- 级联选择器 -->
          <el-cascader
            v-model='dialogAddCatForm.cat_pid_arr'
            :props='default2'
            :options="options"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogAddCatFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCatbtn"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="catData"
      style="width: 100%"
    >
      <el-table-column type=expand>
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{scope.row.cat_deleted ?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if='scope.row.cat_level==0'>一级 </span>
          <span v-else-if='scope.row.cat_level==1'>二级 </span>
          <span v-else>三级 </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // -------级联选择器数据-------------
      options: [{

        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      // ------------------------
      dialogAddCatForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      dialogAddCatFormVisible: false,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },

      catData: [{
        cat_name: '',
        cat_delete: '',
        cat_level: ''
      }],
      // -------级联绑定数据--------------------
      default2: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created () {
    this.getCatData()
    this.getCatData2()
  },
  methods: {
    async getCatData () {
      let res = await this.$axios.get('categories', {
        type: 3
      })
      // console.log(res)
      this.catData = res.data.data
    },
    // 添加分类点击显示框
    addCat () {
      this.dialogAddCatFormVisible = true
    },
    async getCatData2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      this.options = res.data.data
    },
    // 点击确定按钮发送请求 添加分类成功
    /* eslint-disable */
    async addCatbtn () {
      const { cat_name, cat_pid_arr } = this.dialogAddCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name,
        cat_level: 2
      })
      // console.log(res)
      this.dialogAddCatFormVisible = false
      this.$message({
        message: '觉色设置成功',
        type: 'success',
        duration: 800
      })
      // 刷新
      this.getCatData()
    }

  }
}
</script>

<style>
</style>
