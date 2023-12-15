import { createCategory } from "@/data/data.fn";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { memo, useState } from "react";
import { toast } from "react-toastify";

const CreateCategoryModal = ({ open, setOpen, refetch }) => {
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [file, setFile] = useState("");
  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");

  const handleClose = () => {
    setOpen(false);
    setNameUz("");
    setNameRu("");
    setNameEn("");
    setFile(null);
    setImgSrc("/img/empty-img.svg");
  };

  const handleImageUpload = (e) => {
    const images = e.target.files;
    const url = URL.createObjectURL(images[0]);
    setFile(images[0]);
    setImgSrc(url);
  };


  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Kategoriya qo'shildi");
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
    if (nameRu && nameUz && nameEn && file) {
      const formData = new FormData();
      formData.append("title_uz", nameUz);
      formData.append("title_ru", nameRu);
      formData.append("title_en", nameEn);
      formData.append("photo", file);

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
        <DialogTitle id="alert-dialog-title">{`Kategoriya qo'shish`}</DialogTitle>
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
                onChange={handleImageUpload}
                type="file"
                accept="image/*"
                className="w-0 h-0 overflow-hidden"
              />
            </label>
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
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Bekor qilish</Button>
          <Button onClick={handleSubmit}>{"Qo'shish"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(CreateCategoryModal);
