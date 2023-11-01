<template>
  <div class="obstacles-page">
    <van-image
        class="image"
        width="145"
        :src="require('@/assets/one-code/icon-wkt.png')"
      />
      <div class="desc">您需要完善身份信息并进行认证后开通居民码</div>

      <div class="check">
        <van-checkbox v-model="checked" @change="checkChange" shape="square">我已阅读并同意<span>《XXXX协议》</span>和<span>《XXXX协议》</span>
        </van-checkbox>
      </div>

      <van-button :disabled=disabled @click="handleObstacles" class="btn-obs">立即开通</van-button>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
// import { getCode } from '@/api/one-code.js'
const checked = ref(false);
const disabled = ref(true)

onMounted(() => {
  // 获取验证码
  // getCode().then(res => {
  //   console.log('获取验证码',res)
  // })
});

const emit = defineEmits(['changeObs']);
// const wx = require('weixin-js-sdk');
// function isWeixin() {
//   var ua = navigator.userAgent.toLowerCase();
//   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//     return true;
//   } else {
//     return false;
//   }
// }
function handleObstacles(){
  console.log('立即开通')
  emit('changeObs', true)
  // 区分支付宝和微信的人脸识别
  // if (isWeixin()) {
  //   // 微信人脸识别
  //   wx.checkJsApi({
  //     jsApiList: ['checkIsSupportFaceDetect'],
  //     success: function (res) {
  //       console.log('检测人脸识别', res)
  //       if (res.checkResult.checkIsSupportFaceDetect == false) {
  //         // 不支持人脸识别
  //         console.log('不支持人脸识别')
  //       } else {
  //         // 支持人脸识别
  //         wx.startSoterAuthentication()
  //       }
  //     }
  //   });
  // } else {
  //   // 支付宝
  //   // window.location.href = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2021002137680003&scope=auth_user&redirect_uri=http%3a%2f%2fwww.baidu.com&state=init'
  // }
  
}

function checkChange(){
  if(checked.value){
    disabled.value = false
  }else{
    disabled.value = true
  }
}

</script>

<style lang="less" scoped>
:deep(.van-checkbox__icon .van-icon) {
  width:14px;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  border-radius: 2px;
}
:deep(.van-checkbox__icon){
  height: 14px;
}
:deep(.van-checkbox__label){
  margin-left: 5px;
}

  .obstacles-page{ 
    margin:0 15px;
    text-align: center;
    .image{
      margin:36px 0 26px;
    }
    .desc{
      padding:10px 0 13px;
      color: #333333;
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
    }
    .check{
      color: #666666;
      font-size: 12px;
      line-height: 14px;
      display: flex;
      justify-content: center;
      span{
        color: #0a6dff;
      }
    }
    .btn-obs{
      margin-top:14px;
      width:100%;
      height:40px;
      line-height: 40px;
      text-align: center;
      background: #0A6DFF;
      color: #ffffff;
      font-size: 14px;
      font-weight: 400;
      border-radius: 40px;
    }
  }
</style>
