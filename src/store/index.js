import { createStore } from 'vuex'

export default createStore({
  state: {
    email:""
  },
  getters: {
  },
  mutations: {
    login (state,email) {
        state.email = email;
        localStorage.setItem('email', email);
        alert('Logged in');
      },
      logout(state){
        state.email ="";
        localStorage.removeItem('email');
        alert('Logged out');
      },
      initialiseStore(state) {
        if(localStorage.getItem('email')){
          state.email = localStorage.getItem('email');
         }
      }
  },
  actions: {
    login({ commit }) {
        // 로그인 로직
        commit('login');
      },
      logout({ commit }) {
        // 로그아웃 로직
        commit('logout');
      },
  },
  modules: {
  }
})
