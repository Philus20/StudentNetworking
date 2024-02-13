export interface Register {
    id: number;
    firstName: string;
    surname: string;
    email: string;
    password: string;
    profilePictureName:string;
    dateOfBirth:Date;
    registrationDate:Date;
    programme:string;
  }
export interface TopChatAddCounting {
    id : number;
    firstName: string;
    surname?: string;
    profilePictureName:string;
    unread:number;
    
  }