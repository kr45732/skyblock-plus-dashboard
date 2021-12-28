<template>
  <div class="slayer_role">
    <h1>Settings for roles: {{ $route.query.roleName }}</h1>

    <form @submit.prevent="onUpdateRoleSettings">
      <p>Enable: <input type="checkbox" v-model="state.enable" /></p>
      <div v-for="(level, index) in state.levels" :key="[level.roleId]">
        <span>{{ state.roleName }} {{ index + 7 }}: </span>
        <select v-model="level.roleId">
          <option
            v-for="role in state.guildRolesJson.object"
            :key="role.roleId"
            :value="role.roleId"
          >
            {{ role.roleName }}
          </option>
        </select>
      </div>
      <p>Stackable: <input type="checkbox" v-model="state.stackable" /></p>

      <button>Save</button>
    </form>
    <br />
    <router-link
      :to="`/dashboard/${$route.params.userId}/${$route.params.guildId}/roles`"
      ><button>Go Back</button></router-link
    >
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "SlayerRole",
  setup() {
    const state = reactive({
      levels: [],
      stackable: "",
      guildRolesJson: [],
      guildId: "",
      roleName: "",
      enable: "",
    });

    async function getCurrentSettings(guildId, roleName) {
      const apiUrl = `http://localhost:8080/api/discord/serverSettings/get/role?serverId=${guildId}&roleName=${roleName}`;
      const currentSettingsResponse = await fetch(apiUrl, { method: "GET" });
      if (currentSettingsResponse.status === 200) {
        const currentSettingsJson = await currentSettingsResponse.json();
        if (currentSettingsJson.levels.length == 0) {
          state.levels = [
            {
              value: 100000,
              roleId: "",
            },
            {
              value: 400000,
              roleId: "",
            },
            {
              value: 1000000,
              roleId: "",
            },
          ];
        } else {
          state.levels = currentSettingsJson.levels;
        }

        state.stackable = currentSettingsJson.stackable;
        state.enable = currentSettingsJson.enable;
      }
    }

    async function getGuildRoles(guildId) {
      const apiUrl = `http://localhost:8080/api/guild/roles?guildId=${guildId}`;
      const guildRoles = await fetch(apiUrl, { method: "GET" });
      if (guildRoles.status === 200) {
        state.guildRolesJson = await guildRoles.json();
      }
    }

    function setGuildId(guildId) {
      state.guildId = guildId;
    }

    function setRoleName(roleName) {
      state.roleName = roleName;
    }

    async function onUpdateRoleSettings() {
      const updatedRoleSettings = {
        levels: JSON.parse(JSON.stringify(state.levels)),
        stackable: state.stackable,
      };

      const apiUrl = `http://localhost:8080/api/discord/serverSettings/update/role?serverId=${state.guildId}&roleName=${state.roleName}`;
      const guildRoles = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRoleSettings),
      });
      if (guildRoles.status === 200) {
        window.alert("Settings Updated Successfully");
      } else {
        window.alert("Error Updating Settings");
      }
    }

    function sortLevels() {
      const sortBy = (key) => {
        return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
      };

      state.levels = state.levels.concat().sort(sortBy("value"));
    }

    return {
      state,
      getGuildRoles,
      onUpdateRoleSettings,
      setGuildId,
      setRoleName,
      getCurrentSettings,
      sortLevels,
    };
  },
  mounted() {
    this.getCurrentSettings(
      this.$route.params.guildId,
      this.$route.query.roleName
    );
    this.getGuildRoles(this.$route.params.guildId);
    this.setGuildId(this.$route.params.guildId);
    this.setRoleName(this.$route.query.roleName);
    this.sortLevels();
  },
};
</script>
