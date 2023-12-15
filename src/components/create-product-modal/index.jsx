import { createProduct } from "@/data/data.fn";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateProductModal = ({
  open,
  setOpen,
  refetch,
  categories,
  subcategories,
  brands,
}) => {
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [files, setFiles] = useState([]);
  const [tableFile, setTableFiles] = useState(null);
  const [tableSrc, setTableSrc] = useState("/img/empty-img.svg");
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setNameUz("");
    setNameRu("");
    setNameEn("");
    setDescriptionUz("");
    setDescriptionRu("");
    setDescriptionEn("");
    setBrandId(null)
    setTableFiles(null)
    setTableSrc("/img/empty-img.svg")
    setFiles([]);
    setCategoryId(null);
    setSubcategoryId(null);
  };

  const handleImageUpload = (e) => {
    const images = e.target.files;
    setFiles((prev) => [...prev, { image: images[0], id: uuidv4() }]);
  };

  const handleTableImageUpload = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setTableSrc(url);
    setTableFiles(img[0]);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Produkt qo'shildi");
        refetch();
        handleClose();
        return;
      } else {
        toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
      }
    },
    onError: (err) => {
      toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
    },
  });

  const handleSubmit = () => {
    if (nameRu && nameUz && nameEn && files?.length && categoryId) {
      const formData = new FormData();
      formData.append("product_title_uz", nameUz);
      formData.append("product_title_ru", nameRu);
      formData.append("product_title_en", nameEn);
      formData.append("product_description_uz", descriptionUz);
      formData.append("product_description_ru", descriptionRu);
      formData.append("product_description_en", descriptionEn);

      for (let i = 0; i < files?.length; i++) {
        formData.append("photos", files[i]?.image);
      }
      if (tableFile) {
        formData.append("tableImg", tableFile);
      }
      formData.append("brand_id", brandId);
      formData.append("category_id", categoryId);
      if (subcategoryId) {
        formData.append("sub_category_id", subcategoryId);
      }

      mutate(formData);
    } else {
      toast.error("Barcha joylarni to'ldiring");
    }
  };

  return (
    <div className="">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{`Produkt qo'shish`}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <Typography>Rasm qoyish</Typography>
              <label
                className={`w-full  block p-4 border-2 rounded-md h-fit cursor-pointer mb-4`}
              >
                <img
                  src={"/img/empty-img.svg"}
                  alt=""
                  className="  h-[180px] smd:h-[250px]  rounded-md w-full object-contain"
                />
                <input
                  onChange={handleImageUpload}
                  type="file"
                  accept="image/*"
                  className="w-0 h-0 overflow-hidden"
                />
              </label>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {files?.map((item) => {
                  const url = URL.createObjectURL(item?.image);

                  return (
                    <button
                    key={item?.id}
                      className="w-full h-[100px] p-2 block border-dashed border-2 rounded-md"
                      onClick={() => {
                        const confirmation = confirm(
                          "Aru you sure to delete image"
                        );
                        if (confirmation) {
                          setFiles((prev) =>
                            prev?.filter((el) => el.id != item.id)
                          );
                        }
                      }}
                    >
                      <img
                        src={url}
                        alt="image"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
              <Typography>Jadval rasmini qoyish</Typography>
              <label
                className={`w-full  block p-4 border-2 rounded-md h-fit cursor-pointer`}
              >
                <img
                  src={tableSrc}
                  alt=""
                  className="  h-[180px] smd:h-[250px]  rounded-md w-full object-contain"
                />
                <input
                  onChange={handleTableImageUpload}
                  type="file"
                  accept="image/*"
                  className="w-0 h-0 overflow-hidden"
                />
              </label>
            </div>
            <div className="flex flex-col gap-4 py-2 w-full md:w-1/2">
              <TextField
                fullWidth
                value={nameUz}
                onChange={(e) => {
                  setNameUz(e.target.value);
                }}
                label={"Nomi uz"}
              />
              <TextField
                fullWidth
                value={nameRu}
                onChange={(e) => {
                  setNameRu(e.target.value);
                }}
                label={"Nomi ru"}
              />
              <TextField
                fullWidth
                value={nameEn}
                onChange={(e) => {
                  setNameEn(e.target.value);
                }}
                label={"Nomi en"}
              />
              <div className="py-4">
                <ReactQuill
                  value={descriptionUz}
                  onChange={(e) => {
                    setDescriptionUz(e);
                  }}
                  placeholder="Haqida uz"
                />
              </div>
              <div className="py-4">
                <ReactQuill
                  value={descriptionRu}
                  onChange={(e) => {
                    setDescriptionRu(e);
                  }}
                  placeholder="Haqida ru"
                />
              </div>
              <div className="py-4">
                <ReactQuill
                  value={descriptionEn}
                  onChange={(e) => {
                    setDescriptionEn(e);
                  }}
                  placeholder="Haqida en"
                />
              </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={brandId}
                  label="Brand"
                  onChange={(e) => {
                    setBrandId(e.target.value);
                  }}
                >
                  {brands?.data?.map((item) => (
                    <MenuItem key={item?.brand_id} value={item?.brand_id}>
                      {item?.brand_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Kategoriyasi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryId}
                  label="Kategoriyasi"
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                  }}
                >
                  {categories?.data?.map((item) => (
                    <MenuItem key={item?.category_id} value={item?.category_id}>
                      {item?.category_name_uz}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Sub kategoriyasi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subcategoryId}
                  label="Sub kategoriyasi"
                  onChange={(e) => {
                    setSubcategoryId(e.target.value);
                  }}
                >
                  {subcategories?.data?.map((item) => (
                    <MenuItem
                      key={item?.sub_category_id}
                      value={item?.sub_category_id}
                    >
                      {item?.sub_category_name_uz}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button disabled={isPending} onClick={handleClose}>
            Bekor qilish
          </Button>
          <Button disabled={isPending} onClick={handleSubmit}>
            {"Qo'shish"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(CreateProductModal);
