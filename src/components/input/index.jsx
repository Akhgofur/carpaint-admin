import { memo } from "react"

const Input = ({type = "text", value = "", placeholder, onChange = () => {}, className}) => {
    return (
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} className={`block w-full text-sm outline-none bg-transparent border-[1.5px] p-4 text-primary rounded-[7px] focus:border-primary transition-all duration-500  ${className}`} />
    )
}

export default memo(Input)