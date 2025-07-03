import React, { useEffect, useState } from "react";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { FaSave } from "react-icons/fa";
import { GetAllPartSuppile } from "../../api/part_suppile";
import { GetAllFaculty } from "../../api/faculty";
import { BeatLoader } from "react-spinners";
import { GetAllDocIn, GetAllDocOut, InsertDocOut, SearchDocOut } from "../../api/document";
import { ToastError, ToastSuccess } from "../../lib/toast";
import { TimestampToDate } from "../../lib/date";
import ShowDoc from "./ShowDoc";
import { checkPermission } from "../../lib/checkpermission";
import ListDocOut from "../follow/ListDocOut";
const DocExport = () => {
  const [doc, setDoc] = useState({
    document_in_id: "",
    part_suppile_id: "",
    faculty_id: "",
  });
  const [docShow, setDocShow] = useState();
  const [docIn, setDocIn] = useState([]);
  const [docInCurrent, setDocInCurrent] = useState([]);
  const [numberID, setNumberID] = useState("");
  const [facultys, setFacultys] = useState([{ faculty_id: "", name: "" }]);
  const [partSuppiles, setPartSuppiles] = useState([
    { part_suppile_id: "", part_suppile_name: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  const [docsOut, setDocsOut] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resDocsIn, resFacultys, resPartSuppiles,resDocsOut] = await Promise.all([
        GetAllDocIn(),
        GetAllFaculty(),
        GetAllPartSuppile(),
        GetAllDocOut(),
      ]);
    
     
      // Nếu bất kỳ API nào trả về 403, thì dừng xử lý
      if (
        resDocsIn.status === 403 ||
        resFacultys.status === 403 ||
        resPartSuppiles.status === 403 || resDocsOut === 403
      ) {
        setIsForbidden(true); // Hoặc xử lý gì đó nếu không muốn render
        return;
      }

      // Nếu thành công thì cập nhật state
      if (resDocsIn.status === 200) {
        setDocIn(resDocsIn.data?.data);
      }
      if (resFacultys.status === 200) {
        setFacultys(resFacultys.data?.data);
      }
      if (resPartSuppiles.status === 200) {
        setPartSuppiles(resPartSuppiles.data?.data);
      }
      if (resDocsOut?.status === 200) {
        setDocsOut(resDocsOut?.data?.data);
      }
    } catch (error) {
      setIsForbidden(true); // Hoặc xử lý gì đó nếu không muốn render
      return;
    }
  };

  const handleNumberId = (e) => {
    const query = e.target.value;
    setNumberID(e.target.value);
    if (query !== "") {
      const findDocs = docIn.filter((item) =>
        item.numberID.toLowerCase().includes(query.toLowerCase())
      );
      if (findDocs) {
        setDocInCurrent(findDocs);
      }
    } else {
      setDocInCurrent([]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await InsertDocOut({
      document_in_id: doc.document_in_id,
      part_suppile_id: doc.part_suppile_id,
      faculty_id: doc.faculty_id,
    });
    if (res.status === 403) {
      ToastError("ບໍ່ມີສິດ");
    } else if (res.status === 201) {
      //get doc to show
      const res = await SearchDocOut(numberID);
      if (res.status === 200) {
        setDoc({
          document_in_id: "",
          part_suppile_id: "",
          faculty_id: "",
        });
        setDocInCurrent([]);
        setNumberID("");
        ToastSuccess("ເພີ່ມເອກະສານສຳເລັດ");
        setDocShow(res.data?.data);
        const res2 = await GetAllDocOut();
        if (res2?.status === 200) {
          setDocsOut(res2?.data?.data);
        }
      }
    } else {
      ToastError(res?.response?.data?.error);
    }
    setIsLoading(false);
  };

  const handleSelectDoc = (id, numberid) => {
    setDoc({ ...doc, document_in_id: id });
    setDocInCurrent([]);
    setNumberID(numberid);
  };
  if (!isForbidden && checkPermission("INSERT")) {
    return (
      <>
        <div className="mt-5 pb-3 w-full bg-white rounded-lg">
          <div className="flex justify-start items-center gap-3 p-3">
            <HiOutlineDocumentArrowDown size={20} className=" text-teal-500" />
            <span className=" text-teal-500 text-lg font-bold">
              {" "}
              ບັນທຶກເອກະສານ ຂາອອກ
            </span>
          </div>
          {/* main content */}
          <form onSubmit={handleSubmit}>
            <div className="mt-0 px-5">
              <div className="w-full ">
                <div className="mt-5 relative">
                  <p>ເລກທີເອກະສານຂາເຂົ້າ:</p>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="ເລກທີຂາເຂົ້າ"
                    value={numberID}
                    onChange={handleNumberId}
                    required
                  />
                  {docInCurrent.length > 0 && (
                    <div className=" absolute top-16 w-full p-1 z-50 bg-white rounded-lg shadow-lg border-2">
                      {docInCurrent.map((item) => (
                        <div
                          onClick={() =>
                            handleSelectDoc(item.document_in_id, item.numberID)
                          }
                          className="p-2 hover:bg-slate-200 flex justify-start gap-3"
                        >
                          <p className="w-[80px]">{item.numberID}</p>
                          <p className="w-[50px]">{item.title}</p>
                          <p className="w-[200px]">{item.name}</p>
                          <p className="w-[200px]">
                            {TimestampToDate(item.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className=" mt-5">
                  <p>ຄະນະ</p>
                  <select
                    value={doc.faculty_id}
                    onChange={(e) =>
                      setDoc({ ...doc, faculty_id: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option selected value="">
                      -- ເລືອກຄະນະ --
                    </option>
                    {facultys.map((item) => {
                      return (
                        <option value={item.faculty_id}>{item.name}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mt-5">
                  <p>ຜູ້ສະໜອງ</p>
                  <select
                    value={doc.part_suppile_id}
                    onChange={(e) =>
                      setDoc({ ...doc, part_suppile_id: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option selected value="">
                      -- ເລືອກຜູ້ຮັບ/ປາຍທາງ --
                    </option>
                    {partSuppiles.map((item) => {
                      return (
                        <option value={item.part_suppile_id}>
                          {item.part_suppile_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex justify-end items-center gap-3">
                {!isLoading ? (
                  <button
                    type="submit"
                    className=" flex justify-start items-center gap-1 bg-blue-500 p-2 text-white rounded-lg"
                  >
                    <FaSave />
                    <span className="mx-2">ບັນທຶກ</span>
                  </button>
                ) : (
                  <button>
                    <BeatLoader color="#14b8a6" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="mt-5 mb-5 pb-3 w-full bg-white rounded-lg">
        <div className="flex justify-start items-center gap-3 p-3">
          <HiOutlineClipboardDocumentList
            size={20}
            className=" text-teal-500"
          />
          <span className=" text-teal-500 text-lg font-bold">
            ລາຍການ ເອກະສານ ຂາອອກ
          </span>
        </div>
        <div className="mt-5 px-5 ">
          <ListDocOut props={docsOut} />
        </div>
      </div>
      </>
    );
  } else {
    return (
      <div className="text-red-500 text-center mt-10">
        ທ່ານບໍ່ມີສິດເຂົ້າເຖິງໜ້ານີ້ (403 Forbidden)
      </div>
    );
  }
};

export default DocExport;
