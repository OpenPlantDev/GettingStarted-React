import * as React from 'react';
import { IElement } from '../models/element';
import {ElementListItem} from "./ElementListItem";

interface IProps {
    elements: Array<IElement>;
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

