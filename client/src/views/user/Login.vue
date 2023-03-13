<script>
    export default{
        data() {
    return {
      email: "",
      password: "",
      step: 1,
      
    };
  },
        methods:{
            async handleLoginUser() {
  try {
    await this.$store.dispatch('loginUser', {
      email: this.email,
      password: this.password,
    });
    // Redirect the user to the home page only if the login was successful
    this.$router.replace({ name: 'Home', params: { message: 'You have successfully logged in.' } });
  } catch (error) {
    // If the user doesn't exist, display an error message
    if (error.response && error.response.status === 404) {
      this.errorMessage = 'User not found. Please check your email and password.';
    } else {
      this.errorMessage = 'An error occurred. Please try again later.';
    }
  }
},
        }     
    }
</script>


<template>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Log in to Your Account</h4>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field
                            label="Email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            class="mt-16"
                            v-model="email"
                          />
                          <v-text-field
                            label="Password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            type="password"
                            v-model="password"
                          />
                          <v-btn
                            @click.prevent="handleLoginUser"
                            color="blue"
                            dark
                            block
                            tile
                            class="mt-5"
                          >
                            Log in
                          </v-btn>
                        </v-col>
                      </v-row>
                      
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="blue rounded-bl-xl">
                    <div style="text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text">
                        <h3 class="text-center">Don't Have an Account Yet?</h3>
                        <h6 class="text-center">Let's get you all set up so you can start watching the best movies</h6>
                      </v-card-text>
                      <div class="text-center">
                        

                        <router-link :to="{ name: 'register' }" class="button">
                       Sign Up
                    </router-link>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
      
    </v-container>
  </template>

<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}

.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: #fff;
  border: 1px solid;
  border-radius: 0.25rem;
  text-decoration: none;
  text-align: center;
}
</style>