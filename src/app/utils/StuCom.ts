export interface StuCom{

Id?:number,
firstName:string,
surname:string,
profilePictureName:string,
programme:string,
UserId:string,
postId:number,
content:string,
CommentDate:Date,
commentId:number
//d:boolean

    // public int Id { get; set; }
    // public string? firstName { get; set; }
    // public string? surname { get; set; }
  
    // public string? profilePictureName { get; set; }
    
    // public string? Programme { get; set; }

    // public int UserId { get; set; }
    // public int PostId { get; set; }
    // public string Content { get; set; }
    // public DateTime CommentDate { get; set; }




}

export interface QuestionComment{

    id?:number,
    firstName:string,
    surname:string,
    profilePictureName:string,
    content:string,
    questionId:number,
    commentDate:Date,
    index:number
   
    // public int id { get; set; }

    // public string firstName { get; set; }
    // public string surname { get; set; }
    // public string profilePictureName { get; set; }
    // public string content { get; set; }
    // public int questionId { get; set; }
    // public DateTime? commentDate { get; set; }


}

export interface Question{
    id?:number,
    firstName:string,
    surname:string,
    comment:number,
     content:string,
     questionDate?:Date,
     profilePictureName:string,
     index?:number
}