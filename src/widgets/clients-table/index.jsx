import Table from "@/components/table";
import { clientsTableHeaders, partnersTableHeaders } from "@/utils/consts";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { memo, useState } from "react";
import DeleteModal from "@/components/delete-modal";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useClients, useNews } from "@/data/data.service";
import CreateClientModal from "@/components/create-client-modal";
import EditClientModal from "@/components/edit-client-modal";
import { deleteClient } from "@/data/data.fn";

const ClientsTable = () => {
  const [isDelete, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [client, setClient] = useState(null);
  const [view, setView] = useState(false);

  const { data, isLoading, refetch } = useClients();

  const handleDeleteClose = () => {
    setDelete(false);
    setClient(null);
  };

    const { mutate } = useMutation({
      mutationFn: deleteClient,
      onSuccess: (data) => {
        if (data?.status == 200) {
          toast.success("Klient o'chirildi");
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

    const handleDeleteClient = () => {
      mutate(client?.client_id);
    };

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh]">
          <CreateClientModal
            refetch={refetch}
            open={create}
            setOpen={setCreate}
          />
          <EditClientModal
            open={edit}
            setOpen={setEdit}
            client={client}
            setClient={setClient}
            refetch={refetch}
            setView={setView}
            view={view}
          />
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`${client?.client_name} ni o'chirishni hohlaysizmi`}
            handleSubmit={handleDeleteClient}
            open={isDelete}
          />
          <Table head={clientsTableHeaders}>
            {data?.data?.map((item, index) => (
              <tr key={item?.client_id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item?.client_name}</td>
                <td className="px-4 py-2">{item?.client_link}</td>
                <td className="px-4 py-2">
                  {new Date(item?.client_create_at)?.toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setView(true), setClient(item), setEdit(true);
                      }}
                    >
                      <MoreHorizIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setEdit(true), setClient(item);
                      }}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setDelete(true), setClient(item);
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
          {"Klient qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default memo(ClientsTable);
