import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";


const Header = ({ setOpen}) => {
    const { pathname } = useRouter();


  
    return (
      <header className="w-full bg-primary ">
        <div className="w-full px-5 py-2 flex items-center gap-4">
            <button className="lg:hidden w-[30px] h-[30px] flex flex-col items-center justify-center gap-[6px]" onClick={() => {setOpen(true)}} >
                <span className="block w-full bg-white h-[2px]"></span>
                <span className="block w-full bg-white h-[2px]"></span>
                <span className="block w-full bg-white h-[2px]"></span>
            </button>
          <Link
            href={
              "/"
            }
            className="flex items-center gap-2 w-fit"
          >
            <img
              src={
                "/img/logo.png"
              }
              alt=""
              className="block w-[120px] h-[60px] object-center object-contain"
            />
            {/* <span className="text-white font-medium text-xl uppercase" >Carpaint</span> */}
          </Link>
        </div>
      </header>
    );
  }

export default memo(Header);
