<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-07 21:53:55
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-14 01:46:22
-->
<template>
  <div class="Order">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="订单" />
    </van-sticky>
    <div class="content">
      <van-tabs v-model="activeName">
        <van-tab title="待派单" name="first">
          <order-table></order-table>
        </van-tab>
        <van-tab title="待接单">
          <order-table></order-table>
        </van-tab>
        <van-tab title="待确认">
          <order-table></order-table>
        </van-tab>
        <van-tab title="已完成">
          <order-table></order-table>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  
</template>

<script>
import OrderTable from "@/components/OrderList"
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  created() {},
  computed: {},
  methods: {},
  components: {
    OrderTable
  },
};
</script>

<style scoped>
</style>