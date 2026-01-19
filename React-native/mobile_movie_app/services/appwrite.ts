import { Client, Databases, ID, Query } from 'react-native-appwrite'

const DATA_BASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_ID  = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!


const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_ID!)


const database = new Databases(client)


export const updateSearchTerm = async (searchQuery: string,movie: Movie) => {
  try{
   const result = await database.listDocuments(DATA_BASE_ID,'693e76d3002823ac4a32',[
     Query.equal('searchTerm',searchQuery)
   ])
   if(result.documents.length > 0){
       database.updateDocument(DATA_BASE_ID,COLLECTION_ID,result.documents[0].$id,{
         count: result.documents[0].count + 1
       })
   }else {
     database.createDocument(DATA_BASE_ID,COLLECTION_ID,ID.unique(),{
        movie_id: movie.id,
        searchTerm: searchQuery,
        count: 1,
        title: movie.title,
        poster_url:  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
     })
   }
  }catch(err){
    console.log(err)
  }
}

export const getTrendingMovies = async () : Promise<TrendingMovie[] | undefined>=> {
    try{
      const result = await database.listDocuments(DATA_BASE_ID,'693e76d3002823ac4a32',[
        Query.limit(5),
        Query.orderDesc('count')
      ])

      return result.documents as unknown as TrendingMovie[]

    }catch(err){
        console.log(err)
    }
}
