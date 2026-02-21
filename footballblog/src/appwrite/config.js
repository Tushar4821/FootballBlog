import conf from "../conf/conf";
import { Client, ID,Account,Storage, Databases, Query } from "appwrite";


export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
         this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content,featuredImage,status,userId,categories}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                   Title: title,       
                Content: content,     
                featuredImage: featuredImage, 
                Status: status,       
                userId: userId,
                categories: categories,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}={}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                   Title:  title,
                   Content :  content,
                  featuredImage :  featuredImage,
                   Status : status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("Status","active")]){
       try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
        )
       } catch (error) {
        throw error
        return false
       }
    }

    //file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

   // config.js
getFilePreview(fileId) {
    if (!fileId) {
        console.warn("Appwrite service :: getFilePreview :: Missing fileId");
        return "";
    }

    try {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        ).toString(); 
    } catch (error) {
        console.log("Appwrite service :: getFilePreview :: error", error);
        return "";
    }
}

}

const service = new Service()

export default service