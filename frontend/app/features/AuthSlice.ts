import {  createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/data-fetching";
import { RootState } from "../store/store";

const initialState = {
loginStatus:false,
tokenCookie:""
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
       register:(state,action)=>{
            const {values} = action.payload; 
            const formData = new FormData();

        for(let i in Object.keys(values)){
          let key = Object.keys(values)[i];
          let value = Object.values(values)[i];
          if (typeof value === 'string' || value instanceof Blob)
            formData.append(key, value);
        }
        
    //     for (let pair of formData.entries()) {
    //       console.log(pair[0]+ ', ' + pair[1]); 
    //   }
      fetch(`${API_URL}/api/users/register`, {
          method: 'POST',
          body: formData,
          credentials: "include" //For cokkies in "Aplication"
        }
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);
        })
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
       }
    },
  })

  export const {register,login,checkLoginStatus,logout} = AuthSlice.actions;
  export const selectLoginStatus = (state:RootState) => state.auth.loginStatus

  export default AuthSlice.reducer;

