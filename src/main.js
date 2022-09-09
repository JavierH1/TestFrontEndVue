import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDVzkMu48l10qc5LmDbU1EIasmRoeySVbA",
    authDomain: "sdcysfpyme-c46e0.firebaseapp.com",
    projectId: "sdcysfpyme-c46e0",
    storageBucket: "sdcysfpyme-c46e0.appspot.com",
    messagingSenderId: "977260708911",
    appId: "1:977260708911:web:6f447c081f1e84c0bf72da"
};

initializeApp(firebaseConfig);


createApp(App).use(store).use(router).mount('#app');