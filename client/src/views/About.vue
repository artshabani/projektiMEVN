<template>
  <div>
    <h2 style="margin-bottom: 20px;">ABOUT US</h2>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
        v-for="(card, index) in cards"
        :key="index"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          @mouseenter="card.hover = true"
          @mouseleave="card.hover = false"
          :elevation="card.hover ? 8 : 2"
          :color="card.hover ? '#1565c0' : '#ffffff'"
          transition="all 0.4s ease-out"
          style="border-radius: 10px;"
        >
          <v-img
            :src="card.imgSrc"
            height="200"
            style="border-radius: 10px 10px 0 0;"
          ></v-img>

          <v-card-title style="padding: 20px;">
            <span class="text-h5">{{ card.title }}</span>
          </v-card-title>

          <v-card-text style="padding: 20px;">
            <span>{{ card.text }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Our Mission',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur placerat augue, vel interdum nunc sagittis eu. Fusce non sem id lectus volutpat iaculis. Maecenas elementum nulla at interdum dignissim. ',
          imgSrc: 'https://picsum.photos/344/200',
          hover: false
        },
        {
          title: 'Our Vision',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur placerat augue, vel interdum nunc sagittis eu. Fusce non sem id lectus volutpat iaculis. Maecenas elementum nulla at interdum dignissim. ',
          imgSrc: 'https://picsum.photos/344/200',
          hover: false
        },
        {
          title: 'Our Team',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur placerat augue, vel interdum nunc sagittis eu. Fusce non sem id lectus volutpat iaculis. Maecenas elementum nulla at interdum dignissim. ',
          imgSrc: 'https://picsum.photos/344/200',
          hover: false
        }
      ]
    }
  }
}
</script>
