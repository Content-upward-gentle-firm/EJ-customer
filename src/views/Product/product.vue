<template>
  <div class="product">
    <!-- 顶部导航栏 -->
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="服务产品"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <!-- 根据栏目查询对应的产品信息 -->
    <div class="productContent">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(item, index) in categories"
          :key="index"
          :title="item.name"
          @click="categoryClickHandler(item.id)"
        />
      </van-sidebar>
      <div class="product">
        <van-card
          v-for="(item, index) in products"
          :key="index"
          :price="item.price"
          :desc="item.description"
          :title="item.name"
          :thumb="item.photo"
        >
          <template #footer>
            <van-stepper
              v-model="item.number"
              theme="round"
              button-size="22"
              disable-input
              :min="0"
              :default-value="0"
              @change="stepperChange(item)"
            />
          </template>
        </van-card>
      </div>
    </div>
    <van-submit-bar
      :price="total * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      // 侧边导航默认点击
      activeKey: 0,
      // 首页跳转后传递的栏目id
      categoryId: "",
      // 步进器最小值
      value: 0,
    };
  },
  computed: {
    ...mapState("category", ["categories"]),
    ...mapState("product", ["products"]),
    ...mapGetters("shopcart", ["total"]),
  },
  created() {
    // 将首页点击的栏目索引赋值给当前页的activeKey
    this.activeKey = this.$route.query.index;
    // 根据栏目查询商品列表
    this.findProducts(this.$route.query.id);
    // 查询所有栏目信息
    this.findAllCategories();
  },
  methods: {
    ...mapActions("category", ["findAllCategories"]),
    ...mapActions("product", ["findProducts"]),
    ...mapMutations("shopcart", ["addShopCar"]),
    // 返回上一页
    onClickLeft() {
      this.$store.getters.total = 0;
      this.$router.go(-1);
    },
    // 左侧栏目点击事件
    categoryClickHandler(id) {
      this.findProducts(id);
    },
    // 步进器change事件
    stepperChange(product) {
      let orderLine = {
        number: product.number,
        price: product.price,
        productId: product.id,
        productName: product.name,
      };
      this.addShopCar(orderLine);
    },
    // 提交订单事件
    onSubmit() {
      if (this.total == 0) {
        Toast.fail("请先选择商品服务");
      } else {
        this.$router.push({ path: "orderConfirm" });
      }
    },
  },
};
</script>

<style scoped>
/* 产品整体样式 */
.productContent {
  display: flex;
  height: calc(100vh - 100px);
}
.product {
  flex: 1;
}
.van-card {
  margin: 10px;
  height: 130px;
}
</style>