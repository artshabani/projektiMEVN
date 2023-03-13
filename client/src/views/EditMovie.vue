<template>
  <div style="background-color: #f0f0f0; height: 100%">
    <v-container style="height: 100%">
      <v-row no-gutters style="height: 100%">
        <v-col
          sm="10"
          class="mx-auto d-flex justify-center align-center"
          style="height: 80%"
        >
          <v-card class="pa-5 movie-card">
            <v-card-title>Edit movie: {{ movie.title }}</v-card-title>
            <v-divider></v-divider>
            <v-form
              ref="form"
              @submit.prevent="updateForm"
              class="pa-5"
              enctype="multipart/form-data"
            >
              <v-text-field
                label="Title"
                v-model="movie.title"
                prepend-icon="mdi-note"
                :rules="rules"
                value="art"
              ></v-text-field>

              <v-text-field
                label="Category"
                v-model="movie.category"
                prepend-icon="mdi-view-list"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Decription"
                v-model="movie.description"
                prepend-icon="mdi-note-plus"
                :rules="rules"
              ></v-text-field>

              <v-file-input
                @change="selectFile"
                show-size
                counter
                multiple
                label="Select Image"
              ></v-file-input>
              <v-img :src="`/${movie.image}`" width="120"></v-img>

              <v-btn type="submit" class="mt-3" color="success"
                >Update Movie</v-btn
              >
            </v-form>
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
      rules: [(value) => !!value || "This field is required!"],
      movie: {
        title: "",
        category: "",
        description: "",
        image: "",
      },
      image: "",
    };
  },
  async created() {
    const response = await API.getMovieById(this.$route.params.id);
    this.movie = response;
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    async updateForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.movie.title);
      formData.append("category", this.movie.category);
      formData.append("description", this.movie.description);
      formData.append("old_image", this.movie.image);
      if (this.$refs.form.validate()) {
        const response = await API.updateMovie(this.$route.params.id, formData);
        this.$router.push({
          name: "Home",
          params: { message: response.message },
        });
      }
    },
  },
};
</script>

<style scoped>
.movie-card {
  width: 950px;
}
</style>
