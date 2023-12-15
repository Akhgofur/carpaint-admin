import { createNews, editNews } from "@/data/data.fn";
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
import { memo, useMemo, useState } from "react";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditNewsModal = ({
  open,
  setOpen,
  refetch,
  currentNews,
  setCurrentNews,
  view,
  setView,
}) => {
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");  
  const [nameEn, setNameEn] = useState("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");  
  const [descriptionEn, setDescriptionEn] = useState("");
  const [file, setFile] = useState("");

  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");

  const handleImageUpload = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setImgSrc(url);
    setFile(img);
  };

  useMemo(() => {
    if (currentNews && open) {
      setNameUz(currentNews?.new_title_uz);
      setNameRu(currentNews?.new_title_ru);      
      setNameEn(currentNews?.new_title_en);
      setDescriptionUz(currentNews?.new_description_uz);
      setDescriptionRu(currentNews?.new_description_ru);      
      setDescriptionEn(currentNews?.new_description_en);
      setImgSrc(currentNews?.new_image);
    }
  }, [currentNews, open]);

  const handleClose = () => {
    setOpen(false);
    setNameUz("");
    setNameRu("");
    setDescriptionUz("");
    setDescriptionRu("");
    setFile(null);
    setImgSrc("/img/empty-img.svg");
    setView(false);
    setCurrentNews(null);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: editNews,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Yangilik o'zgartirildi");
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
    if (nameRu && nameUz && descriptionUz && descriptionRu) {
      const formData = new FormData();

      formData.append("new_title_uz", nameUz);
      formData.append("new_title_ru", nameRu);      
      formData.append("new_title_en", nameEn);
      formData.append("new_description_uz", descriptionUz);
      formData.append("new_description_ru", descriptionRu);      
      formData.append("new_description_en", descriptionEn);
      formData.append("id", currentNews?.new_id);
      if (file) {
        formData.append("photo", file[0]);
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
        <DialogTitle id="alert-dialog-title">{`Yangilik o'zgartirish`}</DialogTitle>
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
                disabled={view}
              />
            </label>

            <TextField
              fullWidth
              value={nameUz}
              disabled={view}
              onChange={(e) => {
                setNameUz(e.target.value);
              }}
              label={"Nomi uz"}
            />
            <TextField
              fullWidth
              value={nameRu}
              disabled={view}
              onChange={(e) => {
                setNameRu(e.target.value);
              }}
              label={"Nomi ru"}
            />
             <TextField
              fullWidth
              value={nameEn}
              disabled={view}
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
                readOnly={view}
              />
            </div>
            <div className="py-4">
              <ReactQuill
                value={descriptionRu}
                onChange={(e) => {
                  setDescriptionRu(e);
                }}
                placeholder="Haqida ru"
                readOnly={view}
              />
            </div>
            <div className="py-4">
              <ReactQuill
                value={descriptionEn}
                onChange={(e) => {
                  setDescriptionEn(e);
                }}
                placeholder="Haqida en"
                readOnly={view}
              />
            </div>
          </div>
        </DialogContent>

        {view ? (
          <DialogActions>
            <Button onClick={handleClose}>Yopish</Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button disabled={isPending} onClick={handleClose}>Bekor qilish</Button>
            <Button disabled={isPending} onClick={handleSubmit}>{"O'zgartirish"}</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default memo(EditNewsModal);
