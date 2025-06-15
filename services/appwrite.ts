import { Client, Databases, Query } from 'react-native-appwrite';

const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client()
  .setEndpoint(ENDPOINT as string) 
  .setProject(PROJECT_ID as string)

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
    const result = await database.listDocuments(
        DATABASE_ID as string,
        COLLECTION_ID as string,
        [Query.equal('searchTerm', query)]
    )
    console.log({result});
}