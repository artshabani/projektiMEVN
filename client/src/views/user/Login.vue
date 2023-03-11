<script>
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

    export default{
        data(){
            return{
                email:'',
                password:'',
                user : null
            }
        },
        methods:{
            async handleLoginUser() {
                this.$store.dispatch('loginUser', {
                    email: this.email,
                    password: this.password
                });
                this.$router.push('/');
            }
        }     
    }
</script>


<template>
    <form @submit.prevent="handleLoginUser" class="login-form">
        <h3>Login</h3>
        {{  this.user && this.user.email }}
        <div class="form-wrapper">
            <div class="form-group">
                <label for="email" >Email:</label>
                <input id="email"
                    v-model="email"
                />
            </div>
            <div class="form-group">
                <label for="password" >Password:</label>
                <input id="password" type="password"
                    v-model="password"
                />
            </div>
            <div class="controlls">
                <button class="login-button">Login</button>
            </div>
        </div>
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