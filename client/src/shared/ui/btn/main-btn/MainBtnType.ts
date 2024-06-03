import {IBaseBtnType} from "@src/shared/types";

export interface IMainBtnType extends IBaseBtnType{
    state?: "black" | "gray" | "white" | "green"
    className?: string | undefined
    disabled?: boolean | undefined
    to?: string
}