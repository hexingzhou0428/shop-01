<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: pink;
}
.el-aside {
  background-color: skyblue;
}
.el-main {
  background-color: lime;
}
</style>
