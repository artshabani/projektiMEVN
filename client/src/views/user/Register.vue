<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-10">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10" >
          <v-window v-model="step">
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="blue rounded-br-xl">
                  <div style="text-align: center; padding: 180px 0;">
                  <v-card-text class="white--text text-center" >
                    <h3>Already Signed up?</h3>
                    <h6>Log in to your account so you can continue watching your favorite shows</h6>
                  </v-card-text>
                  <div class="text-center">
                    <router-link :to="{ name: 'login' }" class="button">
                      Login
                    </router-link>
                  </div> 
                  </div> 
                </v-col>
                
                

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center">Sign Up for an Account</h4>
                    <v-row align="center" justify="center" class="mt-4">
                      <v-col cols="12" sm="8">
                        <v-text-field label="Name" outlined dense color="blue" autocomplete="false" v-model="name"/>
                        <v-text-field label="Email" outlined dense color="blue" autocomplete="false" v-model="email"/>
                        <v-text-field label="Password" outlined dense color="blue" autocomplete="false" type="password" v-model="userPassword"/>
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox label="Terms & Conditions" class="mt-n1" color="blue"/>
                          </v-col>
                        </v-row>
                        <v-btn @click.prevent="handleRegisterUser" color="blue" dark block tile class="mt-5">Sign up</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "@/firebase/index";

export default {
  data() {
    return {
      name: "",
      email: "",
      userPassword: "",
      step: 2
    };
  },
  methods: {
    async handleRegisterUser() {
      this.$store.dispatch("registerUser", {
        name: this.name,
        email: this.email,
        password: this.userPassword
      });
      this.$router.push("/");
    }
  }
};
</script>

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
