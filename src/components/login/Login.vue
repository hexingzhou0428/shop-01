<template>

  <el-row
    type='flex'
    justify="center"
    align="middle"
  >
    <el-col :span=8>
      <el-form
        :model="loginFrom"
        :rules="rules"
        ref="loginFrom"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginFrom.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          status-icon="false"
        >
          <el-input v-model="loginFrom.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            @click='submitForm'
            type='success'
          >登录</el-button>
          <el-button
            @click='resetForm'
            type='primary'
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
// import axios from 'axios'
export default {
  data () {
    return {
      loginFrom: {
        username: 'admin',
        password: '123456'

      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginFrom.validate((valid) => {
        if (!valid) {
          this.$message({
            message: '校验失败',
            type: 'error',
            duration: '500'
          })
          return
        }
        axios.post('http://localhost:8888/api/private/v1/login', this.loginFrom).then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            // 保存token令牌到本地
            localStorage.setItem('token', res.data.data.token)
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 500
            })
            // 跳转
            this.$router.push('/home')
          } else {
            this.$message({
              message: '登录失败',
              type: 'error',
              duration: 500
            })
          }
        })
      })
    },
    resetForm () {
      this.$refs.loginFrom.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
}
</style>
