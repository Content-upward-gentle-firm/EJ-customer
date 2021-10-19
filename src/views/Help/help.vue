<template>
  <div class="help">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="使用帮助"
      />
    </van-sticky>
    <!-- 列表 -->
    <div class="cell">
      <van-cell>
        <img width="26px" src="../../assets/tip.png" alt="">
        <span class="spanTitle">常见问题</span>
      </van-cell>
      <van-cell value="1.优惠券如何使用？" />
      <van-cell value="2.取消订单后钱什么时候到账？" />
      <van-cell value="3.可以固定同一个阿姨服务吗？" />
      <van-cell value="4.如何选择上一次服务的阿姨？" />
      <van-cell value="5.预约成功后在哪查看？" />
      <van-cell>
        <img width="26px" src="../../assets/tip.png" alt="">
        <span class="spanTitle">更多问题</span>
      </van-cell>
      <van-grid :column-num="3">
        <van-grid-item text="订单相关" />
        <van-grid-item text="客户端使用" />
        <van-grid-item text="优惠券与活动" />
        <van-grid-item text="支付与费用" />
        <van-grid-item text="服务相关" />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* 标题文字大小 */
.van-cell .van-cell__value .spanTitle{
  line-height: 30px;
  font-size: 20px;
}
/* 内容文字大小 */
.van-cell .van-cell__value{
  font-size: 14px;
}

</style>