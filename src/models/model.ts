import {IComponent, IComponentProperties} from "./component";
import { IWbsItem, IWbsItemProperties } from "./wbsItem";

export function isComponentProperties (props: IComponentProperties | IWbsItemProperties): props is IComponentProperties {
    return (<IComponentProperties>props).manufacturer !== undefined; 
}

export type IModelElement = IComponent | IWbsItem;

export interface IModel {
    elements: Array<IModelElement>;
}