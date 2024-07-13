import { Dispatch, useEffect, useState } from "react";
import { getWordBoundaries } from "../utils";
import ParaBox from "./ParaBox";

const PartDisplay = ({
  parts,
  currentPartIndex,
  setSelectedPartIndex,
}: {
  parts: string[];
  currentPartIndex: number;
  setSelectedPartIndex: Dispatch<React.SetStateAction<number>>;
}) => {
  const [wordBoundaries, setWordBoundaries] = useState<number[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [charIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const wordIndex = wordBoundaries.findIndex(
      (boundary) => boundary > charIndex
    );
    setCurrentWordIndex(wordIndex);
  }, [charIndex, wordBoundaries]);

  useEffect(() => {
    if (parts[currentPartIndex]) {
      setWordBoundaries(getWordBoundaries(parts[currentPartIndex]));
    }
  }, [parts, currentPartIndex, setWordBoundaries]);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const speakPart = (partIndex: number) => {
      const utterance = new SpeechSynthesisUtterance(parts[partIndex]);
      setCurrentWordIndex(0);
      utterance.rate = 1;

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          setCurrentCharIndex(event.charIndex);
        }
      };

      utterance.onend = () => {
        if (currentPartIndex === parts.length) {
          setIsSpeaking(false);
        } else {
          setSelectedPartIndex(currentPartIndex + 1);
          speakPart(currentPartIndex + 1);
        }
      };

      setIsSpeaking(true);

      window.speechSynthesis.speak(utterance);
    };

    speakPart(currentPartIndex);
  };

  return (
    <>
      <div className="text-xl">
        {parts.length > 0 && (
          <ParaBox
            paras={parts[currentPartIndex]}
            currentWordIndex={currentWordIndex}
          />
        )}
      </div>
      <div className="absolute top-10 right-10">
        <button onClick={handleSpeak} className="p-2">
          Speak
        </button>
      </div>
    </>
  );
};

export default PartDisplay;
