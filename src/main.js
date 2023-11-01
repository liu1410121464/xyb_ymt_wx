import { createApp } from 'vue';
import App from './App.vue';
import AllRouter from '@/router/all_router';
//--slot--start--
import Router from '@/router/home'; //首页路由
//--slot--end--

import './style/theme.css';
import './style/vant.less';
import store from './store'

import { installVant } from './components/vant';

let app = createApp(App)
installVant(app);
if (process.env.NODE_ENV === 'development') {
  app.use(AllRouter).use(store).mount('#app');
} else {
  app.use(Router).use(store).mount('#app');
}

// 全局异常捕获
app.config.errorHandler = (err, instance, info) => {
  console.error('globalerr==>', err, instance, info);
};

