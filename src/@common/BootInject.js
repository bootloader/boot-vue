import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// import DataService from "@common/services/DataService";
// import tunnel from "@common/services/tunnel";
import formatters from "@common/services/formatters.js";

export default {
  install(app) {
    // 1. Register toast
    app.config.globalProperties.$toast = toast;

    // 2. Register service
    // app.config.globalProperties.$service = DataService;
    // DataService.init(app);

    // 3. Register tunnel
    // app.config.globalProperties.$tunnel = tunnel;

    // 4. Register formatters
    app.config.globalProperties.$f = formatters;
    app.provide("formatters", formatters);
  },
};

/*

Options API >>
this.$service.getX('/api/users')


Composition API >>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
proxy.$service.getX('/api/users')


In any file >>
import { toast } from 'vue3-toastify'
toast('Simple toast')
toast.success('Success')
toast.error('Error occurred')
toast.info('Heads up')

*/
