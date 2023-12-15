import { Dialog, DialogTitle, DialogActions, Button }from "@mui/material"
import { memo } from "react";

const DeleteModal = ({ open, handleClose, title, handleSubmit }) => {
  return (
    <div className="">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xs"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Bekor qilish</Button>
          <Button color="error" onClick={handleSubmit}>{"O'chirish"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(DeleteModal)