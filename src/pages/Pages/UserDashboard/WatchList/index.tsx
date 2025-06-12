/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Button, Card, CardBody, CardHeader } from "react-bootstrap";
import { postRequest } from "../../../../service/fetch-services";
import { IWatchList } from "../Helper/interfaces";
import AddWatchList from "./AddWatchList";
import Select from "react-select";
import MobileWatchlistRow from "./MobileWatchlistRow";
import AddWatchListScript from "./AddWatchListScript";
import { initializeSocket } from "../../../../service/socketService";

// import Loader from "../../../../Common/Loader/Loader";

const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem("user") || "")
const USER_ID = user?._id;

const WatchList = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [watchlistData, setWatchlistData] = useState<IWatchList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showAddScriptModal, setShowAddScriptModal] = useState<boolean>(false);
  const [watchlistOptions, setWatchlistOptions] = useState<{ value: string; label: string }[]>([]);

  
  
  React.useEffect(() => {
    // Initialize socket connection
    const newSocket = initializeSocket();
    setSocket(newSocket);

    // Log connection established
    newSocket.on("connect", () => {
      console.log("Socket connection established");

    });

    // Log disconnection
    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Clean up socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

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
      if (selectedWatchlist === "") {
        setSelectedWatchlist(watchlists.length > 0 ? watchlists[0]?._id : null); // Set the first watchlist as selected if available
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAfterCreateNew = (data: IWatchList) => {
    setWatchlistData((prev) => [...prev, data]);
    setWatchlistOptions((prev) => [...prev, { value: data._id, label: data.name }]);
  };

  useEffect(() => {
    if (socket && selectedWatchlist) {
      // Find the selected watchlist
      const selectedWatchlistData = watchlistData.find(watchlist => watchlist._id === selectedWatchlist);
      if (selectedWatchlistData) {
        // Extract the scriptId code from the items
        selectedWatchlistData?.items.forEach(item => {
          const scriptIdCode = item.scriptId?.code;
          if (scriptIdCode) {
            socket.emit("watchlist:join", { userId: USER_ID, scriptId: scriptIdCode });
          }
        });
      }

      // Listen for updates from the server
      socket.on("share:update", ({ scriptId, data }) => {
        if (selectedWatchlistData) {
          setWatchlistData((prev) =>
            prev.map((watchlist) => {
              // Match the watchlist
              if (watchlist._id === selectedWatchlistData._id) {
                return {
                  ...watchlist,
                  items: watchlist.items.map((item) => {
                    // Match the script/item to update its price                    
                    if (item.scriptId.code == scriptId) {
                      return {
                        ...item,
                        price: data.last_traded_price,
                        volume: data.volume,
                        totalBuyQuantity: data.total_buy_quantity,
                        totalSellQuantity: data.total_sell_quantity,
                      };
                    }
                    return item;
                  }),
                };
              }
              return watchlist;
            })
          );
        }
      });

      // Listen for user joined events
      socket.on("room:userJoined", ({ userId }) => {
        console.log(`User ${userId} joined the room`);
      });

      // Listen for user left events
      socket.on("room:userLeft", ({ userId }) => {
        console.log(`User ${userId} left the room`);
      });
    }
  }, [socket, selectedWatchlist, watchlistData]);

  const handleAfterCreateScript = (data: IWatchList) => {
    setWatchlistData(prev => {
      const index = prev.findIndex(item => item._id === data._id);
      if (index !== -1) {
        const updatedPrev = [...prev];
        updatedPrev[index] = data;
        return updatedPrev;
      }
      return [...prev, data];
    });

    // Emit an event to update the watchlist data
    if (socket && data.items) {
      data.items.forEach(item => {
        const scriptIdCode = item.scriptId?.code;
        if (scriptIdCode) {
          socket.emit("watchlist:update", { scriptId: scriptIdCode, data });
        }
      });
    }
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
                      <th>Name</th>
                      <th>Mkt.Price</th>
                      <th>Volume</th>
                      <th>Total Buy Quantity</th>
                      <th>Total Sell Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlistData
                      .find(item => item._id === selectedWatchlist)
                      ?.items?.map((row, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{row?.scriptId?.name}</td>
                            <td>{row.price || "-"}</td>
                            <td>{row.volume || "-"}</td>
                            <td>{row.totalBuyQuantity || "-"}</td>
                            <td>{row.totalSellQuantity || "-"}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                {/* <i className={`ti ${row.current >= 0 ? "ti-arrow-up text-success" : "ti-arrow-down text-danger"} f-18 align-text-bottom`} /> */}
                                <span className={row.current >= 0 ? "text-success" : "text-danger"}>{row.current}</span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {/* <i className={`ti ${row.returns >= 0 ? "ti-arrow-up text-success" : "ti-arrow-down text-danger"} f-18 align-text-bottom`} /> */}
                                <span className={row.returns >= 0 ? "text-success" : "text-danger"}>{row.returns}</span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Accordion Table */}
              <div className="d-block d-sm-none">
                {watchlistData
                  .find(item => item._id === selectedWatchlist)
                  ?.items?.map((row, idx) => (
                    <MobileWatchlistRow
                      key={idx}
                      name={row?.scriptId?.name || "-"}
                      price={row?.price || "-"}
                      volume={row?.volume || "-"}
                      totalBuyQuantity={row?.totalBuyQuantity || "-"}
                      totalSellQuantity={row?.totalSellQuantity || "-"}
                    />
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
          handleAfterCreateScript={handleAfterCreateScript}
        />
      )}

      {/* Loader Component */}

      {/* <Loader updateLoading={loading}></Loader> */}
    </React.Fragment>
  );
};

export default WatchList;
