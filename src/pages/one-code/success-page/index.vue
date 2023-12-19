<template>
  <div class="success-page">
    <div class="success-main">
      <div class="mid-sucs" v-show="sucsShow">
        <div class="code">
          <van-image class="image" width="300" height="300" :src="scanCodeImg" />
          <div class="tips">
            <div class="words">二维码每分钟自动刷新</div>
            <div class="refresh" @click="refreshCode">刷新</div>
          </div>
        </div>
        <div class="information">
          <van-image width="40" height="40" :src="require('@/assets/one-code/icon-infor.png')" />
          <div class="specific-info">
            <div class="name">{{props.userInfo.userName}}（{{props.userInfo.certNo}}）</div>
            <div class="tel">手机号：{{props.userInfo.phoneNumber}}</div>
          </div>
        </div>
      </div>
      <div class="mid-fail" v-show="failShow">
        <van-image class="image" width="74" height="74" :src="require('@/assets/one-code/icon-fail.png')" />
        <div class="name">二维码获取失败</div>
        <div class="desc">我们遇到了错误，点击刷新试试！</div>
        <van-button @click="handleRefresh" class="btn-refresh">刷新</van-button>
      </div>
    </div>
    <div class="register-app">
      <div class="main">
        <div class="item" v-for="(item, index) in registerList" :key="index" @click="linkTo(item)">
          <van-image class="image" width="50" :src="item.avatar" />
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!-- 弹框 -->
    <van-popup v-model:show="showStay" round position="bottom" :style="{ height: '40%' }" closeable close-icon-position="top-right" @close="closePopup">
      <div class="popup">
        <div class="popup-title">{{stayTitle}}</div>
        <div class="popup-main">
          <div class="name">
            <span>随机码</span>请出示随机码或二维码进行核验
          </div>
          <div class="square-main">
            <div v-for="(item, index) in accommodationNum" :key="index" class="square">{{item}}</div>
          </div>
          <div class="countdown">
            <van-image width="15" height="15" :src="require('@/assets/one-code/icon-time.png')" />
            <span class="time">倒计时：{{time}}s</span>
          </div>
        </div>
        <div class="popup-footer">
          <van-button @click="closePopup" class="btn-close">关闭</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="showInternet" round position="bottom" :style="{ height: '40%' }" closeable close-icon-position="top-right" @close="closePopupInternet">
      <div class="popup">
        <div class="popup-title">{{stayTitle}}</div>
        <div class="popup-main">
          <div class="name">
            <span>随机码</span>请出示随机码或二维码进行核验
          </div>
          <div class="square-main">
            <div v-for="(item, index) in internetNum" :key="index" class="square">{{item}}</div>
          </div>
          <div class="countdown">
            <van-image width="15" height="15" :src="require('@/assets/one-code/icon-time.png')" />
            <span class="time">倒计时：{{intTime}}s</span>
          </div>
        </div>
        <div class="popup-footer">
          <van-button @click="closePopupInternet" class="btn-close">关闭</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { getResidentCode, getAccommodation, getInternet } from '@/api/one-code.js';
const QRCode = require('qrcode')
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => { }
  },
  registerList: {
    type: Array,
    default: () => { }
  }
});
// [
//   { name: '住宿登记', url: require('@/assets/one-code/icon-zhusu.png') },
//   { name: '网吧登记', url: require('@/assets/one-code/icon-wangba.png') },
// ]
const scanCodeImg = ref('');
const sucsShow = ref(false);
const failShow = ref(true);
const time = ref(120);
const intTime = ref(120);
const showStay = ref(false); //住宿登记弹框
const showInternet = ref(false); //网吧登记弹框
const stayTitle = ref('');
const accommodationNum = ref(''); //住宿登记随机码
const internetNum = ref(''); //网吧登记随机码
var timer = null;
var intTimer = null;
onMounted(() => {
  getResidentCodeImg()
});
onbeforeunload = function () {
  clearInterval(timer)
}

