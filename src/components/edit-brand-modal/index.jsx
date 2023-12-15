import { editBrand } from "@/data/data.fn";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { memo, useMemo, useState } from "react";
import { toast } from "react-toastify";

const EditBrandModal = ({
  open,
  setOpen,
  refetch,
  brand,
  setBrand,
  view,
  setView,
}) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");

  useMemo(() => {
    if (brand && open) {
      setName(brand?.brand_name);
      setImgSrc(brand?.brand_images_url);
    }
  }, [brand, open]);

  const handleImageUpload = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setImgSrc(url);
    setFile(img);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setFile(null);
    setImgSrc("/img/empty-img.svg");
    setBrand(null);
    setView(false);
  };

  const { mutate } = useMutation({
    mutationFn: editBrand,
    onSuccess: (data) => {
      

      if (data?.status == 200) {
        toast.success("Brand o'zgartirildi");
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
    if (name) {
      const formData = new FormData();

      formData.append("brand_name", name);
      formData.append("photo", file ? file[0] : brand?.photo);
      formData.append("id", brand?.brand_id);

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
        <DialogTitle id="alert-dialog-title">{`Brand o'zgartirish`}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <label
              className={`w-full  block p-4 border-2 rounded-md h-fit ${
                view ? "" : "cursor-pointer"
              }`}
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label={"Nomi"}
              disabled={view}
            />
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

export default memo(EditBrandModal);
