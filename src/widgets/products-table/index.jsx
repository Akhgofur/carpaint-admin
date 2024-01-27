import Table from "@/components/table";
import {
  productsTableHeaders,
  subcategoriesTableHeaders,
} from "@/utils/consts";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { deleteProduct, deleteSubcategory } from "@/data/data.fn";
import { useMutation } from "@tanstack/react-query";
import CreateProductModal from "@/components/create-product-modal";
import {
  useBrands,
  useCategories,
  useProducts,
  useSubcategories,
} from "@/data/data.service";
import DeleteModal from "@/components/delete-modal";
import EditProductModal from "@/components/edit-product-modal";

const ProductsTable = () => {
  
  const [isDelete, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [view, setView] = useState(false);

  const [offsetNum, setOffsetNum] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, refetch } = useProducts({ limit, page: offsetNum })
  const { data: categories } = useCategories();
  const { data: subcategories } = useSubcategories();
  const {data: brands} = useBrands({limit: 50, page: 1})


  const handleDeleteClose = () => {
    setDelete(false);
    setCurrentProduct(null);
  };

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      console.log(data);

      if (data?.status == 200) {
        toast.success("Produkt o'chirildi");
        handleDeleteClose();
        refetch();
      } else {
        toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
      }
    },
    onError: (err) => {
      toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
    },
  });

  const handleDeleteProduct = () => {
    mutate(currentProduct?.product_id);
  };

  const handleRefetch = () => setTimeout(() => refetch(), 0);

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh] ">
          <CreateProductModal
            categories={categories}
            open={create}
            refetch={refetch}
            setOpen={setCreate}
            subcategories={subcategories}
            brands={brands}
          />
          <EditProductModal
            categories={categories}
            open={edit}
            setOpen={setEdit}
            product={currentProduct}
            setProduct={setCurrentProduct}
            refetch={refetch}
            setView={setView}
            subcategories={subcategories}
            view={view}
            brands={brands}
          />
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`${currentProduct?.product_title_uz} ni o'chirishni hohlaysizmi`}
            handleSubmit={handleDeleteProduct}
            open={isDelete}
          />
          <Table head={productsTableHeaders}>
            {data?.data?.map((item, index) => {
              const category = categories?.data?.find(
                (el) => el.category_id == item.category_id
              );
              const subCategory = subcategories?.data?.find(
                (el) => el.sub_category_id == item.sub_category_id
              );

              return (
                <tr key={item?.product_id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item?.product_title_uz}</td>
                  <td className="px-4 py-2">{category?.category_name_uz}</td>
                  <td className="px-4 py-2">
                    {subCategory?.sub_category_name_uz}
                  </td>
                  {/* <td className="px-4 py-2">{parent?.category_name_uz}</td> */}
                  <td className="px-4 py-2">
                    {new Date(item?.product_create_at)?.toLocaleDateString()}
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEdit(true);
                          setCurrentProduct(item);
                          setView(true);
                        }}
                      >
                        <MoreHorizIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setEdit(true), setCurrentProduct(item);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setDelete(true), setCurrentProduct(item);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              onClick={() => {
                setOffsetNum((e) => e - 1);
                handleRefetch();
              }}
              disabled={offsetNum == 1}
            >
              <NavigateNextIcon className="rotate-180" />
            </Button>
            <Typography>{offsetNum}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setOffsetNum((e) => e + 1);
                handleRefetch();
              }}
            >
              <NavigateNextIcon />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">limit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="Age"
                onChange={(e) => {
                  setLimit(e.target.value);
                  setOffsetNum(1)
                  handleRefetch();
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            setCreate(true);
          }}
        >
          {"Produkt qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default memo(ProductsTable);
