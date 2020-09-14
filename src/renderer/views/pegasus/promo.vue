<template>

    <div>
      <el-row v-for="item in indexNum" :key="item">
        <el-col>sss{{item}}</el-col>
      </el-row>
      <!--    <waterfall-->
      <!--      :col="col"-->
      <!--      :width="itemWidth"-->
      <!--      :gutterWidth="gutterWidth"-->
      <!--      :data="indexData"-->
      <!--      @loadmore="loadmore"-->
      <!--      @scroll="scroll"-->
      <!--    >-->
      <!--    </waterfall>-->
    </div>

</template>

<script>
import ScrollBar from '@/components/ScrollBar'
export default {
  name: 'promo', // 推荐
  data() {
    return {
      indexData: [], // 列表数据
      indexConfig: [], // 列表数据
      indexNum: 100
    }
  },
  components: {
    ScrollBar
  },
  computed: {
    itemWidth() {
      return 138 * 0.5 * (document.documentElement.clientWidth / 375) // rem布局 计算宽度
    },
    gutterWidth() {
      return 9 * 0.5 * (document.documentElement.clientWidth / 375) // rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    }
  },
  mounted() {
    console.log('你进来了吗')
  },
  methods: {
    scroll(scrollData) {
      console.log(scrollData)
    },
    switchCol(col) {
      this.col = col
      console.log(this.col)
    },
    loadmore(index) {
      this.data = this.data.concat(this.data)
    }
  }
}
</script>

<style scoped>
.image-cover {
  max-width: 300px;
  max-height: 300px;
}

</style>
