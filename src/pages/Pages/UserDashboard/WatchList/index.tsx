/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "react-bootstrap";
import { postRequest } from "../../../../service/fetch-services";
import { IWatchList } from "../Helper/interfaces";
import AddWatchList from "./AddWatchList";
import AddWatchListScript from "./AddWatchlistScript";
import Select from "react-select";
import MobileWatchlistRow from "./MobileWatchlistRow";

// import Loader from "../../../../Common/Loader/Loader";

const watchlistScripts = [
  {
    company: "AAPL",
    qty: 10,
    price: 200,
    invested: 2000,
    current: 2500,
    returns: 500,
  },
  {
    company: "AMD",
    qty: 20,
    price: 250,
    invested: 5000,
    current: 4800,
    returns: -200,
  },
  {
    company: "TSLA",
    qty: 5,
    price: 700,
    invested: 3500,
    current: -1900,
    returns: 400,
  },
  {
    company: "GOOGL",
    qty: 3,
    price: 2800,
    invested: 8400,
    current: 9000,
    returns: 600,
  },
  {
    company: "MSFT",
    qty: 12,
    price: 300,
    invested: 3600,
    current: 3840,
    returns: 240,
  },
];

const WatchList = () => {
  const [watchlistData, setWatchlistData] = useState<IWatchList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showAddScriptModal, setShowAddScriptModal] = useState<boolean>(false);
  const [watchlistOptions, setWatchlistOptions] = useState<{ value: string; label: string }[]>([]);

  const createWatchList = async () => {
    try {
      setLoading(true);
      const body = {
        name: "Default WatchList",
        isDefault: true,
      };
      await postRequest("watchlist/create", body, true);
      setLoading(false);
      getWatchlists(); // Refresh watchlists after creation
    } catch (err) {
      setLoading(false);
    }
  };

  const getWatchlists = async () => {
    try {
      setLoading(true);
      const body = {
        findAll: true,
        fields: { name: 1 },
      };
      const result = await postRequest("watchlist/list", body, true);
      const { watchlists } = result.data;
      setWatchlistData(watchlists);
      setSelectedWatchlist(watchlists.length > 0 ? watchlists[0]?._id : null); // Set the first watchlist as selected if available
      setWatchlistOptions(
        watchlists.map((wtl: any) => ({
          value: wtl._id,
          label: wtl.name,
        }))
      );
      setLoading(false);
      if (watchlists.length === 0) {
        createWatchList(); // Create a default watchlist if none exist
      }
    } catch (err) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Simulate an API call to fetch watchlists
    getWatchlists();
  }, []);

  const onAfterCreateNew = (data: IWatchList) => {
    setWatchlistData((prev) => [...prev, data]);
  };

  return (
    <React.Fragment>
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">All Watchlists</h5>
              <Button type="button" variant="outline-primary" onClick={() => setShowAddScriptModal(true)}>
                Add Script
              </Button>
            </div>

            {/* Desktop: Button group */}
            <div className="mt-4 d-none d-sm-flex flex-wrap gap-1">
              {!loading &&
                watchlistData.map((watchlist, index) => (
                  <Button
                    type="button"
                    variant="outline-primary"
                    className={`me-2 ${selectedWatchlist === watchlist?._id ? "active" : ""}`}
                    key={index}
                    onClick={() => setSelectedWatchlist(watchlist?._id)}
                  >
                    {watchlist.name}
                  </Button>
                ))}
              <Button type="button" variant="outline-primary" onClick={() => setShowAddModal(true)}>
                <i className="feather icon-plus"></i>
              </Button>
            </div>

            {/* Mobile: Dropdown */}
            <div className="mt-4 d-block d-sm-none">
              <Select
                isClearable={false}
                isSearchable={true}
                options={watchlistOptions}
                placeholder="Select Watchlist"
                className="react-select"
                classNamePrefix="react-select"
                value={watchlistOptions.find((opt) => opt.value === selectedWatchlist) || null}
                onChange={(selectedOption) => setSelectedWatchlist(selectedOption ? selectedOption.value : "")}
              />
              <Button type="button" variant="outline-primary" className="mt-2" onClick={() => setShowAddModal(true)} style={{ width: "100%" }}>
                <i className="feather icon-plus"></i> Add Watchlist
              </Button>
            </div>
          </CardHeader>

          <React.Fragment>
            <CardBody className="pt-3">
              {/* Desktop Table */}
              <div className="table-responsive d-none d-sm-block">
                <table className="table table-hover" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Qty</th>
                      <th>Mkt.Price</th>
                      <th>Invested</th>
                      <th>Current</th>
                      <th>Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlistScripts.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.company}</td>
                        <td>{row.qty}</td>
                        <td>{row.price}</td>
                        <td>{row.invested}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className={`ti ${row.current >= 0 ? "ti-arrow-up text-success" : "ti-arrow-down text-danger"} f-18 align-text-bottom`} />
                            <span className={row.current >= 0 ? "text-success" : "text-danger"}>{row.current}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className={`ti ${row.returns >= 0 ? "ti-arrow-up text-success" : "ti-arrow-down text-danger"} f-18 align-text-bottom`} />
                            <span className={row.returns >= 0 ? "text-success" : "text-danger"}>{row.returns}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Accordion Table */}
              <div className="d-block d-sm-none">
                {watchlistScripts.map((row, idx) => (
                  <MobileWatchlistRow key={idx} company={row.company} qty={row.qty} price={row.price} invested={row.invested} current={row.current} returns={row.returns} />
                ))}
              </div>
            </CardBody>
          </React.Fragment>
        </Card>
      </div>

      {/* AddWatchList Modal */}
      {showAddModal && <AddWatchList show={showAddModal} handleClose={() => setShowAddModal(false)} handleAfterCreate={onAfterCreateNew} />}

      {/* Add Script Modal */}
      {showAddScriptModal && (
        <AddWatchListScript
          show={showAddScriptModal}
          handleClose={() => setShowAddScriptModal(false)}
          selectedWatchlist={selectedWatchlist}
          handleAfterCreateScript={() => console.log("callback after script creation")}
        />
      )}

      {/* Loader Component */}

      {/* <Loader updateLoading={loading}></Loader> */}
    </React.Fragment>
  );
};

export default WatchList;
