import { ChangeEvent } from "react";

const Selector = ({parts, handleChangePart}:{parts: string[], handleChangePart:(event: ChangeEvent<HTMLSelectElement>) => void}) => {
    return(
        <div>
            <select className="px-4 py-2 cursor-pointer" onChange={handleChangePart}>
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