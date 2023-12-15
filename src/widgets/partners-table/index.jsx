import Table from "@/components/table";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  clientsTableHeaders,
  newsTableHeaders,
  partnersTableHeaders,
} from "@/utils/consts";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { useNews, usePartners } from "@/data/data.service";
import CreatePartnerModal from "@/components/create-partner-modal";
import EditPartnerModal from "@/components/edit-partner-modal";
import { deletePartner } from "@/data/data.fn";
import { useMutation } from "@tanstack/react-query";
import DeleteModal from "@/components/delete-modal";
import { toast } from "react-toastify";

const PartnersTable = () => {
  const [isDelete, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [partner, setPartner] = useState(null);
  const [view, setView] = useState(false);

  const { data, isLoading, refetch } = usePartners();

  const handleDeleteClose = () => {
    setDelete(false);
    setPartner(null);
  };

    const { mutate } = useMutation({
      mutationFn: deletePartner,
      onSuccess: (data) => {
        console.log(data, "sa");
        if (data?.status == 200) {
          console.log("why");
          toast.success("Hamkor o'chirildi");
          refetch();
          handleDeleteClose();
        } else {
          toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
        }
      },
      onError: (err) => {
        toast.error("Xatolik yuz berdi qaytadan urinib ko'ring");
      },
    });

    const handleDeletePartner = () => {
      mutate(partner?.partner_id);
    };

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh]">
          <CreatePartnerModal
            refetch={refetch}
            open={create}
            setOpen={setCreate}
          />
          <EditPartnerModal
            open={edit}
            setOpen={setEdit}
            partner={partner}
            setPartner={setPartner}
            refetch={refetch}
            setView={setView}
            view={view}
          />
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`${partner?.partner_name} ni o'chirishni hohlaysizmi`}
            handleSubmit={handleDeletePartner}
            open={isDelete}
          />
          <Table head={clientsTableHeaders}>
            {data?.data?.map((item, index) => (
              <tr key={item?.partner_id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item?.partner_name}</td>
                <td className="px-4 py-2">{item?.partner_link}</td>
                <td className="px-4 py-2">
                  {new Date(item?.partner_create_at)?.toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setView(true), setPartner(item), setEdit(true);
                      }}
                    >
                      <MoreHorizIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setEdit(true), setPartner(item);
                      }}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setDelete(true), setPartner(item);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="outlined"
          onClick={() => {
            setCreate(true);
          }}
        >
          {"Hamkor qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default memo(PartnersTable);
