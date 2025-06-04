/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const MobileWatchlistRow = ({ company, qty, price, invested, current, returns }: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border rounded mb-2">
      <div className="d-flex justify-content-between align-items-center p-2" style={{ cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
        <span>{company}</span>
        <span className="fw-bold">{price}</span>
        <i className={`feather ${open ? "icon-chevron-up" : "icon-chevron-down"}`}></i>
      </div>
      {open && (
        <div className="p-2 bg-light">
          <div>
            <b>Qty:</b> {qty}
          </div>
          <div>
            <b>Invested:</b> {invested}
          </div>
          <div>
            <b>Current:</b> <span className="text-success">{current}</span>
          </div>
          <div>
            <b>Returns:</b> <span className={returns >= 0 ? "text-success" : "text-danger"}>{returns}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default MobileWatchlistRow;
