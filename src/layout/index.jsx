import { memo, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = 
    ({ children }) => {


        const [open, setOpen] = useState(false)
    
      return (
        <div className="w-full h-screen overflow-hidden flex flex-col">
          <Header  setOpen={setOpen} />
          <div className="flex items-stretch h-full grow">
            <Sidebar open={open} setOpen={setOpen} />
            <div className="h-full w-full  p-5">{children}</div>
          </div>
        </div>
      );
    }


export default memo(Layout);
