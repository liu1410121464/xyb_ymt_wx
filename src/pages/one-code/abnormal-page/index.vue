<template>
  <div class="abnormal-page">
    <van-image
        v-if="props.title == '已下线'"
        class="image"
        width="75"
        :src="require('@/assets/one-code/icon-offline.png')"
      />
      <van-image
        v-if="props.title == '维护中'"
        class="image"
        width="75"
        :src="require('@/assets/one-code/icon-repair.png')"
      />
      <van-image
        v-if="props.title == '未查询到可用的服务'"
        class="image"
        width="75"
        :src="require('@/assets/one-code/icon-noserve.png')"
      />
      <div class="name">{{props.title}}</div>
      <div class="desc" v-if="props.title == '维护中'">
        {{'该服务正在维护，预计11月11日恢复！'}}
      </div>
      <div class="desc" v-if="props.title == '已下线'">
        {{'湘易办长沙地铁码服务已下线，您可以通过下载“长沙地铁”App继续使用地铁码服务，支持信用金退款。'}}
      </div>
      <div class="desc" v-if="props.title == '未查询到可用的服务'">
        {{props.errorMsg}}
      </div>
  </div>
</template>

<script setup>
import { defineProps,onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },
  errorMsg: {
    type: String,
    default: () => ''
  }
});

onMounted(() => {
  
});

</script>

<style lang="less" scoped>
  .abnormal-page{ 
    margin:0 15px;
    text-align: center;
    .image{
      margin:36px 0 26px;
    }
    .name{
      color: #1e1e1e;
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
    }
    .desc{
      padding:10px 0 13px;
      color: #666666;
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
    }
  }
</style>
