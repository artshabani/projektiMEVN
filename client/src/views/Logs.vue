<template>
  <v-simple-table style="background-color: #f0f0f0">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Action</th>
          <th class="text-left">Movie</th>
          <th class="text-left">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="log in logs"
          :key="log._id"
          :class="{
            created: log.action === 'Created',
            updated: log.action === 'Updated',
            deleted: log.action === 'Deleted',
          }"
        >
          <td>{{ log.name }}</td>
          <td>{{ log.action }}</td>
          <td>{{ log.movie }}</td>
          <td>{{ log.timestamp }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style>
.created {
  background-color: rgba(0, 255, 0, 0.2);
}
.updated {
  background-color: rgba(255, 255, 0, 0.2);
}
.deleted {
  background-color: rgba(255, 0, 0, 0.2);
}
</style>

<script>
import API from "../api";

export default {
  data() {
    return {
      logs: [],
    };
  },
  async created() {
    this.logs = await API.getAllLogs();
  },
};
</script>
