<template>
  <div>
    <el-button
      @click='go2goodsAdd'
      type='success'
      plain
    > 添加商品</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column type='index'>
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope ">
          <span>{{scope.row.add_time | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入moment
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [{
        goods_name: '冰箱',
        goods_price: '12000',
        goods_number: 1516,
        add_time: ''
      }]
    }
  },
  created () {
    this.getGoodsData()
  },
  filters: {
    dateFilter (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  },
  methods: {
    async getGoodsData () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 10
        }
      })
      // console.log(res)
      this.goodsData = res.data.data.goods
    },
    go2goodsAdd () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
