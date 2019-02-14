import * as React from 'react';
import {IModelElement, isComponentProperties} from "../models/model";
import {IComponent} from "../models/component";
import {IWbsItem} from "../models/wbsItem";
import { ComponentProperties } from './ComponentProperties';
import { WbsItemProperties } from './WbsItemProperties';

interface IProps {
    element: IModelElement;
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
                {isComponentProperties(elem.properties) &&
                    <ComponentProperties properties={elem.properties} />
                }
                {!isComponentProperties(elem.properties) &&
                    <WbsItemProperties properties={elem.properties} />
                }

            </ul>
        </div>
    );
}