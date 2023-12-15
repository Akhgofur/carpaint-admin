import Table from "@/components/table";
import {
  categoriesTableHeaders,
  subcategoriesTableHeaders,
} from "@/utils/consts";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { deleteSubcategory } from "@/data/data.fn";
import { useMutation } from "@tanstack/react-query";
import { useCategories, useSubcategories } from "@/data/data.service";
import dynamic from "next/dynamic";
import CreateCategoryModal from "@/components/create-category-modal";
import EditCategoryModal from "@/components/edit-category-modal";
import CreateSubcategoryModal from "@/components/create-subcategory-modal";
import EditSubcategoryModal from "@/components/edit-subcategory-modal";

const DeleteModal = dynamic(() => import("@/components/delete-modal"), {
  ssr: false,
});

const SubcategoriesTable = () => {
  const [isDelete, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [create, setCreate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const { data, isLoading, isError, refetch } = useSubcategories();
  const { data: categories } = useCategories();
  // const data = {data: []}

  const handleDeleteClose = () => {
    setDelete(false);
    setCurrentCategory(null);
  };

  const { mutate } = useMutation({
    mutationFn: deleteSubcategory,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Subkategoriya o'chirildi");
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

  const handleDeleteSubcategory = () => {
    mutate(currentCategory?.sub_category_id);
  };

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh]">
          <CreateSubcategoryModal
            refetch={refetch}
            open={create}
            setOpen={setCreate}
            categories={categories}
          />
          <EditSubcategoryModal
            open={edit}
            setOpen={setEdit}
            subcategory={currentCategory}
            setSubcategory={setCurrentCategory}
            refetch={refetch}
            view={view}
            setView={setView}
            categories={categories}
          />
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`${currentCategory?.sub_category_name_uz} ni o'chirishni hohlaysizmi`}
            handleSubmit={handleDeleteSubcategory}
            open={isDelete}
          />
          <Table head={subcategoriesTableHeaders}>
            {data?.data?.map((item, index) => (
              <tr key={item.sub_category_id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item?.sub_category_name_uz}</td>
                <td className="px-4 py-2">{item?.sub_category_name_ru}</td>
                <td className="px-4 py-2">
                  {new Date(item?.sub_category_create_at)?.toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {
                    categories?.data?.find(
                      (el) => el?.category_id == item?.category_id
                    )?.category_name_uz
                  }
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
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
                  </div>
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
          {"Subkategoriya qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default memo(SubcategoriesTable);
