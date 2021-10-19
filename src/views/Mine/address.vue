<template>
  <div class="address">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="常用地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    // 返回上一级页面
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.content {
  padding: 16px 16px 160px;
}
/* cell样式 */
.van-cell {
  box-shadow: 2px 2px 2px rgba(247, 248, 249, 0.8);
  background-color: white;
  width: 98%;
  border-radius: 5px;
  margin: 5px auto;
  padding: 10px;
}
/* 新增按钮样式 */
.addBtn {
  background-image: linear-gradient(to right, #7579ff, #bf73ff);
  border: none;
  width: 70%;
  position: fixed;
  bottom: 4em;
  left: 15%;
}
</style>