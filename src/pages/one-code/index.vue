<template>
  <div class="one-code">
    <div class="warrper">
      <div class="success-state">
        <div class="logo">
          <van-image width="20" height="20" :src="require('@/assets/one-code/icon-logo.png')" />
          <div class="title">湘易办</div>
        </div>
        <!-- 待开通：提示页面 -->
        <!-- <ObstaclesPage @changeObs="handleChange" v-show="showPageOne"></ObstaclesPage> -->
        <!-- 正常页面：二维码是否获取失败 -->
        <SuccessPage v-show="showPageTwo" :userInfo="userInfo" :registerList="registerList"></SuccessPage>
        <!-- 异常页面：维护中/已下线/没有服务 -->
        <AbnormalPage :title="abnormalData" :errorMsg="errorMsg" v-show="showPageThree"></AbnormalPage>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import SuccessPage from '../one-code/success-page/index.vue';
// import ObstaclesPage from '../one-code/obstacles-page/index.vue';
import AbnormalPage from '../one-code/abnormal-page/index.vue';

// const showPageOne = ref(true);
const showPageTwo = ref(false);
const showPageThree = ref(false);
const abnormalData = ref('未查询到可用的服务'); //判断页面异常状态：维护中/已下线/没有服务
const errorMsg = ref(''); //获取服务列表失败的提示语
const isAbnormal = ref(null); //判断展示的页面是否异常
const store = useStore()
const userInfo = ref({}); //获取用户信息
const serviceList = ref([]); //获取服务列表
const registerList = ref([]); //获取随机码的配置列表
const token = window.location.href.indexOf('token') > -1 ? window.location.href.split('token=')[1].split('&')[0] : null
import { getService, getRegisterCode } from '@/api/one-code.js'
onMounted(() => {
  // 使用vuex存储token
  if (token) {
    store.dispatch('user/setToken', token)
  }
  getServiceList()
});
// 获取服务
function getServiceList () {
  let parmas = {
    cityCode: '430100000000',
    version: '',
    source: 'APPLET',
  }
  getService(parmas).then(res => {
    userInfo.value = res.data
    serviceList.value = res.data.serviceList
    getRegisterCodeList()
    serveCheck(res.data)
  }).catch(err => {
    console.log(err, '页面异常/未查询到可用的服务')
    showPageThree.value = true;  //页面异常/未查询到可用的服务'
    showPageTwo.value = false;
    abnormalData.value = '未查询到可用的服务';
    errorMsg.value = err

  })
}
// 获取随机码的配置列表
function getRegisterCodeList () {
  setTimeout(() => {
    if (serviceList.value.length) {
      let parmas = {
        serviceId: serviceList.value[0].id,
        cityCode: '4301',
        identifying: 1
      }
      getRegisterCode(parmas).then(res => {
        console.log(res)
        registerList.value = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }, 600)
}
// 接收服务列表组件传来的值
function serveCheck (value) {
  console.log('接收服务列表组件传来的值', value)
  isAbnormal.value = value;
  if (isAbnormal.value == null) {
    showPageThree.value = true;  //页面异常/未查询到可用的服务'
    showPageTwo.value = false;
    abnormalData.value = '未查询到可用的服务';
  } else {
    isAbnormal.value.serviceList.forEach(item => {
      if (item.state == 'UPHOLD' || item.state == 'OFFLINE') {
        abnormalData.value = item.stateName;
        showPageThree.value = true;  //页面异常
        showPageTwo.value = false;
      } else {
        showPageThree.value = false;
        showPageTwo.value = true;   //页面正常
      }
    });
  }
}


onMounted(() => {

});
</script>

<style lang="less" scoped>
.one-code {
  min-height: 100vh;
  background: linear-gradient(180deg, #d3ebfd 0%, #f1f2f3 100%);
  .warrper {
    padding: 14px;
    .success-state {
      padding: 18px 0 20px;
      border-radius: 16px;
      background: #fff;
      .logo {
        display: flex;
        justify-content: center;
        background: #fff;
        .title {
          padding-left: 4px;
        }
      }
    }
  }
}
</style>
