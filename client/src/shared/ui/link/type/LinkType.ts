import {Key, ReactNode} from "react";

export interface TBaseLink {
  children: ReactNode;
  to: string;
  key: Key
}