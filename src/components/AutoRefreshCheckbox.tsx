import * as React from "react";

interface IProps {
    label: string;
    isChecked: boolean;
    onChange: () => void;
}

export const AutoRefreshCheckBox = (props: IProps) => {
    return (
        <div className="checkbox">
            <label>
                <input type="checkbox" value={props.label} checked={props.isChecked} onChange={props.onChange}  />
                {props.label}
            </label>
         </div>
    );

}