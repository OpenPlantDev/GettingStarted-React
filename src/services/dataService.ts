import {IElement} from "../models/element";


export class ElementDataService {

    constructor() {

    }

    fetchElements(queryString: string): Promise<Array<IElement>>  {
        let url = "http://localhost:3030/api/models/elements";
        if(queryString) {
            url = `${url}?${queryString}`;
        }
        console.log(url);
        return fetch(url).then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error reading data");
                }
            }).then((result) => {
                return result as Array<IElement>;
            }).catch((err) => {
                console.log(`In fetchElements catch: ${err}`);
                throw err;
            });
   }

   fetchComponents() {
       try {
         return this.fetchElements("filter=elemType='component'&orderby=class,name");
       }
       catch(err) {
           throw err;
       }
    }

    fetchWbsItems() {
        try {
            return this.fetchElements("filter=elemType='wbsitem'&orderby=class,name"); 
        }
          catch(err) {
              throw err;
          }
       }

}