// 创建二维码（居民码）
function getResidentCodeImg () {
  getResidentCode().then(res => {
    console.log(res)
    scanCodeImg.value = createQRCode(res.data)
    sucsShow.value = true;
    failShow.value = false;
  }).catch(err => {
    console.log(err)
    failShow.value = true
    sucsShow.value = false;
  })
}
// uuid转换成二维码
async function createQRCode (uuid) {
  try {
    scanCodeImg.value = await QRCode.toDataURL(uuid)
    console.log(scanCodeImg)
  } catch (err) {
    console.error(err)
  }
}
// 住宿登记随机码（居民码）
function getAccommodationImg () {
  getAccommodation().then(res => {
    console.log('住宿登记随机码（居民码）', JSON.parse(res.data).data)
    accommodationNum.value = JSON.parse(res.data).data
  }).catch(err => {
    console.log(err)
  })
}
// 网吧登记随机码（居民码）
function getInternetImg () {
  getInternet().then(res => {
    console.log('网吧登记随机码', res)
    internetNum.value = JSON.parse(res.data).msg
  }).catch(err => {
    console.log(err)
  })
}
function linkTo (item) {
  stayTitle.value = item.name
  if (item.code == 'stay_registration') {
    showStay.value = true
    showInternet.value = false
    if (!accommodationNum.value) {
      getAccommodationImg()
    }
    // 初始化倒计时
    clearInterval(timer)
      timer = setInterval(() => {
        time.value--
        if (time.value == 0) {
          getAccommodationImg()
          // clearInterval(timer)
          time.value = 120
        }
      }, 1000);

  } else if(item.code == 'internet_registration'){
    showInternet.value = true
    showStay.value = false
    if (!internetNum.value) {
      getInternetImg()
    }
    // 初始化倒计时
    clearInterval(intTimer)
      intTimer = setInterval(() => {
        intTime.value--
        if (intTime.value == 0) {
          getInternetImg()
          // clearInterval(timer)
          intTime.value = 120
        }
      }, 1000);
  }
}
// 关闭弹窗
function closePopup () {
  showStay.value = false
  // 关闭后清除倒计时
  clearInterval(timer)
}
// 关闭网吧登记弹窗
function closePopupInternet () {
  showInternet.value = false
  // 关闭后清除倒计时
  clearInterval(intTimer)
}
// 刷新二维码
function handleRefresh () {
  getResidentCodeImg()
}
// 刷新二维码
function refreshCode () {
  getResidentCodeImg()
}
</script>

<style lang="less" scoped>
.success-page {
  .success-main {
    background: #ffffff;
  }
  .mid-sucs {
    .code {
      text-align: center;
      .image {
        margin: 18px 0 15px;
      }
      .tips {
        font-family: 'PingFang SC';
        font-size: 14px;
        display: flex;
        justify-content: center;
        .words {
          padding-right: 14px;
          color: #666666;
        }
        .refresh {
          color: #0a6dff;
        }
      }
    }
    .information {
      display: flex;
      align-items: center;
      margin: 22px 14px 0;
      padding: 10px;
      border-radius: 7px;
      background: #0a6dff0f;
      .specific-info {
        margin-left: 10px;
        font-family: 'PingFang SC';
        font-weight: 400;
        .name {
          color: #333333;
          font-size: 14px;
          line-height: 15px;
          margin-bottom: 9px;
        }
        .tel {
          color: #666666;
          font-size: 12px;
          line-height: 15px;
        }
      }
    }
  }
  .mid-fail {
    margin: 0 15px;
    text-align: center;
    .image {
      margin: 36px 0 26px;
    }
    .name {
      color: #1e1e1e;
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
    }
    .desc {
      padding: 10px 0 13px;
      color: #666666;
      font-size: 13px;
      font-weight: 400;
    }
    .btn-refresh {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #0a6dff;
      color: #0a6dff;
      font-size: 13px;
      font-weight: 400;
      border-radius: 40px;
    }
  }
  .register-app {
    margin-top: 13px;
    padding: 14px 24px;
    border-radius: 10px;
    background: #fff;
    .main {
      display: flex;
      .item {
        text-align: center;
        width: 25%;
        .name {
          margin-top: 9px;
          color: #000000;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }

  .popup {
    .popup-title {
      text-align: center;
      color: #1d2129;
      font-family: 'PingFang SC';
      font-size: 16px;
      font-weight: 500;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eeeff2;
    }
    .popup-main {
      padding: 15px 15px 28px;
      .name {
        color: #666666;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        span {
          margin-right: 7px;
          font-size: 14px;
          color: #333333;
          font-weight: 500;
        }
      }
      .square-main {
        display: flex;
        justify-content: center;
        margin: 14px 0;
        .square {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border: 1px solid #aeafaf;
          color: #0a6dff;
          font-size: 25px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .countdown {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666666;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        .time {
          margin-left: 7px;
        }
      }
    }
    .popup-footer {
      text-align: center;
      .btn-close {
        width: 110px;
        height: 40px;
        border-radius: 20px;
        background: #0a6dff;
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>
