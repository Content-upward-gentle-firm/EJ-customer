<template>
  <div class="orderConfirm">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="订单确认"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <div class="orderContent">
      <!-- 订单详情卡片 -->
      <div class="orderInfo">
        <div>订单详情</div>
        <van-row
          type="flex"
          justify="center"
          v-for="(item, index) in resetOrderLines"
          :key="index"
        >
          <van-col span="8">{{ item.productName }}</van-col>
          <van-col span="6">￥{{ item.price }}</van-col>
          <van-col span="6">✖ {{ item.number }}</van-col>
        </van-row>
        <van-row style="text-align: right"> 总计：{{ total }} </van-row>
      </div>
      <!-- 地址选择卡片 -->
      <div class="orderAddress" @click="addressShow = true">
        <div>服务地址</div>
        <van-row v-if="defaultAddress">
          <van-col :span="8"> 姓名：{{ defaultAddress.username }} </van-col>
          <van-col :span="16"> 电话：{{ defaultAddress.telephone }} </van-col>
        </van-row>
        <van-row v-if="defaultAddress">
          地址：{{
            defaultAddress.province +
            defaultAddress.city +
            defaultAddress.area +
            defaultAddress.address
          }}
        </van-row>
      </div>
      <!-- 服务时间卡片 -->
      <div class="orderTime" @click="datetimeShow = true">
        <van-row>
          <van-col :span="6">服务时间：</van-col>
          <van-col :span="18">{{ currentDate | dateFormat }}</van-col>
        </van-row>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="confirm_btn" @click="orderConfirm">确认提交</div>
    <!-- 地址选择列表 -->
    <van-action-sheet v-model="addressShow" title="选择地址">
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="confirmAddressHandler"
        add-button-text="确认"
      />
    </van-action-sheet>
    <!-- 时间选择器 -->
    <van-action-sheet v-model="datetimeShow" title="选择服务时间">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        @order="confirmDateTime"
        :formatter="datatimeFmt"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import { post_json } from "@/http/axios";
import { Notify } from "vant";
export default {
  data() {
    return {
      addressShow: false,
      chosenAddressId: null,
      datetimeShow: false,
      currentDate: new Date(),
      minDate: new Date(),
    };
  },
  created() {
    this.getUserInfo(); // 过去用户的详细信息
    this.findAddress(this.userInfo.id);
  },
  computed: {
    ...mapState("shopcart", ["orderLines"]),
    ...mapGetters("shopcart", ["total"]),
    ...mapState("user", ["userInfo"]),
    ...mapState("address", ["address"]),
    defaultAddress() {
      return this.address.filter((item) => {
        return item.isDefault == 1;
      })[0];
    },
    addressList() {
      let address = _.clone(this.address);
      address.forEach((item) => {
        item.name = item.username;
        item.tel = item.telephone;
        item.address = item.province + item.city + item.area + item.address;
      });
      return address;
    },
    resetOrderLines() {
      return Array.from(this.orderLines.values());
    },
  },
  methods: {
    ...mapActions("user", ["getUserInfo"]),
    ...mapActions("address", ["findAddress"]),
    ...mapMutations("shopcart", ["clearShopCar"]),
    // 返回上一级页面
    onClickLeft() {
      this.$router.go(-1);
    },
    // 订单提交
    orderConfirm() {
      let payload = {
        customerId: this.userInfo.id,
        addressId: this.defaultAddress.id,
        serviceTime: this.currentDate.getTime(),
        orderLines: this.resetOrderLines,
      };
      post_json("/order/submitOrder", payload).then((res) => {
        // 提示成功信息
        Notify({ type: "success", message: res.data.message });
        // 清空购物车
        this.clearShopCar();
        // 路由跳转
        this.$router.push({ path: "order" });
      });
    },
    // 地址确定按钮
    confirmAddressHandler() {
      this.addressShow = false;
      // 将选中的地址ID赋值给defaultAddressId
      this.defaultAddress.id = this.chosenAddressId;
    },
    // 时间确定按钮
    confirmDateTime(value) {
      this.currentDate = value;
      this.datetimeShow = false;
    },
    // 时间格式化函数
    datatimeFmt(type, value) {
      switch (type) {
        case "year":
          return value + "年";
          break;
        case "month":
          return value + "月";
          break;
        case "day":
          return value + "日";
          break;
        case "hour":
          return value + "时";
          break;
        case "minute":
          return value + "分";
          break;

        default:
          return value;
          break;
      }
    },
  },
};
</script>

<style scoped>
/* 提交按钮 */
.confirm_btn {
  width: 53%;
  height: 40px;
  background-image: linear-gradient(to right, #7579ff, #bf73ff);
  text-align: center;
  color: #fff;
  border-radius: 22px;
  line-height: 40px;
  margin: 0 auto;
  margin-top: 2em;
  cursor: pointer;
}
.van-icon-edit {
  display: none;
}
/* 充值 */
.cz {
  height: 80px;
  text-align: center;
}
.orderContent {
  padding: 10px;
}
.orderInfo {
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(153, 153, 153, 0.178);
  padding: 5px;
  line-height: 30px;
}
.orderAddress {
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(153, 153, 153, 0.178);
  padding: 5px;
  line-height: 20px;
  margin-top: 10px;
}
.orderTime {
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(153, 153, 153, 0.178);
  padding: 5px;
  line-height: 20px;
  margin-top: 10px;
}
</style>