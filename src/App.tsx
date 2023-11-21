import React, { useState } from "react";
import "./App.scss";
import MyButton from "./components/MyButton/MyButton";

function App() {
  const [text, setText] = useState("test text");
  const [typing, setTyping] = useState(false);
  const [keyPosition, setKeyPosition] = useState(0);
  

  const typingToggle = () => {
    setTyping(typing ? false : true);
  };

  const refresh = () => {
    let textSpans = document.querySelector(".textbox")!.children;

    [...textSpans].forEach((textSpan) => {
      textSpan.className = "waiting-letters";
    })

    // 最初の文字のクラス名のみ変更
    textSpans[0].className = "current-letters";

    // keyPositionをリセット
    setKeyPosition(0);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // buttonがtrueの時
    if (typing) {
      // 文字の配列を取得
      let textSpans = document.querySelector(".textbox")!.children;

      // 入力したキーと現在入力しようとしている文字が一致する時
      if (e.key === text[keyPosition]) {
        // 現在の文字を入力済みとする
        textSpans[keyPosition].classList.add("typed-letters");
        textSpans[keyPosition].classList.remove("current-letters");
        textSpans[keyPosition].classList.remove("typo");

        // まだ入力していない文字があるとき
        if (keyPosition <= text.length - 2) {
          // 次の位置へ移動
          textSpans[keyPosition + 1].className = "current-letters";
          setKeyPosition(keyPosition + 1);

          // 全ての文字を入力し終わったとき
        } else {
          // 入力不可にする
          setTyping(false);
        }
        // 間違ったキーを入力したとき
      } else {
        textSpans[keyPosition].classList.add("typo");
      }
    }
  };

  return (
    <div className="App" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
      <div className="textbox">
        <span className="current-letters">{text[0]}</span>
        {text
          .split("")
          .slice(1)
          .map((char, i) => (
            <span key={i} className="waiting-letters">{char}</span>
          ))}
      </div>
      <div className="button-wrap">
      <MyButton onClick={typingToggle}>{typing ? "ストップ" : "スタート"}</MyButton>
      <MyButton onClick={refresh}>リセット</MyButton>
      </div>
    </div>
  );
}

export default App;
