import axios from "axios";
import react from "react";


  const URL="https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s"
  

  export const galleryphotos=()=>{
   return axios({ 
      method:"get",
      url:URL
    })
 
  }
//   export const userDetail=(id)=>{
//     return axios({ 
//        method:"get",
//        url:`${baseURL}users/${id}`
//      })
  
//    }