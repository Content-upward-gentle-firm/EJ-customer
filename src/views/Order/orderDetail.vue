<template>
  <div class="orderDetail">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 商品信息展示 -->
    <div v-if="$route.query.item.orderLines.length == 0">
      <van-empty description="暂时没有数据" />
    </div>
    <div v-else class="orderLines">
      <van-card
        v-for="item in $route.query.item.orderLines"
        :key="item.id"
        :num="item.number"
        :price="item.price + '.00'"
        :desc="item.product.description"
        :title="item.product.name"
        :thumb="item.product.photo"
      />
      <van-divider />
      <p class="count">
        总计:<span style="color: red">¥{{ $route.query.item.total }}</span>
      </p>
      <van-divider />
      <div class="address">
        <p>服务地址：{{$route.query.item.address.province+''+$route.query.item.address.city+''+$route.query.item.address.area+''+$route.query.item.address.address}}</p>
        <p>联系方式：{{$route.query.item.customer.username}} ({{$route.query.item.customer.telephone}})</p>
        <p>下单时间：{{new Date(parseInt($route.query.item.orderTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
        <p>服务时间：{{new Date(parseInt($route.query.item.serviceTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
        <p>{{ $route.query.item.status}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 返回上一级页面
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.van-card {
  box-shadow: 1px 1px 1px 1px rgba(143, 66, 255, 0.4);
  background-color: white;
  width: 95%;
  border-radius: 5px;
  margin: 5px auto;
  padding: 5px;
}
.count {
  text-align: right;
  color: #333;
  font-size: 12px;
 }
.address {
  background-color: #f8f8f8;
  padding: 1em 0.5em;
}
.address p {
  margin: 0;
  margin-bottom: 0.5em;
  font-size: 12px;
  color: #999;
}
.address p:last-child {
  margin-bottom: 0;
  text-align: right;
}
</style>