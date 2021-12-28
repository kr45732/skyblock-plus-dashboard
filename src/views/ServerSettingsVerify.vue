<template>
  <div class="verify">
    <h1>Automated Verify Settings</h1>
    <h4>Server Name: {{ state.guildName }}</h4>

    <form @submit.prevent="onUpdateVerifySettings">
      <div class="form-group">
        <span>Enable: </span>
        <input type="checkbox" name="enableVerify" id="enableDisableCheckbox" />
      </div>

      <div class="form-group">
        <span>Verify Message Channel: </span>
        <select
          name="verifyMessageChannel"
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
        <span>Verify Message Text: </span>
        <input
          name="verifyMessageText"
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
        <span>Verified Role: </span>
        <select
          name="verifiedRole"
          v-model="state.currentSettingsJson.verifiedRole"
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
  name: "ServerSettingsVerify",
  setup() {
    const state = reactive({
      guildName: "",
      guildTextChannelsJson: [],
      guildCategoriesJson: [],
      guildRolesJson: [],
      currentSettingsJson: [],
      guildId: "",
    });

    async function getGuildName(guildId) {
      const apiUrl = `http://localhost:8080/api/guild/name?guildId=${guildId}`;
      const guildNameId = await fetch(apiUrl, { method: "GET" });
      if (guildNameId.status === 200) {
        state.guildName = (await guildNameId.json()).object.name;
      }
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

    async function onUpdateVerifySettings(submitEvent) {
      const enableVerify = submitEvent.target.elements.enableVerify.checked;
      const verifyMessageText =
        submitEvent.target.elements.verifyMessageText.value;
      const verifyMessageChannel =
        submitEvent.target.elements.verifyMessageChannel.value;
      const verifyRole = submitEvent.target.elements.verifiedRole.value;
      const verifyNewPrefix =
        submitEvent.target.elements.newChannelPrefix.value;
      const newVerifyChannelCategory =
        submitEvent.target.elements.newMessageCategory.value;

      const newAutomatedApplicationSettings = {
        enable: enableVerify,
        messageText: verifyMessageText,
        messageTextChannelId: verifyMessageChannel,
        verifiedRole: verifyRole,
        newChannelPrefix: verifyNewPrefix,
        newChannelCategory: newVerifyChannelCategory,
      };

      console.log(newAutomatedApplicationSettings);

      const apiUrl = `http://localhost:8080/api/discord/serverSettings/update/verify?serverId=${state.guildId}`;
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

    async function getCurrentSettings(guildId) {
      const apiUrl = `http://localhost:8080/api/discord/serverSettings/get/verify?serverId=${guildId}`;
      const currentVerifySettingsResponse = await fetch(apiUrl, {
        method: "GET",
      });
      if (currentVerifySettingsResponse.status === 200) {
        state.currentSettingsJson = await currentVerifySettingsResponse.json();
        document.getElementById("enableDisableCheckbox").checked =
          state.currentSettingsJson.enable == "true" ? true : false;
      }
    }

    function setGuildId(guildId) {
      state.guildId = guildId;
    }

    return {
      state,
      getGuildName,
      getGuildTextChannels,
      getGuildCategories,
      getGuildRoles,
      onUpdateVerifySettings,
      getCurrentSettings,
      setGuildId,
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
