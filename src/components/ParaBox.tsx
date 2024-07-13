
import { partsToPara } from "../utils";

const ParaBox = ({ paras, currentWordIndex }: { paras: string,  currentWordIndex: number }) => {

    const highlightText = (text: string, currentWordIndex: number, startIndex: number, endIndex: number) => {
        const words = text.split(" ");

        let isActive = false;

        if(startIndex <= currentWordIndex && currentWordIndex <= startIndex + endIndex){
            isActive = true;
        }
        else{
            isActive = false;
        }
// console.log(startIndex, endIndex, currentWordIndex, isActive)
        return (
          <>
            {words.map((word, i) => (
              <span
                key={i}
                className={`${(i+startIndex) === currentWordIndex && isActive ? "bg-emerald-700" : "bg-transparent"}`}
              >
                {word + " "}
              </span>
            ))}
          </>
        );
      };

  return (
    <>
    {
        partsToPara(paras).map((para: string, index: number) => {
           
            const {startIndex, endIndex} = getParaStartAndEndIndex(partsToPara(paras), index);

            return(<p key={index} className="pt-4">{highlightText(para, currentWordIndex, startIndex, endIndex)}</p>)
})
    }  
    </>
  );
};


const getParaStartAndEndIndex = (paras: string[], paraIndex: number) => {
    let currentIndex = 0;
    let startIndex = 0;
    let endIndex = 0;
    while(currentIndex <= paraIndex){
        if(currentIndex > 0){
            startIndex += paras[currentIndex - 1].split(" ").length - 1;
        }
        endIndex += paras[currentIndex].split(" ").length - 1
        currentIndex++;
    }

    return {startIndex, endIndex};
}

export default ParaBox;
