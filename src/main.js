import Vue from 'vue'
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import 'firebase/firestore'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'




Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyAdaMdhpdNyNeBvFqjiUnuY2Hbm_3X5jQM",
  authDomain: "climbing-history.firebaseapp.com",
  databaseURL: "https://climbing-history.firebaseio.com",
  projectId: "climbing-history",
  storageBucket: "climbing-history.appspot.com",
  messagingSenderId: "1029984012667",
  appId: "1:1029984012667:web:1c2993d398ca8d5837d5de"
})
export const db = firebase.firestore();


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
