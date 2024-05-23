import {IBaseBtnType} from "@src/shared/types";

export interface IBigBtnType extends IBaseBtnType{
  state?: "black" | "gray" | "white" | "green"
  className?: string | undefined
  disabled?: boolean | undefined
  to?: string
}