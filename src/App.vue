<template>
  <div id="app">
    <visualist></visualist>
  </div>
</template>

<script>
import Visualist from './components/Visualist';

export default {
  name: 'app',
  components: {
    Visualist,
  },
};
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
</style>
