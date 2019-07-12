## vue-connectivity
##### A Vue 2.x Plugin to detect network and internet connection using heartbeat approach

---

##### Dependencies
If you want to take advantage of the heartbeat approach, you need to also have `axios` installed in your Vue application. Alternatively you can just disable the feature and only rely on the network check.

##### Installation

`npm i --save vue-connectivity`

##### Vue 2.x configuration
Add in your `main.js`:

```
...
import VueConnectivity from 'vue-connectivity'

// Using default settings:
Vue.use(VueConnectivity)
```

##### Nuxt.js 2.x configuration
_coming soon (tm)_

##### How to use it
You can have a visual feedback in any component by adding a computed property like this:

```
...
connectionStatus() {
  return this.vueConnectivity
}
```

or watch for changes by adding a watcher, like this:

```
watch: {
  vueConnectivity: {
    deep: true,
    handler(oldValue, newValue) {
      console.log('Watcher from App - Network:', newValue.network, ' - Internet:', newValue.internet);
      // Trigger something, maybe some requests stored locally until you get the app back online
    }
  }
},
```

You need to use `deep` as the attributes are nested inside an object.

##### Advanced Configuration
The plugin support a set of options to configure the Heartbeat feature:

| attribute  | description |
| ------------- | ------------- |
| heartbeatEnabled  | Determine if the heartbeat feature is enabled. Default `true`  |
| heartbeatUrl  | Against which url the heartbeat request will be performed. Default `http://internethealthtest.org`  |
| heartbeatInterval  | How often a request is performed. Default `30000` in ms  |
| debug  | The plugin will print in console detailed information for every action. Default `false`  |

You can set your custom settings in the `main.js`

```
Vue.use(VueConnectivity, {
  heartbeatEnabled: true,
  heartbeatUrl: 'http://something-something.com',
  heartbeatInterval: 60000,
  requestMethod: 'get',
  debug: false
})
```

Or by using the extended function, from every component:

```
this.$vueConnectivity.updateSettings({
  heartbeatEnabled: true,
  heartbeatUrl: 'http://internethealthtest.org',
  heartbeatInterval: 10000,
  requestMethod: 'head',
  debug: true
})
```

##### Disclaimer
This plugin is loosely inspired by `ng-connection-service` made by @ultrasonicsoft.  
It's also my first "serious" plugin for Vue. if you think you can help improving it or there are bad practices used for it, please open an issue or even better a pull request!