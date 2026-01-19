import { Client,Account,Avatars,OAuthProvider, Databases, Query, Models } from 'react-native-appwrite'
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from 'expo-web-browser'

export const config = {
    platform: 'com.bj.reestate',
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    endPoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    databaseID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleryCollectionID: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    agentsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    reviewsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_REVIEW_COLLECTION_ID,
    propertiesCollectionID: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

const client = new Client().setEndpoint(config.endPoint!)
                           .setProject(config.projectID!)
                           .setPlatform(config.platform)

export const avatars = new Avatars(client)
export const account = new Account(client)
export const dataBases = new Databases(client)

export const login = async () => {
    try{
      const redirect = Linking.createURL('/')

      const response = await account.createOAuth2Token({
        provider: OAuthProvider.Google,
        success: redirect,
        failure: redirect
      })
      if(!response) throw new Error('Failed to create OAuth2 session')
      const browserResult = await openAuthSessionAsync(response.toString(),redirect)
      if(browserResult.type !== 'success') throw new Error('Browser Result Failed')
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get('secret');
      const userId = url.searchParams.get('userId');
   
      if(!secret || !userId) throw new Error('Create OAuth2 token failed')
    
      const session = await account.createSession({
        secret,
        userId
      })
      if(!session) throw new Error('Failed to create session')
      return true
    }catch(err){
        console.log(err)
        return false
    }
}

export const logout = async () => {
    try{
       const response = await account.deleteSession({
        sessionId: 'current'
       })
       if(!response) throw new Error('Failed to delete session')
       return response
    }catch(err){
      console.log('Logout Err:',err)
    }
}

export const getUser = async () => {
    try{
        const result = await account.get()
        if(!result.$id) throw new Error('Failed to get user')
        return {
           ...result,
           avatar: `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(result.name)}`
        }
    }catch(err){
       console.log('Get User Err:',err)
       return null
    }
}

export const getLatestProperties = async () => {
    try{
       const results = await dataBases.listDocuments({
         databaseId: config.databaseID!,
         collectionId: config.propertiesCollectionID!,
         queries: [Query.orderAsc('$createdAt'),Query.limit(5)]
       })

       return results.documents
    }catch(err){
        console.error('Get Latest Properties Err:',err)
        return []
    }
}

export const getProperties = async ({query,filter,limit}:{
    query: string,
    filter: string,
    limit?: number
}) => {
   try {
      const buildQuery = [Query.orderDesc('$createdAt')]
      if(filter && filter !== 'All') buildQuery.push(Query.equal('type',filter))

      if(query) buildQuery.push(Query.or([
         Query.search('type',query),
         Query.search('name',query),
         Query.search('address',query)
      ]))

      if(limit) buildQuery.push(Query.limit(limit))
   
      const result = await dataBases.listDocuments({
        databaseId: config.databaseID!,
        collectionId: config.propertiesCollectionID!,
        queries: buildQuery
      })

      return result.documents

   }catch(err){
     console.error('Get Properties Err:',err)
     return []
   }
}
 
export const getPropertyByID = async ({id}:{id: string}) => {
    try {
       const result = await dataBases.getDocument({
         databaseId: config.databaseID!,
         collectionId: config.propertiesCollectionID!,
         documentId: id  
       })
       return result
    }catch(err){
        console.error('Get Property By ID Err:',err)
        return null
    }
}
