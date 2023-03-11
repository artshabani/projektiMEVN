<template>
  <div class="art">
    <video style="height: 630px" controls autoplay>
      <source src="../videos/peakyB.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "PlayMovie",
  data() {
    return {
      movie: {},
    };
  },
  async created() {
    const id = this.$route.params.id;
    this.movie = await API.getMovieById(id);
    this.movie.viewcount += 1;
    await API.updateMovie(id, this.movie);
  },
};
</script>

<style scoped>
.my-component {
  background-color: #f0f0f0;
  padding: 20px;
}
h1 {
  color: #333;
  font-size: 24px;
}
p {
  color: #666;
  font-size: 16px;
}
.art {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f0f0;
}
video {
  height: 630px;
}
</style>
