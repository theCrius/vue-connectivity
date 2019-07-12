import axios from 'axios';

const VueConnectivity = {
  install (Vue, options) {
    // Initialization
    const status = {
      network: false,
      internet: false
    };
    options = { ...DEFAULT_OPTIONS, ...options };
    let heartBeatLoop = undefined;
    if (options.debug) console.log('Vue-Connectivity - Ready!', options)
    heartBeatInit(options);

    Vue.mixin({
      mounted() {
        if (typeof window !== 'undefined') {
          status.network = !!navigator.onLine;
          const onlineHandler = async () => {
            status.network = true;
            status.internet = await request(options.requestMethod, options.heartbeatUrl,options.debug);
          }
          const offlineHandler = () => {
            status.network = false;
            status.internet = false;
          }
          
          window.addEventListener('online', onlineHandler)
          window.addEventListener('offline', offlineHandler)
          this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('online', onlineHandler)
            window.removeEventListener('offline', offlineHandler)
          })
        }
      },
      data() {
        return {
          vueConnectivity: status
        }
      }
    });

    // Exposed properties/methods
    Vue.prototype.$vueConnectivity = {
      updateSettings(newOptions) {
        options = { ...options, ...newOptions };
        if (options.debug) console.log('Vue-Connectivity - Settings Updated:', options);
        heartBeatInit(options, true);
      }
    };

    // Heartbeat loop
    async function heartBeatInit(options, reset = false) {
      if (reset && heartBeatLoop) {
        if (options.debug) console.log('Destroyed previous Heartbeat loop before restarting with new settings');
        clearInterval(heartBeatLoop);
      }
      if (options.heartbeatEnabled) {
        status.internet = await request(options.requestMethod, options.heartbeatUrl,options.debug);
        heartBeatLoop = setInterval(async () => {
          status.internet = await request(options.requestMethod, options.heartbeatUrl,options.debug);
        }, options.heartbeatInterval);
      }
    }
  }
}

export default VueConnectivity;

// Default settings
const DEFAULT_OPTIONS = {
  heartbeatEnabled: true,
  heartbeatUrl: 'http://internethealthtest.org',
  heartbeatInterval: 30000,
  requestMethod: 'head',
  debug: false,
}

// Axios request
async function request(method, url, debug) {
  if (debug) console.log('Heartbeat to', url);
  try {
    const res = await axios[method](url);
    if (debug) console.log('Heartbeat succeeded: ', res);
    return true;
  } catch (err) {
    if (debug) console.error('Heartbeat failed:', err);
    return false;
  }
}