import ApiRequest from "./ApiRequest"

export const getBreakingNews = async () =>{
   console.log(process.env.REACT_APP_NEWS_API_PUBLIC_KEY,'Api-Key')
     return ApiRequest({
        url: `https://newsdata.io/api/1/news?apikey=pub_58406a2c9c5a16baae9b4d770bb3c6cdeb52e&country=in&language=en&image=1&removeduplicate=1&size=5`,
        method: 'GET'
     }).catch(err => {
         console.log(err,'error in api')
         throw err
     })
}

export const  getCategoriesNewsList = async (category) =>{
     let categoryString = ''
     if(category.length !== 0){
       categoryString =`&category=${category}`
     }
     return ApiRequest({
        url: `https://newsdata.io/api/1/news?apikey=pub_58406a2c9c5a16baae9b4d770bb3c6cdeb52e&language=en&image=1&removeduplicate=1&size=10${categoryString}`,
        method: 'GET'
     }).catch(err => {
         console.log(err,'error in api')
         throw err
     })
}

export const  getSearchNewsList = async (query,category,country) =>{
   let categoryString = ''
   let countryString = ''
   let queryString = ''
   if(category.length !== 0){
     categoryString =`&category=${category}`
   }
   if(country.length !== 0){
      countryString =`&country=${country}`
    }
   if(query.length !== 0){
      queryString =`&q=${query}`
    }
    console.log(category,query,country,'balaji')
   return ApiRequest({
      url: `https://newsdata.io/api/1/news?apikey=pub_58406a2c9c5a16baae9b4d770bb3c6cdeb52e&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`,
      method: 'GET'
   }).catch(err => {
       console.log(err,'error in api')
       throw err
   })
}

export const  getFavourtitesNewsList = async (query) =>{
   let queryString = ''
   console.log(query,'mahesh')
   if(query.length !== 0){
      queryString =`&id=${query}`
    }
   return ApiRequest({
      url: `https://newsdata.io/api/1/news?apikey=pub_58406a2c9c5a16baae9b4d770bb3c6cdeb52e${queryString}`,
      method: 'GET'
   }).catch(err => {
       console.log(err,'error in api')
       throw err
   })
}
