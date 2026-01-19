const config = {
    baseUrl: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}


export const fetchMovies = async ({ query }: {query: string}) => {
    const endpoint = query ? `${config.baseUrl}/search/movie?query=${encodeURIComponent(query)}` : 
                              `${config.baseUrl}/discover/movie?sort_by=popularity.desc`
                              
    const response = await fetch(endpoint,{
        method: 'GET',
        headers: config.headers
    })
    
    if(!response.ok){
        //@ts ignore
       throw new Error('Unable to fetch movies',response.statusText)
    }

    const data = await response.json()
    return data.results
}

export const fetchMovieDetails = async (movideID: String): Promise<MovieDetails> => {
    try {
      const response = await fetch(`${config.baseUrl}/movie/${movideID}?api_key=${config.API_KEY}`,{
        method: 'GET',
        headers: config.headers
      })

      if(!response.ok) throw new Error('Failed to Fetch movies')
     
      const data = await response.json()
      return data
    }catch(err){
        console.log("MovieDetails Error:",err)
        throw err
    }
}