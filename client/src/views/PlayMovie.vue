<template>
  <div class="art">

    <div class="countdown" v-if="showCountdown">{{ countdown }}</div>
    <div v-if="showViewCount" class="view-count">+1 view</div>
    <video
      style="height: 630px"
      controls
      autoplay
      @play="startTimer"
      @pause="stopTimer"
      @ended="incrementViewCount"
    >

   

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

      timer: null,
      duration: 5, // set the minimum duration required before the viewcount increments
      countdown: 5,
      showCountdown: false,
      showViewCount: false,

    };
  },
  async created() {
    const id = this.$route.params.id;
    this.movie = await API.getMovieById(id);

  },
  methods: {
    startTimer() {
      this.showCountdown = true;
      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.timer);
          this.incrementViewCount();
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    async incrementViewCount() {
      if (this.countdown === 0) {
        this.movie.viewcount += 1;
        await API.updateMovieNoImage(this.movie._id, this.movie);
        this.showCountdown = false;
        this.showViewCount = true;
      }
    },

    

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

.countdown {
  position: absolute;
  top: 20px;
  right: 20px;
  color: indigo;
  font-size: 36px;
}
.view-count {
  position: absolute;
  top: 20px;
  left: 20px;
  color: green;
  font-size: 36px;
}

</style>
