<template>
  <v-container
    style="
      background-color: #f0f0f0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <div style="margin-top: 20px">
      <p style="font-size: 50px; color: indigo">3 most watched movies:</p>
    </div>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-if="this.$route.params.message"
    >
      {{ this.$route.params.message }}
    </v-alert>
    <v-container
      no-gutters
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        margin-top: 30px;
      "
    >
      <v-row no-gutters>
        <v-col sm="4" class="pa-3" v-for="movie in movies" :key="movie._id">
          <v-card
            class="pa-1 movie-card"
            :to="{ name: 'MovieDetails', params: { id: movie._id } }"
          >
            <v-img height="250" :src="`/${movie.image}`"></v-img>

            <v-card-actions class="d-flex justify-space-between">
              <v-btn small outlined color="red">{{ movie.category }}</v-btn>
              <v-btn small outlined color="primary"
                >{{ movie.viewcount }} views</v-btn
              >
            </v-card-actions>

            <v-card-title class="headline">{{ movie.title }}</v-card-title>
            <v-card-text class="py-0">
              <p>{{ movie.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import API from "../api";

export default {
  name: "Home",
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    const mostViewedMovies = await API.getMostViewedMovies();
    // update the cards array with the most viewed movies
    this.movies = mostViewedMovies;
  },
};
</script>

<style scoped>
.movie-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
</style>
