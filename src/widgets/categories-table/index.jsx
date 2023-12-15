import Table from "@/components/table";
import { categories, categoriesTableHeaders } from "@/utils/consts";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { deleteCategory } from "@/data/data.fn";
import { useMutation } from "@tanstack/react-query";
import { useCategories } from "@/data/data.service";
import dynamic from "next/dynamic";
import CreateCategoryModal from "@/components/create-category-modal";
import EditCategoryModal from "@/components/edit-category-modal";

const DeleteModal = dynamic(() => import("@/components/delete-modal"), {
  ssr: false,
});

const CategoriesTable = () => {
  const [isDelete, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [create, setCreate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const { data, isLoading, isError, refetch } = useCategories();
  // const data = {data: []}

  const handleDeleteClose = () => {
    setDelete(false);
    setCurrentCategory(null);
  };

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Kategoriya o'chirildi");
        refetch();
        handleDeleteClose();
      } else {
        toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
      }
    },
    onError: (err) => {
      toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
    },
  });

  const handleDeleteCategory = () => {
    mutate(currentCategory?.category_id);
  };

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh]">
          <CreateCategoryModal
            refetch={refetch}
            open={create}
            setOpen={setCreate}
          />
          <EditCategoryModal
            open={edit}
            setOpen={setEdit}
            category={currentCategory}
            setCategory={setCurrentCategory}
            refetch={refetch}
            view={view}
            setView={setView}
          />
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`${currentCategory?.category_name_uz} ni o'chirishni hohlaysizmi`}
            handleSubmit={handleDeleteCategory}
            open={isDelete}
          />
          <Table head={categoriesTableHeaders}>
            {data?.data?.map((item, index) => (
              <tr key={item.category_id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item?.category_name_uz}</td>
                <td className="px-4 py-2">{item?.category_name_ru}</td>
                {/* <td className="px-4 py-2">{item?.category_name_en}</td> */}
                <td className="px-4 py-2">
                  {new Date(item?.category_create_at)?.toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setView(true);
                      setEdit(true);
                      setCurrentCategory(item);
                    }}
                  >
                    <MoreHorizIcon />
                  </Button>
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setEdit(true);
                      setCurrentCategory(item);
                    }}
                  >
                    <EditIcon />
                  </Button>
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setDelete(true);
                      setCurrentCategory(item);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="outlined"
          onClick={() => {
            setCreate(true);
          }}
        >
          {"Kategoriya qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default memo(CategoriesTable);
