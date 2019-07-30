<template>
  <dir>
    <el-table
      :data="usersData"
      style="width: 100%"
    >

      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
      >

      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size=2
      :current-page='pagenum'
      @current-change='currentPageChanged'
    >
    </el-pagination>
  </dir>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      usersData: [{
        email: 'hu@.com',
        username: '王小虎',
        mobile: '88888888888'
      }],
      total: 0,
      pagenum: 1
    }
  },
  // 进入就要得导数据 写在钩子函数中
  created () {
    this.getUsersData()
  },
  methods: {
    currentPageChanged (curPage) {
      this.getUsersData(curPage)
    },
    getUsersData (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    }
  }
}
</script>
<style>
</style>
