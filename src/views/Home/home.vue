<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-14 01:23:33
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-14 01:36:01
-->
<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="title">易洁家政</div>
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="item in swiperData" :key="item.id">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 菜单分类区域 -->
    <div class="category">
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          v-for="(item, index) in categories"
          :key="index"
          :icon="item.icon"
          :text="item.name"
          @click="toProductionHandler(index, item.id)"
        />
      </van-grid>
    </div>
    <div class="content">
      <van-grid :column-num="2" icon-size="130px" clickable>
        <van-grid-item 
          v-for="(item, index) in products"
          :key="index"
          :icon="item.photo"
          :text="item.name"
          
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
// 引入辅助函数
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    // 获取轮播图数据
    this.getSwiperData();
    this.findAllCategories(); // 查询所有的栏目数据
    this.findProducts();
  },
  computed: {
    // 轮播图数据
    ...mapState("home", ["swiperData"]),
    ...mapState("category", ["categories"]),
    ...mapState("product", ["products"]),
  },
  methods: {
    // 获取轮播图数据
    ...mapActions("home", ["getSwiperData"]),
    ...mapActions("category", ["findAllCategories"]),
    ...mapActions("product", ["findProducts"]),
    // 点击栏目跳转至产品列表
    toProductionHandler(index, id) {
      this.$router.push({
        path: "product",
        query: {
          index,
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
/* 轮播样式 */
.home .title {
  height: 130px;
  background-image: linear-gradient(to right, #7579ff, #bf73ff);
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  font-size: 29px;
  font-family: "webfont";
  color: white;
  text-align: center;
  padding-top: 5px;
}
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("//at.alicdn.com/t/webfont_mtjyk0oq5ef.eot"); /* IE9*/
  src: url("//at.alicdn.com/t/webfont_mtjyk0oq5ef.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("//at.alicdn.com/t/webfont_mtjyk0oq5ef.woff2")
      format("woff2"),
    url("//at.alicdn.com/t/webfont_mtjyk0oq5ef.woff") format("woff"),
    /* chrome、firefox */ url("//at.alicdn.com/t/webfont_mtjyk0oq5ef.ttf")
      format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("//at.alicdn.com/t/webfont_mtjyk0oq5ef.svg#AlibabaPuHuiTiH")
      format("svg"); /* iOS 4.1- */
}
.home .swipe {
  width: 90%;
  height: 160px;
  position: absolute;
  top: 136px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 #aaaaaa;
  border-radius: 8px;
}
.home .swipe img {
  height: 160px;
  width: 100%;
  border-radius: 8px;
}
.category {
  margin-top: 90px;
}
</style>