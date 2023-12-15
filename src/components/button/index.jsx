import { memo } from "react"

const Button = ({children, className, onClick = () => {}, type = "button"}) => {
    return (
        <button type={type} onClick={onClick} className={`w-full p-4 bg-primary text-white text-base font-semibold block rounded-[7px] border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-500  ${className}`}>
            {children}
        </button>
    )
}

export default memo(Button)