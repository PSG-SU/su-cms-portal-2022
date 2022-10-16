import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const Table = ({
  theads = [],
  tdata = [],
  tkeys = [],
  className = "",
  tratio = "",
}) => {

  const nodes = tdata.map((d) => {
    let j = Object();
    tkeys.forEach((k) => {
      j[k] = d[k];
    });
    return j;
  });

  let COLUMNS = theads.map((h, idx) => {
    return {
      label: h,
      renderCell: (item) => {
        return item[tkeys[idx]];
      },
      // resize: true,
    };
  });

  COLUMNS = [
    ...COLUMNS,
    {
      label: "Actions",
      renderCell: (item) => {
        return (
          <div className="flex space-x-2 ">
            <button className="hover:text-[#ff0000]">
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
