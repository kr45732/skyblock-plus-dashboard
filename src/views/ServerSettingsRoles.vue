<template>
  <div class="roles">
    <h1>Automated Roles Settings</h1>
    <h4>Server Name: {{ state.guildName }}</h4>

    <form @submit.prevent="onUpdateRoleEnable">
      <p>Enable: <input type="checkbox" v-model="state.enable" /></p>

      <button>Save</button>
    </form>
    <div class="sidenav">
      <span class="sidenav-title">Role Settings</span>

      <p>
        <router-link
          class="sidebar-element-text"
          :to="`roles/slayer?roleName=sven`"
          ># Sven
        </router-link>
      </p>

      <p>
        <router-link
          class="sidebar-element-text"
          :to="`roles/slayer?roleName=rev`"
          ># Rev
        </router-link>
      </p>

      <p>
        <router-link
          class="sidebar-element-text"
          :to="`roles/slayer?roleName=tara`"
          ># Tara
        </router-link>
      </p>
    </div>
    <router-link
      :to="`/dashboard/${$route.params.userId}/${$route.params.guildId}`"
      ><button :v-model="state.enable">Go Back</button></router-link
    >
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "ServerSettingsRoles",
  setup() {
    const state = reactive({
      currentSettingsJson: [],
      enable: false,
      guildId: "",
      guildName: "",
    });

    async function getGuildName(guildId) {
      const apiUrl = `http://localhost:8080/api/guild/name?guildId=${guildId}`;
      const guildNameId = await fetch(apiUrl, { method: "GET" });
      if (guildNameId.status === 200) {
        state.guildName = (await guildNameId.json()).object.name;
      }
    }

    async function getCurrentSettings(guildId) {
      const apiUrl = `http://localhost:8080/api/discord/serverSettings/get/roles?serverId=${guildId}`;
      const currentVerifySettingsResponse = await fetch(apiUrl, {
        method: "GET",
      });
      if (currentVerifySettingsResponse.status === 200) {
        let currentSettingsResponseJson = await currentVerifySettingsResponse.json();
        state.enable =
          currentSettingsResponseJson.enable == "true" ? true : false;
        delete currentSettingsResponseJson.enable;
        state.currentSettingsJson = currentSettingsResponseJson;
      }
    }

    async function onUpdateRoleEnable() {
      const apiUrl = `http://localhost:8080/api/discord/serverSettings/update/roles/enable?serverId=${state.guildId}&enable=${state.enable}`;

      const guildRoles = await fetch(apiUrl, {
        method: "POST",
      });
      if (guildRoles.status === 200) {
        window.alert("Settings Updated Successfully");
      } else {
        window.alert("Error Updating Settings");
      }
    }

    function setGuildId(guildId) {
      state.guildId = guildId;
    }

    return {
      state,
      getCurrentSettings,
      onUpdateRoleEnable,
      setGuildId,
      getGuildName,
    };
  },
  mounted() {
    this.getCurrentSettings(this.$route.params.guildId);
    this.setGuildId(this.$route.params.guildId);
    this.getGuildName(this.$route.params.guildId);
  },
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
  width: 330px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
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

.main {
  margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;
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
