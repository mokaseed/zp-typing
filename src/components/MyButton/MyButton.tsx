import React, { Children } from "react";
import "./MyButton.scss";

type Props = {
  children: any;
  onClick: () => void;
  typing: boolean;
};

const MyButton = ({ children, onClick, typing }: Props) => {
  return <button className={typing ? "is-typing" : ""} onClick={onClick}>{children}</button>;
};

export default MyButton;
