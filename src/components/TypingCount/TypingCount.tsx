import React from 'react'
import "./TypingCount.scss";

type Props = {
  children: string;
}

const TypingCount = ({children}: Props) => {
  return (
    <p className='typing-count'>
      <span className="typing-count_type">{children}タイプ数</span>
      <span className="typing-count_num">100回</span>
    </p>
  )
}

export default TypingCount