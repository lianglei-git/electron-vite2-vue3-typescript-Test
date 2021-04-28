<template>
  <div class="logo">
     <!-- <img alt="electron logo" src="./assets/electron.png" />
     <img alt="Vue logo" src="./assets/logo.png" /> -->
     <ul ref='container'>
       <li><img alt="electron logo" src="./assets/electron.png" /></li>
       <li><img alt="Vue logo" src="./assets/logo.png" /></li>
       <li><img alt="Vue logo" src="../../public/abs.jpg" /></li>
     </ul>
  </div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Electron" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const container:any = ref(null)
    onMounted(() => {
      const ul = container.value
      let fristChild:HTMLBaseElement = ul[0]
      let lastChild:HTMLBaseElement = ul[ul.length - 1]
      ul.applendChild(fristChild)
      ul.insertBefore(lastChild)
      console.log(container.value)
    })
    return  {
      container
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 100%;
  overflow: hidden;
  ul {
    width: 500%;
    display: flex;
    >li {
      width: 20%;
      height: 100px;
    }
  }
}
.logo img {
    width: 50%;
  }
</style>
