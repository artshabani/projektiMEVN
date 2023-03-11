import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, signOut } from 'firebase/auth';
import apiRequest from '@/utility/apiRequest';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user:null
    },
    getters:{
        username(state){
            if(!state.user)return '';
            return state.user.displayName;
        },
        
    },
    mutations:{
        setUser(state,user){
            state.user = user;
        }
    },
    actions:{
        async loginUser({commit},payload){
            const user = await apiRequest.loginUser(payload);
            commit('setUser', user);
        },
        async registerUser({commit},payload){
            const user = await apiRequest.registerUser(payload);
            commit('setUser', user);
        },
        logoutUser({commit}){
            const auth = getAuth();
            signOut(auth);
            commit('setUser',null);
        },
    },
    modules:{

    }
});

export default store;