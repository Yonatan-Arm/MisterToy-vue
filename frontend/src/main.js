import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './styles/styles.scss'




const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDVaWRaXe4Fxq65Ws1-ZcA7fhz2ENG2L1g',
    }})


app.use(ElementPlus)
app.mount('#app')