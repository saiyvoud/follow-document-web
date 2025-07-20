import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TimestampToDate } from "../../lib/date";
import { GetAllFaculty } from "../../api/faculty";
import { GetAllPartDemand } from "../../api/part_demand";
import {
  DeleteDocOut,
  UpdateDocOut,
  UpdateDocOutStatus,
} from "../../api/document";
import { ToastError, ToastSuccess } from "../../lib/toast";
import Swal from "sweetalert2";
import { GetDocumentType } from "../../api/documentType";
import { FollowDocument } from "../../api/constrant";

const EditDocOut = () => {
  const { data } = useParams();
  const navigate = useNavigate();
  const decodedStr = decodeURIComponent(atob(data));
  const decodedObj = JSON.parse(decodedStr);
  console.log(decodedObj);
  const [doc, setDoc] = useState({
    document_out_id: "",
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
    docName: "",
    document_type_id: "",
    date: "",
    description: "",
    status: "",
    title: "",
  });
  const [facultys, setFacultys] = useState([{ faculty_id: "", name: "" }]);
  const [partDemands, setPartDemands] = useState([
    { part_demand_id: "", part_demand_name: "" },
  ]);
  const [docType, setDocumentType] = useState([
    { document_type_id: "", docName: "" },
  ]);
  useEffect(() => {
    setDoc(decodedObj);
    fetchData();
  }, []);
  const fetchData = async () => {
    const res1 = await GetAllFaculty();
    if (res1.status === 200) {
      setFacultys(res1?.data?.data);
    }
    const res2 = await GetAllPartDemand();
    if (res2.status === 200) {
      setPartDemands(res2?.data?.data);
    }
    const res3 = await GetDocumentType();
    if (res3.status === 200) {
      setDocumentType(res3?.data?.data);
    }
  };
  const handleSubmit = async () => {
    Swal.fire({
      icon: "question",
      title: "ອັບເດດເອກະສານ",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //update data
        const dataUpdate = {
          title: doc.title,
          faculty_id: doc.faculty_id,
          numberID: doc.numberID,
          contactName: doc.contactName,
          contactNumber: doc.contactNumber,
          date: doc.date,
          description: doc.description,
          destinationName: doc.destinationName,
          destinationNumber: doc.destinationNumber,
          sendDoc: doc.sendDoc,
          document_type_id: doc.document_type_id,
          statusOut: doc.status,
        };
        const update = await UpdateDocOut(doc.document_out_id, dataUpdate);

        if (update.status === 200) {
          ToastSuccess("ອັບເດດສຳເລັດ");
          navigate("/doc-export");
        }
        if (update.status === 403) {
          ToastError("ບໍ່ມີສິດ");
        }
      }
    });
  };
  const handleDelete = async () => {
    Swal.fire({
      icon: "question",
      title: "ລົບເອກະສານ",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //delete doc
        await DeleteDocOut(doc.document_out_id);
        ToastSuccess("ລົບສຳເລັດ");
        navigate("/doc-export");
      }
    });
  };
  console.log(doc);
  return (
    <div className="mt-5 pb-3 w-full bg-white rounded-lg">
      <div className="flex justify-start items-center gap-3 p-3">
        <MdEdit size={20} className=" text-teal-500" />
        <span className=" text-teal-500 text-lg font-bold">
          {" "}
          ແກ້ໄຂເອກະສານ ຂາເຂົ້າ
        </span>
      </div>
      {/* main content */}
      <div className="mt-0 px-5">
        <div className="flex justify-between items-start gap-10">
          {/* left content */}
          <div className="w-full">
            <div className="mt-5">
              <p>ເລກທີ:</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="ເລກທີ"
                value={doc?.numberID}
                onChange={(e) => setDoc({ ...doc, numberID: e.target.value })}
              />
            </div>
            <div className=" mt-5 flex gap-3">
              <div className="w-full">
                <p>ວັນທີຮັບເອກະສານ</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={TimestampToDate(doc?.date)}
                  readOnly
                />
              </div>
            </div>

            <div className=" mt-5 flex gap-3">
              <div className="w-full">
                <p>ຊື່ເອກະສານ</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder=""
                  value={doc.title}
                  onChange={(e) => setDoc({ ...doc, title: e.target.value })}
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

            <div className=" mt-5">
              <p>ປະເພດເອກະສານ</p>
              <select
                value={doc.document_type_id}
                onChange={(e) =>
                  setDoc({ ...doc, document_type_id: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option selected value="">
                  -- ເລືອກ --
                </option>
                {docType.map((item, index) => {
                  return (
                    <>
                      {item.document_type_id === doc.document_type_id ? (
                        <option
                          key={index}
                          selected
                          value={item.document_type_id}
                        >
                          {item.docName}
                        </option>
                      ) : (
                        <option key={index} value={item.document_type_id}>
                          {item.docName}
                        </option>
                      )}
                    </>
                  );
                })}
              </select>
            </div>
            <div className=" mt-5">
              <p>ພາກສ່ວນ</p>
              <select
                onChange={(e) => setDoc({ ...doc, faculty_id: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option selected value={decodedObj.faculty_id}>
                  {decodedObj.name}
                </option>
                {facultys.map((item) => {
                  if (decodedObj.faculty_id !== item.faculty_id) {
                    return <option value={item.faculty_id}>{item.name}</option>;
                  }
                })}
              </select>
            </div>
            <div className=" mt-5">
              <p>ສົ່ງຕໍ່ຫາໃຜ</p>
              <select
                value={doc.sendDoc}
                onChange={(e) => setDoc({ ...doc, sendDoc: e.target.value })}
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
                <p>ຂໍ້ມູນຕິດຕໍ່:</p>
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

            <div className=" mt-5 flex justify-between gap-3">
              <div className="w-full">
                <p>ຂໍ້ມູນຜູ້ຮັບ</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={doc.destinationName}
                  readOnly
                />
              </div>
              <div className="w-full">
                <p>ຂໍ້ມູນຕິດຕໍ່</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={doc.destinationNumber}
                  readOnly
                />
              </div>
            </div>
          </div>
          {/* right content */}
          <div className="w-full h-full">
            <div className=" mt-5">
              <p>ໄຟລແນບ</p>
              <iframe
                title="file"
                className="w-full h-[300px] "
                src={doc.files}
              />
            </div>
            <div className=" mt-5">
              <p>ສະຖານະ</p>
              <select
                onChange={(e) => setDoc({ ...doc, status: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option selected value={decodedObj.status}>
                  {decodedObj.status}
                </option>
                <option value={FollowDocument.await}>
                  {FollowDocument.await}
                </option>
                <option value={FollowDocument.progress}>
                  {FollowDocument.progress}
                </option>
                <option value={FollowDocument.padding}>
                  {FollowDocument.padding}
                </option>
                <option value={FollowDocument.continue}>
                  {FollowDocument.continue}
                </option>
                <option value={FollowDocument.success}>
                  {FollowDocument.success}
                </option>
                <option value={FollowDocument.done}>
                  {FollowDocument.done}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-end items-center gap-3">
          <button
            onClick={handleSubmit}
            className=" flex justify-start items-center gap-1 bg-blue-500 p-2 text-white rounded-lg"
          >
            <FaSave />
            <span className="mx-2">ບັນທຶກ</span>
          </button>
          <button
            onClick={handleDelete}
            className=" flex justify-start items-center gap-1 bg-red-500 p-2 text-white rounded-lg"
          >
            <MdDelete />
            <span className="mx-2">ລົບ</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className=" flex justify-start items-center gap-1 bg-slate-400 p-2 text-white rounded-lg"
          >
            <span className="mx-2">ປິດ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDocOut;
