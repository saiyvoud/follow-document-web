import React from "react";
import { User } from "lucide-react";
import { Dashboard } from "../../api/dashboard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { TimestampToDate } from "../../lib/date";
import { NavLink } from "react-router-dom";
import { GetAllDocIn, GetAllDocOut } from "../../api/document";
import ListDocIn from "../follow/ListDocIn";
import { ExportToXLSX } from "./exportCSV";
import { checkPermission } from "../../lib/checkpermission";
import { ConvertStatus } from "../../api/constrant";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportView = () => {
  const [data, setData] = React.useState();
  const [active, setActive] = React.useState(0);
  const [docIn, setDocIn] = React.useState([]);
  const [docOut, setDocOut] = React.useState([]);
  const [date_start, setDateStart] = React.useState("");
  const [date_end, setDateEnd] = React.useState("");
  const [docExport, setDocExport] = React.useState([]);
  React.useEffect(() => {
    fetchdata();
  }, []);

  React.useEffect(() => {
    if (date_start && date_end) {
      const start = new Date(date_start).setHours(0, 0, 0, 0);
      const end = new Date(date_end).setHours(23, 59, 59, 999);
      setDocExport(prev =>
        prev.filter(item => {
          const created = new Date(item.date).getTime();
          return created >= start && created <= end;
        })
      );
    } else {
      if (active === 0) {
        fechDocIn();
      } else if (active === 1) {
        fechDocOut();
      } else if (active === 2) {
        fechDocAwait();
      } else if (active === 3) {
        fechDocAll();
      }
    }
  }, [date_start, date_end]);
  React.useEffect(() => {
    if (active === 0) {
      fechDocIn();
    } else if (active === 1) {
      fechDocOut();
    } else if (active === 2) {
      fechDocAwait()
    } else if (active === 3) {
      fechDocAll()
    }
  }, [active]);

  const fechDocIn = async () => {
    const res = await GetAllDocIn();
    if (res?.status === 200) {
      if (res?.data?.data.length > 0) {
        setDocIn(res?.data?.data);

        setDocExport(res?.data?.data);
      } else {
        setDocExport([]);
      }
      console.log(res);
    }
    else {
      setDocExport([]);
    }
  };
  const fechDocOut = async () => {
    const res = await GetAllDocOut();
    if (res?.status === 200) {
      if (res?.data?.data.length > 0) {
        console.log(res);
        setDocOut(res?.data?.data);
        setDocExport(res?.data?.data);
      } else {
        setDocExport([]);
      }
    } else {
      setDocExport([]);
    }
  };
  const fechDocAwait = async () => {
    const res1 = await GetAllDocOut();
    const res2 = await GetAllDocIn();
    if (res1 && res2) {
      const docOut = res1?.data?.data.filter(item => item.statusOut !== "ມາຮັບເອກະສານແລ້ວ");
      const docIn = res2?.data?.data.filter(item => item.status !== "ມາຮັບເອກະສານແລ້ວ");

      if (docOut || docIn) {
        setDocExport([...docOut, ...docIn]);
      } else {
        setDocExport([]);
      }
    }
  };
  const fechDocAll = async () => {
    const res1 = await GetAllDocOut();
    const res2 = await GetAllDocIn();
    if (res1 && res2) {
      const data = res1?.data?.data.concat(res2?.data?.data);
      setDocExport(data);
    }
  };
  const fetchdata = async () => {
    const res = await Dashboard();
    // console.log(res);
    if (res.status === 200) {
      setData(res.data.data);
      // setDocExport(res?.data?.data);

    }
  };
  // console.log(data);
  const listData = [
    "ລາຍງານເອກະສານຂາເຂົ້າ",
    "ລາຍງານເອກະສານຂາອອກ",
    "ລາຍງານເອກະສານ ຄ້າງອະນຸມັດ",
    "ລາຍງານເອກະສານທັງຫມົດ",
  ];



  const handleExport = async () => {
    const data = [];
    for (const i of docExport) {

      const x = {
        "ເລກທີ່ເອກະສານ": i.numberID,
        "ຊື່ເອກະສານ": i.title,
        "ຄຳອະທິບາຍເອກະສານ": i.description,
        "ວັນທີ່ສົ່ງເອກະສານ": i.date,
        "ປະເພດເອກະສານ": i.docName,
        "ພາກສ່ວນ": i.name,
        "ສົ່ງຕໍ່ຫາໃຜ": i.name,
        "ຂໍ້ມູນຜູ້ຮັບ": i.destinationNumber,
        "ຂໍ້ມູນຕິດຕໍ່ຜູ້ຮັບ": i.destinationNumber,
        "ຂໍ້ມູນຜູ້ສົ່ງ": i.contactNumber,
        "ຂໍ້ມູນຕິດຕໍ່ຜູ້ສົ່ງ": i.contactNumber,
        "ສະຖານະ": i.status || i.statusOut,
        "ວັນທີ່ສ້າງ": TimestampToDate(i.createdAt),
        "ວັນທີ່ອັບເດດ": TimestampToDate(i.updatedAt)
      }
      data.push(x);
    }
    ExportToXLSX(data, listData[0]);
  };
  return (
    <div className="bg-gray-300 ">
      <div className="w-full bg-slate-800 h-20 rounded-xl mt-5 flex justify-center items-center">
        <h1 className="text-white text-xl font-semibold">ລາຍງານ</h1>
      </div>
      {/* Card backgroud */}

      <div className="flex space-x-5 justify-center items-center py-5">
        <div
          onClick={() => {
            setActive(0);
          }}
          className={`w-full  p-4 rounded-lg border-2 border-black  ${active === 0 && "bg-slate-800 text-white"
            } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[0]?.number}</p>
          <p className="text-center">{listData[0]}</p>
        </div>
        <div
          onClick={() => {
            setActive(1);
          }}
          className={`w-full  p-4 rounded-lg border-2 border-black  ${active === 1 && "bg-slate-800 text-white"
            } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[1]?.number}</p>
          <p className="text-center">{listData[1]}</p>
        </div>
        <div
          onClick={() => {
            setActive(2);
          }}
          className={`w-full  p-4 rounded-lg border-2 border-black  ${active === 2 && "bg-slate-800 text-white"
            } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[2]?.number}</p>
          <p className="text-center">{listData[2]}</p>
        </div>
        <div
          onClick={() => {
            setActive(3);
          }}
          className={`w-full  p-4 rounded-lg border-2 border-black  ${active === 3 && "bg-slate-800 text-white"
            } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[3]?.number}</p>
          <p className="text-center">{listData[3]}</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        {/* <div className=" flex justify-start items-center gap-1">
          <input type="date" value={date_start} onChange={(e) => setDateStart(e.target.value)} /> - <input type="date" value={date_end} onChange={(e) => setDateEnd(e.target.value)} />
        </div> */}
        <button
          onClick={handleExport}
          className="h-10 bg-green-500 text-white font-bold text-center rounded-xl p-2"
        >
          Export CSV
        </button>

      </div>
      <div className=" bg-white">
        <table className="w-full table-auto border-gray-300">
          <thead>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ເລກທີເອກະສານ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ຊື່ເອກະສານ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ຄຳອະທິບາຍເອກະສານ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ວັນທີ່ສົ່ງເອກະສານ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ໄຟລແນບ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ປະເພດເອກະສານ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ພາກສ່ວນ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ສົ່ງຕໍ່ຫາໃຜ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ຂໍ້ມູນຜູ້ຮັບ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ຂໍ້ມູນຕິດຕໍ່ຜູ້ຮັບ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ຂໍ້ມູນຜູ້ສົ່ງ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ຂໍ້ມູນຕິດຕໍ່ຜູ້ສົ່ງ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ສະຖານະ
            </th>
            <th className="border-2 border-gray-300 p-2 bg-slate-200">
              ການກະທຳ
            </th>
          </thead>
          <tbody>
            {checkPermission("READ") &&
              docExport &&
              docExport.length > 0 &&
              docExport.map((item, index) => {
                const jsonStr = JSON.stringify(item);
                const base64 = btoa(encodeURIComponent(jsonStr));
                return (
                  <tr key={index} className=" border-b p-2 hover:bg-slate-100">
                    <td className=" p-2 text-center">{item?.numberID}</td>
                    <td className=" p-2 text-center">{item?.title}</td>
                    <td className=" p-2 text-center">{item?.description}</td>
                    <td className=" p-2 text-center">
                      {TimestampToDate(item?.date)}
                    </td>

                    <td className=" p-2 text-center">
                      <a
                        href={item.files}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 h  hover: border-b-2 hover:border-sky-600"
                      >
                        ເບິ່ງໄຟຣແນບ
                      </a>
                    </td>
                    <td className=" p-2 text-center">{item?.docName}</td>
                    <td className=" p-2 text-center">{item?.sendDoc}</td>
                    <td className=" p-2 text-center">{item?.name}</td>
                    <td className=" p-2 text-center">
                      {item?.destinationName}
                    </td>
                    <td className=" p-2 text-center">
                      {item?.destinationNumber}
                    </td>

                    <td className=" p-2 text-center">{item?.contactName}</td>
                    <td className=" p-2 text-center">{item?.contactNumber}</td>

                    <td className=" p-2 text-center">
                      {ConvertStatus(item.status || item.statusOut) === "ສຳເລັດ" ? (
                        <span className=" p-1 rounded-lg text-green-500 font-bold bg-green-200">
                          {ConvertStatus(item.status || item.statusOut)}
                        </span>
                      ) : ConvertStatus(item.status || item.statusOut) === "ລໍຖ້າ" ? (
                        <span className="p-1 rounded-lg text-yellow-500 font-bold bg-yellow-200">
                          {ConvertStatus(item.status || item.statusOut)}
                        </span>
                      ) : (
                        <span className="p-1 rounded-lg text-blue-500 font-bold bg-blue-200">
                          {ConvertStatus(item.status || item.statusOut)}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        {/* <button className=' shadow-lg p-1 bg-slate-200 rounded-lg'>ເບິ່ງ</button> */}
                        {checkPermission("UPDATED") && (
                          <NavLink
                            to={"/doc-follow/doc-in/edit/" + base64}
                            className="ms-2 shadow-lg p-1 bg-blue-200 rounded-lg"
                          >
                            ແກ້ໄຂ
                          </NavLink>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportView;
