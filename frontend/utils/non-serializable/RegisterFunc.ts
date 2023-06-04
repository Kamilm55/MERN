import { API_URL } from "../data-fetching";

const REGISTER = ({values,user,setUser}:any) =>{
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
        localStorage.setItem("user",JSON.stringify(data));
    })
    .catch(e=>{
      console.log(e);
    })
}
export default REGISTER;