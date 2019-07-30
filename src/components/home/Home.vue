<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span=8><img
            src="../../assets/logo.png"
            alt="logo"
          ></el-col>
        <el-col :span=8>
          <h1>后台管理系统</h1>
        </el-col>
        <el-col
          class="bb"
          :span=8
        >恭喜前端小伙子们月薪20k <a
            @click.prevent='logout'
            href="#"
          >退出</a></el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="handleUrlPath()"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">角色列表</el-menu-item>
            <el-menu-item index="/rights">权限列表</el-menu-item>
          </el-submenu>

          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">分类参数</el-menu-item>
            <el-menu-item index="3-3">商品分类</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">订单列表</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">数据列表</el-menu-item>
          </el-submenu> -->

        </el-menu>
      </el-aside>
      <!-- 右侧栏 -->
      <!-- 出口 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleUrlPath () {
      return this.$route.path
    },
    // 点击退出
    logout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        // 退出成功提示
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        // 跳转到登录页
        this.$router.push('/login')
      }).catch(() => {
        // 提示信息
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 800
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c1cd;
  padding: 0;
  h1 {
    line-height: 60px;
    text-align: center;
    color: #fff;
  }
  .bb {
    text-align: right;
    padding-right: 20px;
    line-height: 60px;
    a {
      color: rgb(205, 238, 18);
      text-decoration: none;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
</style>
