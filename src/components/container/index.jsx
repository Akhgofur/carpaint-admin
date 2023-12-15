import { memo } from "react"

const Container = ({className, children}) => {
    return (
        <div className={`w-full max-w-[1200px] mx-auto px-4 ${className}`}>
            {children}
        </div>
    )
}

export default memo(Container)