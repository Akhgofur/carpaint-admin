import { navData } from "@/utils/consts";
import Link from "next/link";

const DshbHome = () => {
  return (
    <div className="flex justify-center py-10 ">
      <div className="w-fit grid grid-cols-1 smd:grid-cols-2 gap-4 ">
        {navData?.slice(1, 7)?.map((item) => (
          <Link
            href={item.url}
            key={item.id}
            className="justify-center border-2 border-primary text-primary p-3 rounded-lg flex items-center gap-3"
          >
            <p className="text-lg ">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DshbHome;
