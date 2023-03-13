<template>
  <div style="background-color: #f0f0f0; height: 100%">
    <v-container>
      <v-row>
        <v-col sm="10" class="pa-4 mx-auto d-flex justify-center align-center">
          <v-card class="pa-2 movie-card">
            <v-img :src="`/${movie.image}`"></v-img>

            <v-card-actions class="pb-0">
              <v-row class="mt-1 mx-1">
                <v-col sm="2">
                  <router-link
                    :to="{ name: 'PlayMovie', params: { id: movie._id } }"
                  >
                    <v-btn small outlined color="primary">Play Movie</v-btn>
                  </router-link>
                </v-col>
                <v-col sm="10" class="d-flex justify-end">
                  <v-btn
                    color="success"
                    text
                    :to="{ name: 'EditMovie', params: { id: movie._id } }"
                    >Edit</v-btn
                  >
                  <v-btn color="red" text @click="deleteMovie(movie._id)"
                    >Delete</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-subtitle class="headline">
              <h3>{{ movie.title }}</h3>
            </v-card-subtitle>
            <v-card-text class="grey--text">
              <p>{{ movie.category }}</p>
              <p>Published on: {{ movie.created }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import API from "../api";
export default {
  data() {
    return {
      movie: {},
    };
  },
  async created() {
    const response = await API.getMovieById(this.$route.params.id);
    this.movie = response;
  },
  methods: {
    async deleteMovie(id) {
      const response = await API.deleteMovie(id);
      this.$router.push({
        name: "Home",
        params: { message: response.message },
      });
    },
  },
};
</script>

<style scoped>
.movie-card {
  width: 750px;
}
</style>
