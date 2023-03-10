<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> FilmaUBT </v-list-item-title>
          <v-list-item-subtitle> Streaming Platform </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-subheader>Actions</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application
        
      </v-toolbar-title>


      <v-btn v-if="user">
        Hello {{user.email}}! 
      </v-btn>  
      <v-btn @click="handleLogout">
        Logout
      </v-btn>

    </v-app-bar>

    

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { mapState, mapActions } from 'vuex';

export default {
  computed:{
    ...mapState(['user'])
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-home", link: "/" },
        { title: "Add Movie", icon: "mdi-note-plus", link: "/CreateMovie" },
        { title: "About", icon: "mdi-help", link: "/About" },
        { title: "Register", icon: "mdi-home", link: "/Register" },
      ],
    };
  },
  created(){
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth){
        this.$store.commit('setUser', userAuth)
      }
    })
  },
  methods: {
    ...mapActions(['logoutUser']),
    handleLogout(){
      this.logoutUser();
    }
  }
};
</script> 
