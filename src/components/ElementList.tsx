import * as React from 'react';
import { IModelElement } from '../models/model';
import {ElementListItem} from "./ElementListItem";

interface IProps {
    elements: Array<IModelElement>;
}

export const ElementList = (props: IProps)  => {
   return (
      <div >
         <ul>
         {props.elements.map(elem => 
            <ElementListItem key={elem.id} element={elem} />
         )}
         </ul>
      </div> 
   );
}

