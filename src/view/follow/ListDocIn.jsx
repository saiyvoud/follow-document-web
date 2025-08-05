import React, { useEffect, useState } from "react";
import { TimestampToDate } from "../../lib/date";
import { NavLink } from "react-router-dom";
import { checkPermission } from "../../lib/checkpermission";
import { ConvertStatus, FollowDocument } from "../../api/constrant";
import { Edit } from "lucide-react";

const ListDocIn = (props) => {
  const [documents, setDocuments] = useState([]);
  const [selectStatus, setSelectStatus] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setDocuments(props.props);
  }, [props.props]);

  useEffect(() => {
    const data = props.props;
    if (query === "") {
      setDocuments(data);
    } else {
      const findDocs = data.filter((item) =>
        item.numberID.toLowerCase().includes(query.toLowerCase())
      );
      if (findDocs) {
        setDocuments(findDocs);
      }
    }
  }, [query]);
  //ຄົ້ນຫາ ຕາມ ສະຖານະ
  useEffect(() => {
    const data = props.props;
    if (selectStatus === "all") {
      setDocuments(data);
    } else {
      const findDocs = data.filter((item) => item.status === selectStatus);
      if (findDocs) {
        setDocuments(findDocs);
      }
    }
  }, [selectStatus]);
  return (
    <div>
      <p>ຄົ້ນຫາ ເອກະສານ</p>
      <div className=" flex justify-start items-center gap-3">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="border-2 border-gray-300 rounded-lg p-2 w-full"
          placeholder="ລະຫັດເອກະສານ"
        />
        <select
          onChange={(e) => setSelectStatus(e.target.value)}
          className=' w-[20%] border-2 border-gray-300 rounded-lg p-2'
        >
          <option value="all">ທຸກສະຖານະ</option>
          <option value={FollowDocument.await}>{FollowDocument.await}</option>
          <option value={FollowDocument.progress}>{FollowDocument.progress}</option>
          <option value={FollowDocument.padding}>{FollowDocument.padding}</option>
          <option value={FollowDocument.continue}>{FollowDocument.continue}</option>
          <option value={FollowDocument.success}>{FollowDocument.success}</option>
          <option value={FollowDocument.done}>{FollowDocument.done}</option>

        </select>
        {/* <button type='submit' className=' bg-blue-500 p-2 rounded-lg'><FaSearch size={25} color='white' /></button> */}
      </div>
      <div className="w-full mt-10">
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
              documents &&
              documents.length > 0 &&
              documents.map((item, index) => {
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
                      {ConvertStatus(item.status) === "ສຳເລັດ" ? (
                        <span className=" p-1 rounded-lg text-green-500 font-bold bg-green-200">
                          {ConvertStatus(item.status)}
                        </span>
                      ) : ConvertStatus(item.status) === "ລໍຖ້າ" ? (
                        <span className="p-1 rounded-lg text-yellow-500 font-bold bg-yellow-200">
                          {ConvertStatus(item.status)}
                        </span>
                      ) : (
                        <span className="p-1 rounded-lg text-blue-500 font-bold bg-blue-200">
                          {ConvertStatus(item.status)}
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
                            <Edit/>
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

export default ListDocIn;
