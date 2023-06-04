import {  createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/data-fetching";
import { RootState } from "../store/store";

interface InitialState {
  loginStatus:boolean;
  tokenCookie:null | string;
  user:null | object;
  }

const initialState:InitialState = {
loginStatus:false,
tokenCookie:null,
user:null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
       register:()=>{
/// it is in => import { REGISTER } from '../../utils/RegisterFunc';
// it is placed in other func. Because this error =>{
// client.js:1 A non-serializable value was detected in an action, in the path: `payload.values.photo`.
//}        
        },
       login:(state,action)=>{
        const {values} = action.payload;
        fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers:{
              "Content-Type":"application/json"
            },
            credentials: "include" //For cokkies in "Aplication"
          }
          )
            .then(response => response.json())
            .then(data => {
              console.log(data);
          })
       },
       checkLoginStatus:()=>{
        const cookies = document.cookie;
        const token = cookies.split(";").find(cookie=>cookie.includes("token="))
        
        if(token)
            fetch(`${API_URL}/api/users/loginStatus`, {
            method: 'GET',
            credentials:"include",
            headers:{
            "Cookie":token
            }
        }
        )
            .then(response => response.json())
            .then(data => console.log(data))
        else
        console.log(false);// if there is no token 
        
       },
       logout:()=>{
        fetch(`${API_URL}/api/users/logout`, {
            method: 'GET',
            credentials:"include"
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
          })
       },
       setToken:(state)=>{

        if (typeof document !== 'undefined') {
          const cookies = document.cookie;
          const token = cookies.split(';').find((cookie) => cookie.includes('token=')) 
          if (typeof token === 'undefined')
          state.tokenCookie = null;
          else
          state.tokenCookie = token;

          console.log(state.tokenCookie);
          // In the above code, we check if document exists before accessing it. This ensures that the code is only executed on the client-side where document is available. During server-side rendering, the token variable will be null by default.
        }
       }

    },
  })

  export const {register,login,checkLoginStatus,logout,setToken} = AuthSlice.actions;
  export const selectLoginStatus = (state:RootState) => state.auth.loginStatus
  export const selectTokenCookie = (state:RootState) => state.auth.tokenCookie

  export default AuthSlice.reducer;

