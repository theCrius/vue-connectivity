<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="hello">
      <h1>Welcome to Your Vue.js Testing App</h1>
      <p>This App is meant to be used as a clean slate to test plugins and integrations.</p>
      <div><button type="button" @click="changeHeartbeatSettings">Change Settings</button></div>
      <p>{{connectivity}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  watch: {
    vueConnectivity: {
      deep: true,
      handler(oldValue, newValue) {
        console.log('Watcher from App - Network:', newValue.network, ' - Internet:', newValue.internet);
      }
    }
  },
  computed: {
    connectivity() {
      return this.vueConnectivity
    }
  },
  methods: {
    changeHeartbeatSettings() {
      window.alert(`Open the console if you haven't already!`)
      this.$vueConnectivity.updateSettings({
        heartbeatEnabled: true,
        heartbeatUrl: 'http://internethealthtest.org',
        heartbeatInterval: 10000,
        requestMethod: 'head',
        debug: true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
