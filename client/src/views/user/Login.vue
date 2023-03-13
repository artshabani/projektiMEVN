<script>
    export default{
        data(){
            return{
                email:'',
                password:'',
                errorMessage: '',
            }
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
    <form @submit.prevent="handleLoginUser" class="login-form" method="POST">
        <h3>Login</h3>
        <div class="form-wrapper">
            <div class="form-group">
                <label for="email" >Email:</label>
                <input id="email"
                    v-model="email"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password" >Password:</label>
                <input id="password" type="password"
                    v-model="password"
                    required
                />
            </div>
            <div class="controlls">
                <button class="login-button">Login</button>
            </div>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
</template>

<style scoped>
.login-form {
    background-color: aliceblue;
    max-width: 300px;
    margin: 1rem auto;
    padding: 2rem;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

label {
    min-width: 100px;
    display: inline-block;
}

.controlls {
    display: flex;
    justify-content: center;
}

.login-button {
    padding: 0.5rem 2rem;
    color: white;
    border: none;
    background-color: rgba(57, 57, 57, 0.2);
    border-radius: 20px;
    transition: all .2s ease-out;
    cursor: pointer;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, .8);
}

.login-button:hover {
    background-color: rgba(57, 57, 57, 0.4);
    transform: translateY(-2px);
    box-shadow: 2px 10px 7px rgba(0, 0, 0, .8);
}

.login-button:active {
    background-color: rgba(57, 57, 57, 0.5);
    transform: translateY(-1px);
    box-shadow: 2px 7px 6px rgba(0, 0, 0, .8);
}



</style>