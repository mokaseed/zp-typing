import React from "react";
import "./TypingStates.scss";
import { useSelector } from "react-redux";
import { selectCorrectCount, selectTypoCount, selectTotalKeys } from "../typingStatesSlice";

type Props = {
  children: string;
};

const TypingCount = ({ children }: Props) => {

  let correctCount = useSelector(selectCorrectCount);
  let typoCount = useSelector(selectTypoCount);
  let totalKeys = useSelector(selectTotalKeys);

  return (
    <p className="typing-count">
      <span className="typing-count_num">正解タイプ数：{correctCount}</span><br />
      <span className="typing-count_num">ミスタイプ数：{typoCount}</span><br />
      <span className="typing-count_num">全タイプ数：{totalKeys}</span><br />
    </p>
  );
};

export default TypingCount;
