import { createNews, editPartner } from "@/data/data.fn";
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

const EditPartnerModal = ({
  open,
  setOpen,
  refetch,
  partner,
  setPartner,
  view,
  setView,
}) => {
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
    setView(false);
    setImgSrc("/img/empty-img.svg");
    setPartner(null)
  };

  useMemo(() => {
    if (partner && open) {
      setName(partner?.partner_name);
      setLink(partner?.partner_link);
      setImgSrc(partner?.partner_images_url);
    }
  }, [partner, open]);

  const { mutate, isPending } = useMutation({
    mutationFn: editPartner,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Hamkor o'zgartirildi");
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
    if (link && name) {
      const formData = new FormData();

      formData.append("id", partner?.partner_id);
      formData.append("partner_name", name);
      formData.append("partner_link", link);
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
        <DialogTitle id="alert-dialog-title">
          {view ? "Hamkor" : `Hamkor o'zgartirish`}
        </DialogTitle>
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label={"Nomi"}
            />
            <TextField
              disabled={view}
              fullWidth
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              label={"Link"}
            />
          </div>
        </DialogContent>

        {view ? (
          <DialogActions>
            <Button onClick={handleClose}>Yopish</Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button disabled={isPending} onClick={handleClose}>
              Bekor qilish
            </Button>
            <Button disabled={isPending} onClick={handleSubmit}>
              {"O'zgartirish"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default memo(EditPartnerModal);
