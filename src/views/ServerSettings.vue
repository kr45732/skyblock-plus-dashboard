<template>
  <div class="server">
    <h1 class="offset-sidenav">Server Settings</h1>
    <div class="sidenav">
      <span class="sidenav-title">Guild Settings</span>

      <div class="sidebar-element">
        <router-link
          class="sidebar-element-text"
          :to="`${$route.params.guildId}/verify`"
          ># Automated Verify</router-link
        >
      </div>
      <br />

      <div class="sidebar-element">
        <router-link
          class="sidebar-element-text"
          :to="`${$route.params.guildId}/apply`"
          ># Automated Apply</router-link
        >
      </div>
      <br />

      <div class="sidebar-element">
        <router-link
          class="sidebar-element-text"
          :to="`${$route.params.guildId}/roles`"
          ># Automated Roles</router-link
        >
      </div>
      <br />

      <div class="sidebar-element">
        <router-link
          class="sidebar-element-text"
          :to="`${$route.params.guildId}`"
          ># Automated Skyblock Guild Ranks</router-link
        >
      </div>
    </div>

    <router-link
      :to="`/dashboard/${$route.params.userId}`"
      class="back-button offset-sidenav"
      >&laquo; Go Back</router-link
    >
  </div>
</template>

<script>
export default {
  name: "ServerSettings",
};
</script>

<style scoped>
.sidebar-element-text {
  padding-bottom: 25px;
  text-decoration: none;
  text-decoration-color: red;
}

.sidenav {
  height: 100%;
  width: 285px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(40, 42, 47, 255);
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: rgba(112, 116, 121, 255);
  display: block;
}

.sidenav-title {
  border-bottom: 2px solid red;
  padding: 6px 8px 15px 16px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  font-weight: bold;
  display: block;
  margin-bottom: 20px;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.back-button {
  text-decoration: none;
  display: inline-block;
  color: black;
  margin-top: 5px;
  padding: 10px 20px;
  background-color: rgba(114, 137, 218, 255);
  border-radius: 4px;
  font-size: 20px;
}

.back-button:hover {
  background-color: #ddd;
  color: black;
}

.offset-sidenav {
  margin-left: 150px;
  text-align: center !important;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
