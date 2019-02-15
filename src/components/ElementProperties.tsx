import * as React from "react";
import { IPropertyObject } from "../models/propertyObject";

interface IProps {
    properties: IPropertyObject;
}
export const ElementProperties = (props: IProps) => {
    return (
        <div>
            {Object.keys(props.properties).map((key) => 
                <li key={key}>{key}: {props.properties[key].toString()}</li>
            )}
        </div>
    );
}
