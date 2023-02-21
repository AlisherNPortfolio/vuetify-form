import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
    theme: {
        themes: {
            light: {
                primary: "#82b19f",
                secondary: "#f4bf1c",
                accent: "#47333c",
                error: "#dc6276",
                background: "#F6F5F4",
                formBackground: "#f7f7f7"
            },
            dark: {
                primary: "#82b19f",
                background: "#181b1f",
                formBackground: "#23272b"
            }
        }
    }
});
