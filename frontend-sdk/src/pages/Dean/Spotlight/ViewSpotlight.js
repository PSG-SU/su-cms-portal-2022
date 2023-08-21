import React, { useContext, useState , useEffect} from "react";
import axios from "axios";
import Table from "../../../components/Table";
import { RefreshContext } from "../../../Refresher";
import { SPOTLIGHT_URL } from "../../../API/config";
import { SpotlightContext } from ".";

const ViewSpotlight = () => {
  // const { updateByID } = useContext(ProposalContext);
  const { refreshToken } = useContext(RefreshContext);
  const url = SPOTLIGHT_URL;
  const [data, setData] = useState([]);

  const { updateByID } = useContext(SpotlightContext);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken, url]);

  return (
    <div className="mt-8 w-full lg:pr-[5%] h-[calc(100vh-20rem)]">
      <Table
        theads={["Title", "Description", "Name", "URL"]}
        tdata={data}
        tkeys={["title", "description", "name", "url"]}
        className={`${
          data.length < 8
            ? "max-h-[calc(100vh-20rem)]"
            : "h-[calc(100vh-25rem)]"
        } w-full`}
        tratio="1fr 1fr 1fr 1fr"
        url={url}
        handleUpdate={(id) => updateByID(id)}
        // UndoButton={UndoButton}
        // clubs={clubs}
      />
    </div>
  );
};

export default ViewSpotlight;
