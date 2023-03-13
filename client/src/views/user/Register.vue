<script>
import '@/firebase/index'

export default{
    data(){
        return{
            name: '',
            email: '',
            userPassword:''
        }
    },
    methods: {
        async handleRegisterUser(){
            this.$store.dispatch('registerUser', {
                name: this.name,
                email: this.email,
                password: this.userPassword
            })    
            
            this.$router.push('/');
            
        }
    }
}
</script>

<template>
    <main class="container">
        <h2>Register new user</h2>
        <form @submit.prevent="handleRegisterUser" class="login-form">
            <div class="div form-group">
                <label for="name">Name:</label>
                <input 
                    id="name" 
                    type="text" 
                    v-model="name"
                    required
                />
            </div>
            <div class="div form-group">
                <label for="email">Email:</label>
                <input 
                    id="email" 
                    type="email" 
                    v-model="email"
                    required
                />
            </div>
            <div class="div form-group">
                <label for="password">Password:</label>
                <input 
                    id="password" 
                    type="password" 
                    v-model="userPassword"
                    required
                />
            </div>

            <div class="controlls">
                <button>Register</button>
            </div>
        </form>
    </main>
</template>

<style scoped>
    .container{
        background-color: aliceblue;
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
        border-radius: 5px;
    }
    label{
        display: inline-block;
        min-width: 80px;
    }

    .login-form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
    }

    input{
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 20px;
        font-size: 1.25rem;
    }

    button{
        padding: 1rem 1.5rem;
        border: none;
        background-color: rgba(65,105, 225, 0.8);
        color: white;
        border-radius: 20px;
        cursor: pointer;
        transition: .3s ease-in;
        box-shadow: 0px 10px 5px rgb(0,0,0,0.2);
    }

    button:hover{
        background-color: royalblue;
        transform: translateY(-3px);
        box-shadow: 0px 13px 8px rgb(0,0,0,0.2);
    }

    button:active{
        transform: translateY(-1px);
        box-shadow: 0px 11px 6px rgb(0,0,0,0.2);
    }
</style>