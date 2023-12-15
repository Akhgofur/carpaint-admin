import { createBrand } from "@/data/data.fn";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { memo, useState } from "react";
import { toast } from "react-toastify";

const CreateBrandModal = ({ open, setOpen, refetch }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  
  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");

  const handleImageUpload = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setImgSrc(url);
    setFile(img);
  };

  const handleClose = () => {
    setOpen(false);
    setName("")
    setFile(null);
    setImgSrc("/img/empty-img.svg");
  };

  const { mutate } = useMutation({
    mutationFn: createBrand,
    onSuccess: (data) => {
     

      if (data?.status == 200) {
        toast.success("Brand qo'shildi");
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
    if (name && file) {
      const formData = new FormData()

      formData.append("brand_name", name)
      formData.append("photo", file[0])

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
        <DialogTitle id="alert-dialog-title">{`Brand qo'shish`}</DialogTitle>
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label={"Nomi"}
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

export default memo(CreateBrandModal);
