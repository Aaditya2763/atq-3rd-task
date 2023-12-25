import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    registered:false,
   username:""
  },
  

  reducers: {    
    register:(state)=>{
state.registered=true
    },
    login: (state) => {

      state.loggedIn = true;
    
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout ,register} = authSlice.actions;
export default authSlice.reducer;
