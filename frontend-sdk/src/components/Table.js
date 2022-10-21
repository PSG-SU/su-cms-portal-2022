import React, { useContext, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import ModalImage from "react-modal-image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { RefreshContext } from "../Refresher";

const Table = ({
  theads = [],
  tdata = [],
  tkeys = [],
  className = "",
  tratio = "",
  url = "",
}) => {
  const { refreshPage } = useContext(RefreshContext);

  const handleDelete = (item) => {
    axios
      .delete(`${url}/delete/${item._id}`)
      .then((res) => {
        console.log(res);
        toast("Delete Successful");
        refreshPage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nodes = tdata.map((d) => {
    console.log(d);
    let j = Object();
    j["_id"] = d["_id"];
    tkeys.forEach((k) => {
      j[k] = d[k];
    });
    return j;
  });

  let COLUMNS = theads.map((h, idx) => {
    return {
      label: h,
      renderCell: (item) => {
        console.log("ITEM: ", item);
        if (
          /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png)$/.test(
            item[tkeys[idx]]
          )
        ) {
          return (
            <div className="flex space-x-2">
              <ModalImage
                className="w-10 h-10 rounded-full"
                small={item[tkeys[idx]]}
                large={item[tkeys[idx]]}
                alt="Image URL"
              />
            </div>
          );
        } else return item[tkeys[idx]];
      },
      // resize: true,
    };
  });
  // console.log("ites"+item[tkeys[idx]])
  COLUMNS = [
    ...COLUMNS,
    {
      label: "Actions",
      renderCell: (item) => {
        return (
          <div className="flex space-x-4">
            <button
              className="hover:text-[#ff0000]"
              onClick={(e) => {
                e.preventDefault();
                console.log("Delete item");
                handleDelete(item);
              }}
            >
              <HiOutlineTrash />
            </button>
            <button className="hover:text-[#494998]">
              <BsPencil />
            </button>
          </div>
        );
      },
    },
  ];

  const getDefaults = () => {
    let defaultRatio = "";
    theads.forEach((h, idx) => {
      defaultRatio += `${100 / (theads.length + 1)}% `;
    });
    return defaultRatio;
  };

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  ${
          tratio.length <= 0 ? getDefaults() : tratio
        } 100px;
      `,
    },
  ]);

  const data = { nodes };

  useEffect(() => {
    console.log("JSON", nodes, COLUMNS, getDefaults(), tratio);
  }, [nodes]);

  return (
    <div className={`${className}`}>
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{
          custom: true,
          isDiv: true,
          fixedHeader: true,
          horizontalScroll: false,
        }}
      />
    </div>
  );
};

export default Table;
