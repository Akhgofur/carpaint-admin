import {  createClient, createNews } from "@/data/data.fn";
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

const CreateClientModal = ({ open, setOpen, refetch }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState("");

  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");

  const handleImageUpload = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setImgSrc(url);
    setFile(img[0]);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setLink("");
    setFile(null);
    setImgSrc("/img/empty-img.svg");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createClient,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Klient qo'shildi");
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
      const formData = new FormData();



      formData.append("photo", file);
      formData.append("client_name", name);
      formData.append("client_link", link);

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
        <DialogTitle id="alert-dialog-title">{`Klient qo'shish`}</DialogTitle>
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
            <TextField
              fullWidth
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              label={"Link"}
            />

           
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

export default memo(CreateClientModal);
