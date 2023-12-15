import {  createNews } from "@/data/data.fn";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateNewsModal = ({ open, setOpen, refetch }) => {
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");  
  const [nameEn, setNameEn] = useState("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");  
  const [descriptionEn, setDescriptionEn] = useState("");
  const [file, setFile] = useState(null);

  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");

  const handleImageUpload = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setImgSrc(url);
    setFile(img[0]);
  };

  const handleClose = () => {
    setOpen(false);
    setNameUz("");
    setNameRu("");
    setDescriptionUz("");
    setDescriptionRu("");
    setFile(null);
    setImgSrc("/img/empty-img.svg");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNews,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Yangilik qo'shildi");
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
    if (nameRu && nameUz && nameEn && descriptionUz && descriptionRu && descriptionEn && file) {
      const formData = new FormData();
      formData.append("new_title_uz", nameUz);
      formData.append("new_title_ru", nameRu);      
      formData.append("new_title_en", nameEn);
      formData.append("new_description_uz", descriptionUz);
      formData.append("new_description_ru", descriptionRu);      
      formData.append("new_description_en", descriptionEn);
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
        <DialogTitle id="alert-dialog-title">{`Yangilik qo'shish`}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <label
              className={`w-full  block p-4 border-2 rounded-md h-fit cursor-pointer`}
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
          </div>
        </DialogContent>

        <DialogActions>
          <Button disabled={isPending} onClick={handleClose}>Bekor qilish</Button>
          <Button disabled={isPending} onClick={handleSubmit}>{"Qo'shish"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(CreateNewsModal);
