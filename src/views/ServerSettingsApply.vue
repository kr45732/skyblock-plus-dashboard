<template>
  <div class="apply">
    <h1>Automated Apply Settings</h1>
    <h3>Server Name: {{ state.guildName }}</h3>

    <form @submit.prevent="onUpdateApplySettings">
      <div class="form-group">
        <span>Enable: </span>
        <input type="checkbox" name="enableApply" id="enableDisableCheckbox" />
      </div>

      <div class="form-group">
        <span>Apply Message Channel: </span>
        <select
          name="applyMessageChannel"
          v-model="state.currentSettingsJson.messageTextChannelId"
        >
          <option
            v-for="textChannel in state.guildTextChannelsJson.object"
            :key="textChannel.channelId"
            :value="textChannel.channelId"
          >
            # {{ textChannel.channelName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <span>Apply Message Text: </span>
        <input
          name="applyMessageText"
          required
          v-model="state.currentSettingsJson.messageText"
        />
      </div>

      <div class="form-group">
        <span>New Message Category: </span>
        <select
          name="newMessageCategory"
          v-model="state.currentSettingsJson.newChannelCategory"
        >
          <option
            v-for="category in state.guildCategoriesJson.object"
            :key="category.categoryId"
            :value="category.categoryId"
          >
            {{ category.categoryName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <span>New Channel Prefix: </span>
        <input
          name="newChannelPrefix"
          required
          v-model="state.currentSettingsJson.newChannelPrefix"
        />
      </div>

      <div class="form-group">
        <span>Staff Message Channel: </span>
        <select
          name="staffMessageChannel"
          v-model="state.currentSettingsJson.messageStaffChannelId"
        >
          <option
            v-for="textChannel in state.guildTextChannelsJson.object"
            :key="textChannel.channelId"
            :value="textChannel.channelId"
          >
            # {{ textChannel.channelName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <span>Accepted Message: </span>
        <input
          name="acceptMessage"
          required
          v-model="state.currentSettingsJson.acceptMessageText"
        />
      </div>

      <div class="form-group">
        <span>Deny Message: </span>
        <input
          name="denyMessage"
          required
          v-model="state.currentSettingsJson.denyMessageText"
        />
      </div>

      <div class="form-group">
        <span>Staff Ping Role: </span>
        <select
          name="staffPingRole"
          v-model="state.currentSettingsJson.staffPingRoleId"
        >
          <option
            v-for="role in state.guildRolesJson.object"
            :key="role.roleId"
            :value="role.roleId"
          >
            {{ role.roleName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <button class="btn btn-light">Save</button>
      </div>
    </form>

    <router-link
      :to="`/dashboard/${$route.params.userId}/${$route.params.guildId}`"
      class="back-button"
      >&laquo; Go Back</router-link
    >
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "ServerSettingsApply",
  setup() {
    const state = reactive({
      currentSettingsJson: [],
      guildName: "",
      guildId: "",
      guildTextChannelsJson: [],
      guildCategoriesJson: [],
      guildRolesJson: [],
    });

    async function getCurrentSettings(guildId) {
      const apiUrl = `http://localhost:8080/api/discord/serverSettings/get/apply?serverId=${guildId}`;
      const currentApplySettingsResponse = await fetch(apiUrl, {
        method: "GET",
      });
      if (currentApplySettingsResponse.status === 200) {
        state.currentSettingsJson = await currentApplySettingsResponse.json();
        document.getElementById("enableDisableCheckbox").checked =
          state.currentSettingsJson.enable == "true" ? true : false;
      }
    }

    async function getGuildName(guildId) {
      const apiUrl = `http://localhost:8080/api/guild/name?guildId=${guildId}`;
      const guildNameId = await fetch(apiUrl, { method: "GET" });
      if (guildNameId.status === 200) {
        state.guildName = (await guildNameId.json()).object.name;
      }
    }

    function setGuildId(guildId) {
      state.guildId = guildId;
    }

    async function getGuildTextChannels(guildId) {
      const apiUrl = `http://localhost:8080/api/guild/channels/text?guildId=${guildId}`;
      const guildTextChannels = await fetch(apiUrl, { method: "GET" });
      if (guildTextChannels.status === 200) {
        state.guildTextChannelsJson = await guildTextChannels.json();
      }
    }

    async function getGuildCategories(guildId) {
      const apiUrl = `http://localhost:8080/api/guild/categories?guildId=${guildId}`;
      const guildCategories = await fetch(apiUrl, { method: "GET" });
      if (guildCategories.status === 200) {
        state.guildCategoriesJson = await guildCategories.json();
      }
    }

    async function getGuildRoles(guildId) {
      const apiUrl = `http://localhost:8080/api/guild/roles?guildId=${guildId}`;
      const guildRoles = await fetch(apiUrl, { method: "GET" });
      if (guildRoles.status === 200) {
        state.guildRolesJson = await guildRoles.json();
      }
    }

    async function onUpdateApplySettings(submitEvent) {
      const enableApply = submitEvent.target.elements.enableApply.checked;
      const applyMessageChannel =
        submitEvent.target.elements.applyMessageChannel.value;
      const applyMessageText =
        submitEvent.target.elements.applyMessageText.value;
      const newMessageCategory =
        submitEvent.target.elements.newMessageCategory.value;
      const newChannelPrefix =
        submitEvent.target.elements.newChannelPrefix.value;
      const staffMessageChannel =
        submitEvent.target.elements.staffMessageChannel.value;
      const staffPingRole = submitEvent.target.elements.staffPingRole.value;
      const acceptMessage = submitEvent.target.elements.acceptMessage.value;
      const denyMessage = submitEvent.target.elements.denyMessage.value;

      const newAutomatedApplicationSettings = {
        enable: enableApply,
        messageTextChannelId: applyMessageChannel,
        messageStaffChannelId: staffMessageChannel,
        newChannelPrefix: newChannelPrefix,
        newChannelCategory: newMessageCategory,
        messageText: applyMessageText,
        acceptMessageText: acceptMessage,
        denyMessageText: denyMessage,
        staffPingRoleId: staffPingRole,
      };

      console.log(newAutomatedApplicationSettings);
      console.log(state.currentSettingsJson);

      const apiUrl = `http://localhost:8080/api/discord/serverSettings/update/apply?serverId=${state.guildId}`;
      const guildRoles = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAutomatedApplicationSettings),
      });
      if (guildRoles.status === 200) {
        window.alert("Settings Updated Successfully");
      } else {
        window.alert("Error Updating Settings");
      }
    }

    return {
      state,
      getCurrentSettings,
      getGuildName,
      setGuildId,
      getGuildTextChannels,
      getGuildCategories,
      getGuildRoles,
      onUpdateApplySettings,
    };
  },
  mounted() {
    this.getCurrentSettings(this.$route.params.guildId);
    this.getGuildName(this.$route.params.guildId);
    this.setGuildId(this.$route.params.guildId);
    this.getGuildTextChannels(this.$route.params.guildId);
    this.getGuildCategories(this.$route.params.guildId);
    this.getGuildRoles(this.$route.params.guildId);
  },
};
</script>

<style scoped>
.back-button {
  text-decoration: none;
  display: inline-block;
  color: black;
  margin-top: 5px;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 255);
  border-radius: 4px;
  font-size: 20px;
}

.back-button:hover {
  background-color: #ddd;
  color: black;
}
</style>
