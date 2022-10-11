import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

const Table = ({ theads = [], tdata = [], tkeys = [], className = "" }) => {

  const nodes = tdata.map(d => {
    let j = Object();
    tkeys.map(k => {
      j[k] = d[k]
    });
    return j;
  });

  console.log(nodes);

  let COLUMNS = theads.map((h, idx) => {
    console.log(tkeys[idx]);
    return {
      label: h,
      renderCell: item => { return item[tkeys[idx]] },
      resize: true
    }
  })

  console.log(COLUMNS);

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  15% 15% 70% ;
      `,
    },
  ]);

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item, _index) => 33,
  };


  const data = { nodes };

  return (<div className={`${className}`}>
    <CompactTable virtualizedOptions={VIRTUALIZED_OPTIONS} columns={COLUMNS} data={data} theme={theme} layout={{custom: true, isDiv: true, fixedHeader: true }} />;
  </div>)
};

export default Table;