import { createNews, createPartner } from "@/data/data.fn";
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

const CreatePartnerModal = ({ open, setOpen, refetch }) => {
  const [name, setName] = useState("");
  const [productTitleUz, setProductTitleUz] = useState("");
  const [productTitleRu, setProductTitleRu] = useState("");
  const [productTitleEn, setProductTitleEn] = useState("");
  const [productDescUz, setProductDescUz] = useState("");
  const [productDescRu, setProductDescRu] = useState("");
  const [productDescEn, setProductDescEn] = useState("");
  const [file, setFile] = useState("");
  const [filePartner, setFilePartner] = useState("");

  const [imgSrc, setImgSrc] = useState("/img/empty-img.svg");
  const [imgSrcPartner, setImgSrcPartner] = useState("/img/empty-img.svg");

  const handleImageUpload = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setImgSrc(url);
    setFile(img[0]);
  };
  const handleImageUploadPartner = (e) => {
    const img = e.target.files;
    const url = URL.createObjectURL(img[0]);
    setImgSrcPartner(url);
    setFilePartner(img[0]);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setFile(null);
    setFilePartner(null)
    setProductTitleUz("")
    setProductTitleRu("")
    setProductTitleEn("")
    setProductDescUz("")
    setProductDescRu("")
    setProductDescEn("")
    setImgSrc("/img/empty-img.svg");
    setImgSrcPartner("/img/empty-img.svg");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createPartner,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Hamkor qo'shildi");
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
    if (
      name &&
      file &&
      filePartner &&
      productTitleUz &&
      productTitleRu &&
      productTitleEn &&
      productDescUz &&
      productDescRu &&
      productDescEn
    ) {
      const formData = new FormData();

      formData.append("photo", file);
      formData.append("logo", filePartner);
      formData.append("partner_name", name);
      formData.append("product_title_uz", productTitleUz);
      formData.append("product_title_ru", productTitleRu);
      formData.append("product_title_en", productTitleEn);
      formData.append("product_description_uz", productDescUz);
      formData.append("product_description_ru", productDescRu);
      formData.append("product_description_en", productDescEn);

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
        <DialogTitle id="alert-dialog-title">{`Hamkor qo'shish`}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-2">
            <div className="">
              <Typography mb={2}>Product Photo</Typography>
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
            </div>
            <div className="">
              <Typography mb={2}>Hamkor logo</Typography>
              <label
                className={`w-full  block p-4 border-2 rounded-md h-fit cursor-pointer`}
              >
                <img
                  src={imgSrcPartner}
                  alt=""
                  className="  h-[180px] smd:h-[250px]  rounded-md w-full object-contain"
                />
                <input
                  onChange={handleImageUploadPartner}
                  type="file"
                  accept="image/*"
                  className="w-0 h-0 overflow-hidden"
                />
              </label>
            </div>

            <TextField
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label={"Hamkor nomi"}
            />
            <TextField
              fullWidth
              value={productTitleUz}
              onChange={(e) => {
                setProductTitleUz(e.target.value);
              }}
              label={"Product nomi uz"}
            />
            <TextField
              fullWidth
              value={productTitleRu}
              onChange={(e) => {
                setProductTitleRu(e.target.value);
              }}
              label={"Product nomi ru"}
            />
            <TextField
              fullWidth
              value={productTitleEn}
              onChange={(e) => {
                setProductTitleEn(e.target.value);
              }}
              label={"Product nomi en"}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              value={productDescUz}
              onChange={(e) => {
                setProductDescUz(e.target.value);
              }}
              label={"Product haqida uz"}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              value={productDescRu}
              onChange={(e) => {
                setProductDescRu(e.target.value);
              }}
              label={"Product haqida ru"}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              value={productDescEn}
              onChange={(e) => {
                setProductDescEn(e.target.value);
              }}
              label={"Product haqida en"}
            />
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

export default memo(CreatePartnerModal);
