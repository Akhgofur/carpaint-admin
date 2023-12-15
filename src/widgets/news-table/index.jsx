import Table from "@/components/table";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { newsTableHeaders } from "@/utils/consts";
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
import DeleteModal from "@/components/delete-modal";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNews } from "@/data/data.service";
import { deleteNews } from "@/data/data.fn";
import CreateNewsModal from "@/components/create-news-modal";
import EditNewsModal from "@/components/edit-news-modal";

const NewsTable = () => {
  const [isDelete, setDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [view, setView] = useState(false);

  // const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(10);
  const [offsetNum, setOffsetNum] = useState(1);

  const { data, isLoading, refetch } = useNews({ limit, page: offsetNum});


  const handleDeleteClose = () => {
    setDelete(false);
    setCurrentNews(null);
  };

  const { mutate } = useMutation({
    mutationFn: deleteNews,
    onSuccess: (data) => {
      if (data?.status == 200) {
        toast.success("Yangilik o'chirildi");
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

  const handleDeleteNews = () => {
    mutate(currentNews?.new_id);
  };

  const handleRefetch = () => setTimeout(() => refetch(), 0);

  return (
    <div className="text-center flex flex-col gap-4 justify-between h-full pt-[20px] pb-[70px]  ">
      <div className="w-full overflow-x-auto ">
        <div className="min-w-[1000px] lg:min-w-fit h-[70vh]">
          <CreateNewsModal
            refetch={refetch}
            open={create}
            setOpen={setCreate}
          />
          <EditNewsModal
            open={edit}
            setOpen={setEdit}
            currentNews={currentNews}
            setCurrentNews={setCurrentNews}
            refetch={refetch}
            setView={setView}
            view={view}
          />
          <DeleteModal
            handleClose={handleDeleteClose}
            title={`${currentNews?.new_title_uz} ni o'chirishni hohlaysizmi`}
            handleSubmit={handleDeleteNews}
            open={isDelete}
          />
          <Table head={newsTableHeaders}>
            {data?.data?.map((item, index) => (
              <tr key={item?.new_id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item?.new_title_uz}</td>
                <td className="px-4 py-2">{item?.new_title_ru}</td>
                <td className="px-4 py-2">
                  {new Date(item?.new_create_date)?.toLocaleDateString()}
                </td>
                {/* <td className="px-4 py-2"></td> */}
                {/* <td className="px-4 py-2">
                </td> */}
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setView(true), setCurrentNews(item), setEdit(true);
                      }}
                    >
                      <MoreHorizIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setEdit(true), setCurrentNews(item);
                      }}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setDelete(true), setCurrentNews(item);
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              onClick={() => {
                setOffsetNum((e) => e - 1);
                handleRefetch();
              }}
              disabled={offsetNum == 1}
            >
              <NavigateNextIcon className="rotate-180" />
            </Button>
            <Typography>{offsetNum}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setOffsetNum((e) => e + 1);
                handleRefetch();
              }}
            >
              <NavigateNextIcon />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">limit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="Age"
                onChange={(e) => {
                  setLimit(e.target.value);
                  setOffsetNum(1);

                  handleRefetch();
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={70}>70</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
          variant="outlined"
          onClick={() => {
            setCreate(true);
          }}
        >
          {"Yangilik qo'shish"}
        </Button>
      </div>
    </div>
  );
};

export default memo(NewsTable);
