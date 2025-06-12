/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "react-bootstrap";

const MobileWatchlistRow = ({ name, price, volume, totalBuyQuantity, totalSellQuantity }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card className="mb-3 shadow-sm border-0">
      <div className="d-flex justify-content-between align-items-center p-2" style={{ cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
        <span>{name}</span>
        <span>
          <span className="fw-bold me-1">{price}</span>
          <i className={`feather ${open ? "icon-chevron-up" : "icon-chevron-down"}`}></i>
        </span>
      </div>
      {open && (
        <Card.Body className="pt-2 pb-3 px-3 bg-light border-top">
          <div className="row g-2">
            <div className="col-6">
              <div className="small text-muted">Volume</div>
              <div className="fw-semibold">{volume}</div>
            </div>
            <div className="col-6">
              <div className="small text-muted">Total Buy Qty</div>
              <div className="fw-semibold">{totalBuyQuantity}</div>
            </div>
            <div className="col-6">
              <div className="small text-muted">Total Sell Qty</div>
              <div className="fw-semibold">{totalSellQuantity}</div>
            </div>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default MobileWatchlistRow;
