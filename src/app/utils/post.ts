export interface Post{
  userId:number,
  content:string ,
  postDate:Date,
  fileName?:string,
    fileExt?:string,
    count?:number,
    id?:number,
    video:boolean,
    image:boolean,
    text:boolean,
    like?:boolean,
    likes?:number
  
}
// "id": 61,
//     "userId": 2003,
//     "content": "nana Emma",
//     "fileName": "b259f35b-ddfd-4f6e-be13-e2857eb783d2.jpeg",
//     "fileExt": "jpeg",
//     "count": 0,
//     "video": null,
//     "image": true,
//     "text": null,
//     "postDate": "2024-03-03T1
export interface PostB {
id:number,
    userId:number,
    content:string ,
    fileName?:string,
    fileExt?:string,
    postDate:Date,
    count:number,
    video:boolean,
    image:boolean,
    text:boolean,
    like?:boolean,
    likes?:number
}


export interface PostInfo{
id:number,
  userId:number,
  firstName: string;
  surname: string;
  email: string;
  content:string ,
    postDate:Date,
    fileName?:string
    fileExt?:string
  profilePictureName:string;
  i:number,
  d:boolean,
  programme:string,
  count:number,
  dc:boolean,
  video:boolean,
  image:boolean,
  text:boolean,
  like?:boolean,
    likes?:number
 // commentId:number

 // "outputPath": "dist/final-project",

}


