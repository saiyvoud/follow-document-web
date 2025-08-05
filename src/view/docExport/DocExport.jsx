import React, { useEffect, useState } from "react";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { FaSave } from "react-icons/fa";
import { GetAllFaculty } from "../../api/faculty";
import { GetAllPartDemand } from "../../api/part_demand";

import { ToastError, ToastSuccess } from "../../lib/toast";
import { BeatLoader } from "react-spinners";
import ShowDoc from "./ShowDoc";
import { checkPermission } from "../../lib/checkpermission";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import ListDocOut from "../follow/ListDocOut";
import { InsertFollowDocumentIn } from "../../api/followDocumentIn";
import { FollowDocument } from "../../components/constants";
import { GetDocumentType } from "../../api/documentType";
import { GetAllDocOut, InsertDocOut, SearchDocOut } from "../../api/document";

const DocExport = () => {
  const [doc, setDoc] = useState({
    faculty_id: "",
    files: "",
    name: "",
    numberID: "",
    part_demand_id: "",
    part_demand_name: "",
    destinationName: "",
    destinationNumber: "",
    sendDoc: "",
    phoneNumber: "",
    contactName: "",
    contactNumber: "",
    docType: "",
    date: "",
    description: "",
    status: "",
    title: "",
  });
  console.log(doc);
  const [docShow, setDocShow] = useState();
  const [facultys, setFacultys] = useState([{ faculty_id: "", name: "" }]);
  const [partDemands, setPartDemands] = useState([
    { part_demand_id: "", part_demand_name: "" },
  ]);
  const [file, setFile] = useState(null);
  const [fileShow, setFileShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  const [docsOut, setDocsOut] = useState([]);
  const [docType, setDocsType] = useState([]);
  const [docNumber, setDocNumber] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (doc.numberID != "") {
      search();
    } else {
      setDocNumber([]);
    }
  }, [doc.numberID]);

  const search = async () => {
    const result = await SearchDocOut(doc.numberID);
    if (result.status === 200) setDocNumber(result.data?.data);
    console.log(result);
  };
  const fetchData = async () => {
    try {
      const [res1, res2, res3, res4] = await Promise.all([
        GetAllFaculty(),
        GetAllPartDemand(),
        GetAllDocOut(),
        GetDocumentType(),
      ]);

      if (res1.status === 403 || res2.status === 403) {
        setIsForbidden(true);
        return;
      }
      const resDocsOut = await GetAllDocOut();
      if (resDocsOut?.status === 200) {
        setDocsOut(resDocsOut?.data?.data);
      }

      if (res1.status === 200) setFacultys(res1?.data?.data);
      if (res2.status === 200) setPartDemands(res2?.data?.data);
      if (res3.status === 200) setDocsOut(res3?.data?.data);
      if (res4.status === 200) setDocsType(res4?.data?.data);
      console.log(res3);
    } catch (error) {
      setIsForbidden(true);
      return;
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await InsertDocOut(
      doc.title,
      doc.faculty_id,
      file,
      doc.numberID,
      doc.contactName,
      doc.contactNumber,
      doc.date,
      doc.description,
      doc.destinationName,
      doc.destinationNumber,
      doc.sendDoc,
      doc.docType
    );
    if (res.status === 201) {
      ToastSuccess("ເພີ່ມເອກະສານສຳເລັດ");

      //get doc to show
      const res = await SearchDocOut(doc.numberID);
      if (res.status === 200) {
        window.location.reload();
        setDoc({
          faculty_id: "",
          files: "",
          name: "",
          numberID: "",
          part_demand_id: "",
          part_demand_name: "",
          phoneNumber: "",
          contactName: "",
          contactNumber: "",
          docType: "",
          date: "",
          status: "",
          description: "",
          title: "",
        });
        setFile(null);
        setDocShow(res.data?.data);
        const res4 = await GetAllDocOut();
        console.log(res4.data.data);
        if (res4.status === 200) setDocsOut(res4?.data?.data);
      }
    } else {
      ToastError(res?.response?.data?.error);
    }
    setIsLoading(false);
  };
  return (
    <>
      {!isForbidden && checkPermission("INSERT") && (
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
              <div className="flex justify-between items-start gap-10">
                {/* left content */}
                <div className="w-full">
                  <div className="mt-5 relative">
                    <p>ເລກທີເອກະສານຂາອອກ:</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        setDoc({ ...doc, numberID: e.target.value })
                      }
                      value={doc.numberID}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="ເລກທີເອກະສານຂາອອກ"
                      required
                    />
                    {docNumber.length > 0 && (
                      <div className=" bg-white shadow-lg  absolute top-10 p-2 left-20 rounded-lg">
                        {docNumber.map((item) => (
                          <p
                            className="hover:bg-slate-600"
                            onClick={() => {
                              setDoc({ ...doc, numberID: item.numberID });
                              setDocNumber([])
                            }}
                          >
                            {" "}
                            {item.numberID}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className=" mt-5 flex gap-3">
                    <div className="w-full">
                      <p>ຊື່ເອກະສານ:</p>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="ຊື່ເອກະສານ"
                        onChange={(e) =>
                          setDoc({ ...doc, title: e.target.value })
                        }
                        value={doc.title}
                        required
                      />
                    </div>
                  </div>
                  <div className=" mt-5 flex gap-3">
                    <div className="w-full">
                      <p>ຄຳອະທິບາຍເອກະສານ:</p>
                      <textarea
                        rows={5}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="ຄຳອະທິບາຍເອກະສານ"
                        onChange={(e) =>
                          setDoc({ ...doc, description: e.target.value })
                        }
                        value={doc.description}
                        required
                      />
                    </div>
                  </div>
                  <div className=" mt-5 flex gap-3">
                    <div className="w-full">
                      <p>ວັນທີ່ສົ່ງເອກະສານ:</p>
                      <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="ຄຳອະທິບາຍເອກະສານ"
                        onChange={(e) =>
                          setDoc({ ...doc, date: e.target.value })
                        }
                        value={doc.date}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* right content */}
                <div className="w-full">
                  <div className=" mt-5">
                    <p>ໄຟລແນບ</p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full border border-gray-300 p-2"
                      required
                    />
                  </div>
                  <div className=" mt-5">
                    <p>ປະເພດເອກະສານ</p>
                    <select
                      value={doc.docType}
                      onChange={(e) =>
                        setDoc({ ...doc, docType: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option selected value="">
                        -- ເລືອກ --
                      </option>
                      {docType.map((item, index) => {
                        return (
                          <option
                            key={index}
                            selected
                            value={item.document_type_id}
                          >
                            {item.docName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className=" mt-5">
                    <p>ພາກສ່ວນ</p>
                    <select
                      value={doc.faculty_id}
                      onChange={(e) =>
                        setDoc({ ...doc, faculty_id: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option selected value="">
                        -- ພາກສ່ວນ 13ຄະນະ ຫ້ອງການ ພາກສ່ວນນອກ --
                      </option>
                      {facultys.map((item) => {
                        return (
                          <option value={item.faculty_id}>{item.name}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className=" mt-5">
                    <p>ສົ່ງຕໍ່ຫາໃຜ</p>
                    <select
                      value={doc.sendDoc}
                      onChange={(e) =>
                        setDoc({ ...doc, sendDoc: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option selected value="ເລຂາອະທິການ">
                        ເລຂາອະທິການ
                      </option>
                      {facultys.map((item) => {
                        return <option value={item.name}>{item.name}</option>;
                      })}
                    </select>
                  </div>

                  <div className=" mt-5 flex gap-3">
                    <div className="w-full">
                      <p>ຂໍ້ມູນຜູ້ຮັບເອກະສານ:</p>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="ຊື່ແລະນາມສະກຸນ"
                        onChange={(e) =>
                          setDoc({ ...doc, destinationName: e.target.value })
                        }
                        value={doc.destinationName}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <p>ຂໍ້ມູນຕິດຕໍ່ຜູ້ຮັບ:</p>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="ເບີໂທ 20 30"
                        onChange={(e) =>
                          setDoc({ ...doc, destinationNumber: e.target.value })
                        }
                        value={doc.destinationNumber}
                        required
                      />
                    </div>
                  </div>
                  <div className=" mt-5 flex gap-3">
                    <div className="w-full">
                      <p>ຂໍ້ມູນຜູ້ສົ່ງເອກະສານ:</p>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="ຊື່ແລະນາມສະກຸນ"
                        onChange={(e) =>
                          setDoc({ ...doc, contactName: e.target.value })
                        }
                        value={doc.contactName}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <p>ຂໍ້ມູນຕິດຕໍ່ຜູ້ສົ່ງ:</p>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="ເບີໂທ 20 30"
                        onChange={(e) =>
                          setDoc({ ...doc, contactNumber: e.target.value })
                        }
                        value={doc.contactNumber}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end items-center gap-3">
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
      )}
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
  // if () {

  // } else {
  //   return (
  //     <div className="text-red-500 text-center mt-10">
  //       ທ່ານບໍ່ມີສິດເຂົ້າເຖິງໜ້ານີ້ (403 Forbidden)
  //     </div>
  //   );
  // }
};

export default DocExport;

// <div className="mt-5">
// <p>ຜູ້ຮັບຜິດຊອບ</p>
// <select
//   value={doc.part_demand_id}
//   onChange={(e) =>
//     setDoc({ ...doc, part_demand_id: e.target.value })
//   }
//   className="w-full border border-gray-300 rounded-md p-2"
//   required
// >
//   <option selected value="">
//     -- ເລືອກຜູ້ຮັບຜິດຊອບ --
//   </option>
//   {partDemands.map((item) => {
//     return (
//       <option value={item.part_demand_id}>
//         {item.part_demand_name}
//       </option>
//     );
//   })}
// </select>
// </div>
