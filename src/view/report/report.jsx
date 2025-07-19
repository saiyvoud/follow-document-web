import React from "react";
import { User } from "lucide-react";
import { Dashboard } from "../../api/dashboard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { TimestampToDate } from "../../lib/date";
import { NavLink } from "react-router-dom";
import { GetAllDocIn, GetAllDocOut } from "../../api/document";

import { ExportToXLSX } from "./exportCSV";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportView = () => {
  const [data, setData] = React.useState();
  const [active, setActive] = React.useState(0);
  const [docIn, setDocIn] = React.useState([]);
  const [docOut, setDocOut] = React.useState([]);
  React.useEffect(() => {
    fetchdata();
  }, []);

  React.useEffect(() => {
    if (active === 0) {
      fechDocIn();
    } else if (active === 1) {
      fechDocOut();
    } else if (active === 2) {
    }
  }, [active]);

  const fechDocIn = async () => {
    const res = await GetAllDocIn();
    if (res?.status === 200) {
      setDocIn(res?.data?.data);
    }
  };
  const fechDocOut = async () => {
    const res = await GetAllDocOut();
    if (res?.status === 200) {
      setDocOut(res?.data?.data);
    }
  };
  const fetchdata = async () => {
    const res = await Dashboard();
    if (res.status === 200) {
      setData(res.data.data);
    }
  };
  console.log(data);
  const listData = [
    "ລາຍງານເອກະສານຂາເຂົ້າ",
    "ລາຍງານເອກະສານຂາອອກ",
    "ລາຍງານເອກະສານ ຄ້າງອະນຸມັດ",
    "ລາຍງານເອກະສານທັງຫມົດ",
  ];
 
   
  
  const handleExportDocIn = async () => {
    const data = [];
    for (const i of docIn) {
    
        const x = {
          "ເລກທີ່ເອກະສານ": i.numberID,
          "ຊື່ເອກະສານ": i.title,
          "ຄຳອະທິບາຍເອກະສານ": i.description,
          "ວັນທີ່ສົ່ງເອກະສານ": i.date,
          "ປະເພດເອກະສານ": i.docType,
          "ພາກສ່ວນ": i.name,
          "ຜູ້ຮັບຜິດຊອບ": i.part_demand_name,
          "ຂໍ້ມູນຜູ້ສົ່ງ": i.contactName,
          "ຂໍ້ມູນຕິດຕໍ່": i.contactNumber,
          "ສະຖານະ": i.status,
          "ວັນທີ່ສ້າງ": TimestampToDate(i.createdAt),
          "ວັນທີ່ອັບເດດ": TimestampToDate(i.updatedAt)
        }
        data.push(x);
      
    }
     ExportToXLSX(data,listData[0]);
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
          className={`w-full  p-4 rounded-lg border-2 border-black  ${
            active === 0 && "bg-slate-800 text-white"
          } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[0]?.number}</p>
          <p className="text-center">{listData[0]}</p>
        </div>
        <div
          onClick={() => {
            setActive(1);
          }}
          className={`w-full  p-4 rounded-lg border-2 border-black  ${
            active === 1 && "bg-slate-800 text-white"
          } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[1]?.number}</p>
          <p className="text-center">{listData[1]}</p>
        </div>
        <div
          onClick={() => {
            setActive(2);
          }}
          className={`w-full  p-4 rounded-lg border-2 border-black  ${
            active === 2 && "bg-slate-800 text-white"
          } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[2]?.number}</p>
          <p className="text-center">{listData[2]}</p>
        </div>
        <div
          onClick={() => {
            setActive(3);
          }}
          className={`w-full  p-4 rounded-lg border-2 border-black  ${
            active === 3 && "bg-slate-800 text-white"
          } duration-700 ease-in-out`}
        >
          <p className="text-center font-bold">{data?.doc_count[3]?.number}</p>
          <p className="text-center">{listData[3]}</p>
        </div>
      </div>
      {/* report table */}
      {active === 0 && (
        <>
          <div>
            <button
              onClick={handleExportDocIn}
              className="h-10 bg-green-500 text-white font-bold text-center rounded-xl p-2"
            >
              Export CSV
            </button>
            
          </div>
        </>
      )}
    </div>
  );
};

export default ReportView;
