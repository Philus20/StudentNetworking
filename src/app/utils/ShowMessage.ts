export interface ShowMessage{
    id:number,
    senderEmail? :string,
    receiverEmail ?:string,
    subject : string,
    status?:string,
    time?:Date ,
    file?:string,
    isFile?:string,
    fileDisplay:boolean
    user:boolean,
    ext?:string,
    v?:boolean,
    i?:boolean,
    d?:boolean,
    index:number,
    fileUrl?:string,
    download?:boolean,
    active?:boolean,
    unactive?:boolean,
    complete?:boolean,
    isnull?:boolean


}