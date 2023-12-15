import { createCategory, createSubcategory, editSubcategory } from "@/data/data.fn";
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
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const EditSubcategoryModal = ({
  open,
  setOpen,
  refetch,
  categories,
  subcategory,
  setSubcategory,
  view,
  setView,
}) => {
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [file, setFile] = useState("");
  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");
  const [parentId, setParentId] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setNameUz("");
    setNameRu("");
    setNameEn("");
    setFile(null);
    setImgSrc("/img/empty-img.svg");
    setParentId(null);
    setView(false)
    setSubcategory(null)
  };

  const handleImageUpload = (e) => {
    const images = e.target.files;
    const url = URL.createObjectURL(images[0]);
    setFile(images[0]);
    setImgSrc(url);
  };

  useMemo(() => {
    if (open && subcategory) {
      setNameUz(subcategory?.sub_category_name_uz);
      setNameRu(subcategory?.sub_category_name_ru);
      setNameEn(subcategory?.sub_category_name_en);
      setImgSrc(subcategory?.sub_category_image_link);
      setParentId(subcategory?.category_id);
    }
  }, [subcategory, open]);

  const { mutate } = useMutation({
    mutationFn: editSubcategory,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Subkategoriya o'zgartirildi");
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
    if (nameRu && nameUz && nameEn && parentId) {
      const formData = new FormData();
      formData.append("id", subcategory?.sub_category_id);
      formData.append("sub_title_uz", nameUz);
      formData.append("sub_title_ru", nameRu);
      formData.append("sub_title_en", nameEn);
      formData.append("category_id", parentId);
      if (file) {
        formData.append("photo", file);
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
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{`Subkategoriya o'zgartirish`}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <Typography>Rasm qoyish</Typography>
            <label
              className={`w-full  block p-4 border-2 rounded-md h-fit cursor-pointer mb-3`}
            >
              <img
                src={imgSrc}
                alt=""
                className="  h-[180px] smd:h-[250px]  rounded-md w-full object-contain"
              />
              <input
                disabled={view}
                onChange={handleImageUpload}
                type="file"
                accept="image/*"
                className="w-0 h-0 overflow-hidden"
              />
            </label>

            <TextField
              disabled={view}
              fullWidth
              value={nameUz}
              onChange={(e) => {
                setNameUz(e.target.value);
              }}
              label={"Nomi uz"}
            />
            <TextField
              disabled={view}
              fullWidth
              value={nameRu}
              onChange={(e) => {
                setNameRu(e.target.value);
              }}
              label={"Nomi ru"}
            />
            <TextField
              disabled={view}
              fullWidth
              value={nameEn}
              onChange={(e) => {
                setNameEn(e.target.value);
              }}
              label={"Nomi en"}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Ota kategoriyasi
              </InputLabel>
              <Select
                disabled={view}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parentId}
                label="Ota kategoriyasi"
                onChange={(e) => {
                  setParentId(e.target.value);
                }}
              >
                {categories?.data?.map((item) => (
                  <MenuItem key={item?.category_id} value={item?.category_id}>
                    {item?.category_name_uz}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>

        {view ? (
          <DialogActions>
            <Button onClick={handleClose}>Yopish</Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={handleClose}>Bekor qilish</Button>
            <Button onClick={handleSubmit}>{"O'zgartirish"}</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default memo(EditSubcategoryModal);
