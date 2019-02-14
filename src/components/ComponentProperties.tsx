import * as React from "react";
import { IComponentProperties } from "../models/component";

interface IProps {
    properties: IComponentProperties;
}
export const ComponentProperties = (props: IProps) => {
    return (
        <div>
            <li>desc: {props.properties.desc}</li>
            <li>manufacturer: {props.properties.manufacturer}</li>
        </div>
    );
}