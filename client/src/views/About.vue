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
    <v-carousel
      class="my-6"
      cycle
      hide-delimiters
      interval="3000"
      show-arrows-on-hover
      :height="450"
    >
      <v-carousel-item
        v-for="movie in movies"
        :key="movie._id"
        :src="`/${movie.image}`"
        :to="{ name: 'MovieDetails', params: { id: movie._id } }"
      >
        <v-sheet
          class="d-flex flex-column justify-end pa-4"
          color="transparent"
          height="100%"
        >
          <v-card-title class="headline">{{ movie.title }}</v-card-title>
          <v-card-text class="py-0">
            <p>{{ movie.description }}</p>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn small outlined color="red">{{ movie.category }}</v-btn>
            <v-btn small outlined color="primary">{{ movie.viewcount }} views</v-btn>
          </v-card-actions>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
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
.carousel .v-carousel__transition-group {
  display: flex !important;
  align-items: center !important;
  height: 100%;
}

.carousel .v-carousel__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 !important;
}
</style>
