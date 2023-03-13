<template>
  <v-container>
    <v-row>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <router-link :to="{ name: 'PlayMovie', params: { id: movie._id } }">
            <v-img :src="`/${movie.image}`"></v-img>
          </router-link>
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">{{
                  movie.category
                }}</v-btn>
              </v-col>
              <v-col sm="10" class="d-flex justify-end"> </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ movie.title }}</h3>
          </v-card-subtitle>
          <v-card-text class="grey--text">
            <p>{{ movie.description }}</p>
            <p>{{ movie.created }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
