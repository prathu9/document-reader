import { useState, useEffect, ChangeEvent } from 'react'
import './App.css'
import {documentToParts} from "./utils"
import Selector from './components/Selector';
import PartDisplay from './components/PartDisplay';

function App() {
  const [parts, setParts] = useState<string[]>([]);
  const [selectedPartIndex, setSelectedPartIndex] = useState(0);

  useEffect(() => {
    fetch("/document/text.txt")
    .then((res) => res.text())
    .then((data) => setParts(documentToParts(data, 1500)))
    .catch((err) => console.log(err));

      window.speechSynthesis.cancel();
    
},[])

const handleChangePart = (event: ChangeEvent<HTMLSelectElement>) => {
  const selectedIndex = event.target.value;
  setSelectedPartIndex(+selectedIndex);
}


  return (
    <>
      <div className='flex gap-5'>
        <div className='p-6'>
          <Selector parts={parts} handleChangePart={handleChangePart}/>
        </div>
        <div className='px-10 py-6'>
          <PartDisplay parts={parts} currentPartIndex={selectedPartIndex} setSelectedPartIndex={setSelectedPartIndex} />
        </div>
      </div>
    </>
  )
}

export default App
