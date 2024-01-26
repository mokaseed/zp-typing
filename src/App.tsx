import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import MyButton from "./components/MyButton/MyButton";
import textDataArr from "./controllers/typingTextController";
import Header from "./components/Header/Header";
import {
  correctCountIncrement,
  typoCountIncrement,
  totalKeysIncrement,
  refresh,
} from "./features/typingCount/typingStatesSlice";

function App() {
  const [displayText, setDisplayText] = useState("push start!!");
  const [typingRomajiText, setTypingText] = useState("");
  const [typing, setTyping] = useState(false);
  const [keyPosition, setKeyPosition] = useState(0);
  const [isMisstype, setIsMisstype] = useState(false);

  const dispatch = useDispatch();

  const setRandomText = () => {
    // テキストをランダムでセット
    const randomText =
      textDataArr[Math.floor(Math.random() * textDataArr.length)];

    setDisplayText(randomText.displayTextKanji);
    setTypingText(randomText.typingText);
  };

  const typingToggle = () => {
    // 「中止」が押された時
    if (typing) {
      setDisplayText("push start!!");
      setTypingText("");
      setKeyPosition(0);

      // 「スタート」が押された時
    } else {
      const textbox: HTMLElement | null = document.querySelector(".App");

      if (textbox !== null) {
        textbox.focus();
      }

      dispatch(refresh());

      setRandomText();
    }

    setTyping(!typing);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // buttonがtrueの時
    if (typing) {
      dispatch(totalKeysIncrement());

      // 入力したキーと現在入力しようとしている文字が一致する時
      if (e.key === typingRomajiText[keyPosition]) {
        // 正解タイプ数をカウントアップ
        dispatch(correctCountIncrement());
        setIsMisstype(false);

        // まだ入力していない文字があるとき
        if (keyPosition <= typingRomajiText.length - 2) {
          // 次の位置へ移動
          setKeyPosition(keyPosition + 1);

          // 全ての文字を入力し終わったとき
        } else {
          // 入力位置をリフレッシュ
          setKeyPosition(0);
          // ランダムで次のテキストをセット
          setRandomText();
        }
        // 間違ったキーを入力したとき
      } else {
        // ミスタイプ数をカウントアップ
        dispatch(typoCountIncrement());
        setIsMisstype(true);
      }
    }
  };

  return (
    <div className="App" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
      <Header />
      <p className="display-text">{displayText}</p>
      <div className={`textbox ${!typing && "isStandby"}`}>
        <span className="typed-letters">
          {typingRomajiText.slice(0, keyPosition)}
        </span>
        <span className={`current-letters ${isMisstype && "typo"}`}>
          {typingRomajiText[keyPosition]}
        </span>
        <span className="waiting-letters">
          {typingRomajiText.slice(keyPosition + 1, typingRomajiText.length)}
        </span>
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
