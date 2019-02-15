import * as React from 'react';
import {IElement} from "../models/element";
import { ElementProperties } from './ElementProperties';

interface IProps {
    element: IElement;
}



export const ElementListItem = (props: IProps) => {
    let elem = props.element;
    return (
        <div>
            <li>{elem.name}</li>
            <ul>
                <li>id:{elem.id}</li>
                <li>type: {elem.elemType}</li>
                <li>class: {elem.class}</li>
                <ElementProperties properties={elem.properties} />
            </ul>
        </div>
    );
}