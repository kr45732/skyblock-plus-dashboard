<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <ul id="example-1">
      <div v-for="server in state.mutalGuildJson.object" :key="server.id">
        <router-link :to="`${$route.params.userId}/${server.id}`"
          ><button class="button" style="vertical-align:middle">
            <span>{{ server.name }}</span>
          </button></router-link
        >
      </div>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Dashboard",

  setup() {
    const state = reactive({ mutalGuildJson: [] });
    async function getUserGuilds(userId) {
      const apiUrl = `http://localhost:8080/api/guild/mutualGuilds?userId=${userId}`;
      const mutalGuildResponse = await fetch(apiUrl, { method: "GET" });
      if (mutalGuildResponse.status === 200) {
        state.mutalGuildJson = await mutalGuildResponse.json();
      }
    }

    return { state, getUserGuilds };
  },
  mounted() {
    this.getUserGuilds(this.$route.params.userId);
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  border-radius: 4px;
  background-color: rgba(114, 137, 218, 255);
  border: none;
  color: #ffffff;
  font-size: 15px;
  padding: 20px;
  width: 400px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
