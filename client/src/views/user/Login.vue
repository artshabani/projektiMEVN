<script>
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
    export default{
        data(){
            return{
                email:'',
                password:'',
            }
        },
        methods:{
            handleLoginUser(){
                const auth = getAuth();
                
                signInWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push('/');
            }
        },
        
        
    }
</script>


<template>
    <div>
    <h1>Login</h1>

    <div v-if="user">{{ user.email}}</div>
    <form @submit.prevent="handleLoginUser">
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email"/>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" v-model="password" type="password"/>
        </div>
        <div class="controlls">
            <button>Login</button>
        </div>
    </form>
    </div>
</template>