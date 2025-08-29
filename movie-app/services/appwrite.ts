// track searches made by user
import { Client, Query, TablesDB } from "react-native-appwrite";
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const Tables = new TablesDB(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  // check if record of that search already exists
  const result = await Tables.listRows({
    databaseId: DATABASE_ID,
    tableId: COLLECTION_ID,
    queries: [Query.equal("searchTerm", query)],
  });

  // console.log("result", result);
  // if found, increment
  // else create new doc
};
