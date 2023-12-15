import { memo } from "react";

const Table = ({ head, children }) => {
  return (
    <div className="w-full">
      <table className="w-full border relative">
        <thead className="w-full sticky top-0 left-0 z-[2] bg-primary text-white text-[15px] font-semibold">
          <tr className="border-b">
            {head?.map((item) => (
              <th className="px-4 py-3" key={item.id}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default memo(Table);
