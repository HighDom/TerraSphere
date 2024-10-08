import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.buobs.aora",
  projectId: "66a4e130000b0dc7630e",
  databaseId: "66a4e2d9002b351f0473",
  userCollectionId: "66a4e2f5003c179d526c",
  videoCollectionId: "66a4e30f0015ab904865",
  storageId: "66a4e427002ff35305af",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
//const storage = new Storage(client)
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Failed to sign in:", error);
    throw new Error(error);
  }
};

export async function getAccount() {
  try {
    console.log("getAccount");
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log("Failed to get account:", error);
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    console.log("currentUser", currentUser);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (posts.documents.length > 0) {
      posts.documents.forEach((doc, index) => {
        console.log(`Document ${index + 1}:`, doc);
        // Log specific fields if needed
        console.log(
          `Title: ${doc.title}, Video URL: ${doc.videoUrl}, Creator: ${doc.creator}`
        );
      });
    }

    return posts;
  } catch (error) {
    console.error("Failed to search posts:", error);
    throw new Error("Error fetching posts");
  }
}

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    if (posts.documents.length > 0) {
      posts.documents.forEach((doc, index) => {
        console.log(`Document ${index + 1}:`, doc);
        // Log specific fields if needed
        console.log(
          `Title: ${doc.title}, Video URL: ${doc.videoUrl}, Creator: ${doc.creator}`
        );
      });
    }

    return posts;
  } catch (error) {
    console.error("Failed to search posts:", error);
    throw new Error("Error fetching posts");
  }
}

export async function singOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}
