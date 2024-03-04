
export interface Message{
id?:number;
senderEmail? :string,
receiverEmail ?:string,
subject : string,
status?:string,
time?:Date,
file?:string,
isFile?:string,
ext?:string
}
// Status ?: string
// time?:Date
//<p>Date only: {{ newMessage.timestamp | date:'yyyy-MM-dd' }}</p>


// public int id { get; set; }
// public string SenderEmail { get; set; }

// public string ReceiverEmail { get; set; }
// public string Subject { get; set; }
// public string Status { get; set; }
// public string SenderEmail { get; set; }

// public string ReceiverEmail { get; set; }
// public string Subject { get; set; }
// public string Status { get; set; }

// public DateTime time { get; set; }
// public DateTime time { get; set; }