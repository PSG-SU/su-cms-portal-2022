import React, { useContext, useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import ModalImage from "react-modal-image";
import axios from "axios";
import { toast } from "react-hot-toast";

import { RefreshContext } from "../Refresher";
import Button from "./Button";
import Popup from "reactjs-popup";
import styled, { keyframes } from "styled-components";

const breatheAnimation = keyframes`
 0% { opacity: 0; transform: scale(0.25) translateY(75px); }
 100% { opacity: 1; transform: scale(1); }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    animation-name: ${breatheAnimation};
    animation-duration: 0.5s;
  }
  &-content {
    border-radius: 10px;
    background-color: #e5e5e5;
    animation-name: ${breatheAnimation};
    animation-duration: 0.5s;
  }
  &-arrow {
    color: #e5e5e5;
    animation-name: ${breatheAnimation};
    animation-duration: 0.5s;
  }
`;

const Table = ({
  theads = [],
  tdata = [],
  tkeys = [],
  className = "",
  tratio = "",
  url = "",
  handleUpdate,
}) => {
  const { refreshPage } = useContext(RefreshContext);

  const handleDelete = (item) => {
    axios
      .delete(`${url}/delete/${item._id}`)
      .then((res) => {
        console.log(res);
        toast.success("Delete Successful");
        refreshPage();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Delete Unsuccessful");
      });
  };

  // const handleUpdate = (value, id, property) => {
  //   axios
  //     .update(`${url}/update/${id}`, {
  //       property: value,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       toast.success("Edit Successful");
  //       refreshPage();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Edit Unsuccessful");
  //     });
  // };

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
                className="w-12 h-12 rounded-full"
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
        console.log(item._id);
        return (
          <div className="flex space-x-4">
            <StyledPopup
              trigger={
                <button className="hover:text-[#ff0000]">
                  <HiOutlineTrash />
                </button>
              }
              position="top center"
              offsetX={-90}
              offsetY={64}
            >
              {(close) => (
                <div className="flex items-center space-x-4 m-4">
                  <Button className="w-3/4" text="Cancel" handleClick={close} />
                  <Button
                    className="w-3/4"
                    text="Confirm"
                    handleClick={(e) => {
                      console.log("Delete");
                      handleDelete(item);
                      close();
                    }}
                  />
                </div>
              )}
            </StyledPopup>

            <button
              className="hover:text-[#494998]"
              onClick={(e) => {
                console.log("HEY");
                handleUpdate(item._id);
              }}
            >
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
