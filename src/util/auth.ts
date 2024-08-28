import { ipConfig } from "@/core/ipConfig";
import axios from "axios";
import { redirect } from "react-router-dom";

 

export async function checkAuthLoader() {
  const token = localStorage.getItem("token");
   
  // If token is not found, redirect to /auth
  if (!token) {
    return redirect("/auth");
  }
  if(token){
    try{
      const res=await axios.get(`${ipConfig}/auth/authCheck`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
       })
   
       if(res.status!==200){
        localStorage.removeItem("token");
        return redirect("/auth");
        
       }
    }catch(err){
      console.log(err)
    }
   
  }

  // If token is found, allow the route to proceed
  return null;
}
export function logout(){

}

