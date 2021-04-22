<template>
  <div class="logo">
     <img alt="electron logo" src="./assets/electron.png" />
     <img alt="Vue logo" src="./assets/logo.png" />

  </div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Electron" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  display: flex;
  width: 70%;
  margin: 0 auto;
 
}
.logo img {
    width: 50%;
  }
</style>
