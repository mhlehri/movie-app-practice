import { Client, Databases, ID, Query } from 'react-native-appwrite';

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client()
  .setEndpoint(ENDPOINT as string) 
  .setProject(PROJECT_ID as string)

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
      const result = await database.listDocuments(
        DATABASE_ID as string,
        COLLECTION_ID as string,
        [Query.equal("searchTerm", query)]
      );

      if (result.documents.length > 0) {
        const document = result.documents[0];
        await database.updateDocument(
          DATABASE_ID as string,
          COLLECTION_ID as string,
          document.$id,
          {
            count: document.count + 1,
          }
        );
      } else {
        await database.createDocument(
          DATABASE_ID as string,
          COLLECTION_ID as string,
          ID.unique(),
          {
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            post_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }
        );
      }
    } catch (error) {
      console.error("Error updating search count:", error);
      throw error;  
    }
}