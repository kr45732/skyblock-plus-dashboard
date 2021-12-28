<template>
  <div class="home">
    <h1 class="home-title">Skyblock Plus Dashboard</h1>
    <a class="button1" :href="`${state.callbackUrl}`"
      >Click here to link your discord account</a
    >
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "Home",

  setup() {
    const state = reactive({
      callbackUrl: `http://localhost:8080/api/discord/redirect`,
    });

    return { state };
  },
};
</script>

<style scoped>
.home-title {
  padding-bottom: 20px;
}
a.button1 {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
}

a.button1:hover {
  color: #000000;
  background-color: #ffffff;
}
@media all and (max-width: 30em) {
  a.button1 {
    display: block;
    margin: 0.4em auto;
  }
}
</style>
