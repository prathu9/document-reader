import { ChangeEvent } from "react";

const Selector = ({parts, selectedPartIndex, handleChangePart}:{parts: string[], selectedPartIndex: number, handleChangePart:(event: ChangeEvent<HTMLSelectElement>) => void}) => {
    return(
        <div>
            <select className="px-4 py-2 cursor-pointer" onChange={handleChangePart} value={selectedPartIndex}>
                {
                    parts.map((_, index) => (
                        <option key={index} value={index}>
                            Part {index + 1}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Selector;