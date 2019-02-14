import * as React from "react";
import { IWbsItemProperties } from "../models/wbsItem";

interface IProps {
    properties: IWbsItemProperties;
}
export const WbsItemProperties = (props: IProps) => {
    return (
        <div>
            <li>desc: {props.properties.desc}</li>
        </div>
    );
}