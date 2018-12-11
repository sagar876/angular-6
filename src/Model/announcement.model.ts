import { Time } from "@angular/common";

export class annoucementData{
    description : String
    image_url : String
    title : String //(50 characters max)
    type : number
    doc_id : string; //(0 : party, 1 : announcement, 2 : sports, important : 3)

}
