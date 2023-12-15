import { navData } from "@/utils/consts";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

const Sidebar = ({ open, setOpen }) => {
  const { pathname } = useRouter();

  return (
    <div className={`absolute h-screen z-[10] w-full top-0 left-0 bg-[#00000075] lg:bg-transparent lg:w-1/5 lg:static ${open ? "block" : "hidden"} lg:block`} onClick={() => {setOpen(false)}} >
      <div
        className={`h-screen   overflow-x-auto shrink-0 max-w-[250px] lg:max-w-full w-full  bg-primary text-white`}
        onClick={(e) => {e.stopPropagation()}}
      >
        <div className="py-4 flex items-center justify-between px-3 lg:hidden">
        <Link
            href={"/"}
            className="block w-fit"
          >
            <img
              src={
                pathname?.includes("/ardotex")
                  ? "/img/ardotex-white.png"
                  : "/img/ardohome-white.png"
              }
              alt=""
              className="block w-[100px]  h-[40px] object-contain"
            />
          </Link>
          <button className=" w-[30px] h-[30px] flex flex-col items-center justify-center " onClick={() => {setOpen(false)}} >
                <span className="block w-full bg-white h-[2px] -rotate-45"></span>
                <span className="block w-full bg-white h-[2px] mt-[-2px] rotate-45 "></span>
            </button>
        </div>
        <div className="py-4">
        <div className="">
              {navData?.map((item) => (
                <Link
                  className={`block w-full text-center text-white text-base font-medium p-3 ${
                    item.url == pathname ? "bg-mainYellow" : ""
                  } `}
                  key={item.id}
                  href={item.url}
                >
                  {item.name}
                </Link>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
