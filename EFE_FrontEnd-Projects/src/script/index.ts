import {createApp} from "vue";
import app from "#/template/App.vue"
import router from "../router/index"

import "#/style/index.css"
import "#/style/loaderAni.css"

const App = createApp(app);
App.use(router).mount("#container")