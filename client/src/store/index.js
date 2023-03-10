import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user:null
    },
    getters:{
        
    },
    mutations:{
        setUser(state,user){
            state.user = user;
        }
    },
    actions:{
        userLogin({commit},user){
            commit('setUser',user);
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