
export default {
  data () {
    return {
      roleData: [{
        roleName: '王小虎',
        roleDesc: 'xxxx'
      }],
      // 是否显示分配权限框
      dialogRightsVisible: false,
      // 树的数据
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: 0

    }
  },
  created () {
    this.getRolesData()
    this.getRightsData()
  },
  methods: {
    // 第一列序号
    indexMethod (index) {
      return index
    },
    // 获取角色数据
    async  getRolesData () {
      let res = await this.$axios.get('roles')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.roleData = res.data.data
      }
    },
    // 是否显示分分配角色框
    showRightsD (row) {
      // console.log(row.id)
      // 获取对应的角色的id 提供给分配权限使用
      this.roleId = row.id
      // 使框显现
      this.dialogRightsVisible = true
      let keys = []
      // 获取最里层的id
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)
            keys.push(item3.id)
          })
        })
      })
      // 异步更新dom,获取已有权限打钩
      this.$nextTick(() => {
        console.log(this.$refs.tree)
        // 通过key设置 框架提供的方法
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 获取全部的权限列表
    async getRightsData () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      this.treeData = res.data.data
    },
    // 分配权限 确定
    async dialogRights () {
      // 获取参数rids：全选√ 半选 - 都要得到
      // 框架提供了方法
      // 半选
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      // 全选
      let keys2 = this.$refs.tree.getCheckedKeys()
      let keys = [...keys1, ...keys2]
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.dialogRightsVisible = false
        this.$message({
          message: '分配成功',
          type: 'success',
          duration: 800

        })
        this.getRolesData()
      }
    }

  }
}
