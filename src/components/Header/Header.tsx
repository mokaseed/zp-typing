import React from "react";
import "./Header.scss";
import TypingCount from "../TypingCount/TypingCount";
import PlayTimer from "../PlayTimer/PlayTimer";

const Header = () => {
  return (
    <header className="header">
      <PlayTimer />
      <div className="typing-counter-wrap">
        <TypingCount >正解</TypingCount>
      </div>
    </header>
  );
};

export default Header;
