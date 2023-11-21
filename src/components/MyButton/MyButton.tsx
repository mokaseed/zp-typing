import React, { Children } from "react";
import "./MyButton.scss";

type Props = {
  children: any;
  onClick: () => void;
};

const MyButton = ({ children, onClick }: Props) => {
  return <button onClick={onClick}>{children}</button>;
};

export default MyButton;
