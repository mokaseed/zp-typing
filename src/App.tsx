import React, { useState } from "react";
import "./App.scss";
import MyButton from "./components/MyButton/MyButton";
import textDataArr from "./controllers/typingTextController";
import Header from "./components/Header/Header";


function App() {
  const [displayText, setDisplayText] = useState("push start!!");
  const [typingRomajiText, setTypingText] = useState("");
  const [typing, setTyping] = useState(false);
  const [keyPosition, setKeyPosition] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [typoCount, setTypoCount] = useState(0);
  const [totalKeys, setTotalKeys] = useState(0);

  // console.log(correctCount);
  // console.log(typoCount);
  // console.log(totalKeys);
  

  const setRandomText = () => {
    // テキストをランダムでセット
    const randomText = textDataArr[Math.floor(Math.random() * textDataArr.length)];
    
    setDisplayText(randomText.displayTextKanji);
    setTypingText(randomText.typingText);
  };

  const refresh = () => {
    const textSpans = document.querySelector(".textbox")!.children;

    [...textSpans].forEach((textSpan) => {
      textSpan.className = "waiting-letters";
    });

    // 最初の文字のクラス名のみ変更
    textSpans[0].className = "current-letters";

    // keyPositionをリセット
    setKeyPosition(0);
  };

  const typingToggle = () => {
    // 「中止」が押された時
    if (typing) {
      setDisplayText("push start!!");
      setTypingText("");
      refresh();

      // 「スタート」が押された時
    } else {
      const textbox: HTMLElement | null = document.querySelector(".App");

      if (textbox !== null) {
        textbox.focus();
      }
      setRandomText();
    }

    setTyping(typing ? false : true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // buttonがtrueの時
    if (typing) {
      // 文字の配列を取得
      const textSpans = document.querySelector(".textbox")!.children;

      setTotalKeys(totalKeys + 1);

      // 入力したキーと現在入力しようとしている文字が一致する時
      if (e.key === typingRomajiText[keyPosition]) {
        // 正解タイプ数をカウントアップ
        setCorrectCount(correctCount + 1);
        
        // 現在の文字を入力済みとする
        textSpans[keyPosition].classList.add("typed-letters");
        textSpans[keyPosition].classList.remove("current-letters");
        textSpans[keyPosition].classList.remove("typo");

        // まだ入力していない文字があるとき
        if (keyPosition <= typingRomajiText.length - 2) {
          // 次の位置へ移動
          textSpans[keyPosition + 1].className = "current-letters";
          setKeyPosition(keyPosition + 1);

        } else {
          // 全ての文字を入力し終わったとき
          // クラス名と入力位置をリフレッシュ
          refresh();
          // ランダムで次のテキストをセット
          setRandomText();
        }
        // 間違ったキーを入力したとき
      } else {
        // ミスタイプ数をカウントアップ
        setTypoCount(typoCount + 1);
        
        textSpans[keyPosition].classList.add("typo");
      }
    }
  };

  return (
    <div className="App" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
      <Header />
      <p className="display-text">{displayText}</p>
      <div className={`textbox ${!typing && "isStandby"}`}>
        <span className="current-letters">{typingRomajiText[0]}</span>
        {typingRomajiText
          .split("")
          .slice(1)
          .map((char, i) => (
            <span key={i} className="waiting-letters">
              {char}
            </span>
          ))}
      </div>
      <div className="button-wrap">
        <MyButton typing={typing} onClick={typingToggle}>
          {typing ? "中止" : "スタート"}
        </MyButton>
      </div>
    </div>
  );
}

export default App;
