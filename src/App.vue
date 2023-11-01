<template>
  <router-view />
</template> 
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  
});
</script>

<style lang="less">
@import './style/flex.css';
@import './style/reset.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --app-gray-color: #86909c;
  /* --app-background-color: #F7F8FA; */
  --app-background-color: #fff;
  --app-black-color: #191919;
  --app-background-image: linear-gradient(to bottom, #e0edfc, white 40%);
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  /*overflow: hidden;*/
}

.van-field__body input::placeholder {
  color: #86909c;
}
</style>

