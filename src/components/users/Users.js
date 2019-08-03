/* eslint-disable */
// import axios from 'axios'
export default {
  data () {
    return {
      usersData: [{
        email: 'hu@.com',
        username: '王小虎',
        mobile: '88888888888'
      }],
      total: 0,
      pagenum: 1,
      // input3绑定的值
      input3: '',
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      // 是否显示编辑用户对话框
      editUserFormVisible: false,
      // 表单数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑表单数据
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度为3-5之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度为6-12之间', trigger: 'blur' }
        ],
        email: [
          // { required: false, message: '请输入邮箱', trigger: 'blur' }
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '格式不正确', trigger: 'blur' }
        ],
        mobile: [
          // { required: false, message: '格式不正确', trigger: 'blur' }
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/, message: '长度为6-12之间', trigger: 'blur' }
        ]
      }
    }
  },
  // 进入就要得导数据 写在钩子函数中
  created () {
    this.getUsersData()
  },
  methods: {
    // 更改状态
    changeState (row) {
      const { id, mg_state } = row
      this.$axios.put(`users/${id}/state/${mg_state}`
        // this.$axios.put(`users/${id}/state/${mg_state}`, null, {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      ).then(res => {
        this.$message({
          message: '状态修改成功',
          type: 'success',
          duration: 800
        })
      })
    },
    // 点击删除用户
    delUser (id) {
      console.log(id)
      this.$axios.delete(`users/${id}`
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      ).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          // 提示
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          })
          // 刷新
          this.getUsersData()
        }
      })
    },
    // 关闭对话框清空内容
    dialogClosed () {
      this.$refs.addUserRef.resetFields()
    },
    // 添加用户
    addUser () {
      this.$axios.post('users', this.addUserForm
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      ).then(res => {
        // console.log(res)
        // 添加成功
        if (res.data.meta.status === 201) {
          // 关闭对话框
          this.dialogAddUserVisible = false
          // 提示信息
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 800
          })
          // 刷新
          this.getUsersData(1)
        }
      })
    },
    // 添加用户点击框出现
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    //编辑用户点击框出现
    showEditForm (row) {
      this.editUserFormVisible = true
      console.log(row);
      const { username, email, mobile, id } = row
      this.editUserForm.username = username;
      this.editUserForm.email = email;
      this.editUserForm.mobile = mobile;
      this.editUserForm.id = id;
    },
    // 编辑用户
    async editUser () {
      const { email, mobile, id } = this.editUserForm
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      console.log(res);
      if (res.data.meta.status === 200) {
        this.editUserFormVisible = false
        this.$message({
          message: '编辑成功',
          type: 'success',
          duration: 800
        })
        this.getUsersData(this.pagenum)

      }
    },
    // 点击搜索功能
    search () {
      // console.log(11)
      this.getUsersData(1, this.input3)
    },
    // 点击分页
    currentPageChanged (curPage) {
      this.getUsersData(curPage, this.input3)
    },
    // 进入页面渲染数据默认第一页
    getUsersData (pagenum = 1, query = '') {
      this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
        // headers: {
        //   // 携带令牌
        //   Authorization: localStorage.getItem('token')
        // }
      }).then(res => {
        // 保存数据
        this.usersData = res.data.data.users
        // 保存页数
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    }
  }
}
