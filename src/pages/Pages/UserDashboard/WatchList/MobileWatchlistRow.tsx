/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "react-bootstrap";

const MobileWatchlistRow = ({ company, qty, price, invested, current, returns }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card className="mb-3 shadow-sm border-0">
      <div className="d-flex justify-content-between align-items-center p-2" style={{ cursor: "pointer" }} onClick={() => setOpen((o) => !o)}>
        <span>{company}</span>
        <span>
          <span className="fw-bold me-1">{price}</span>
          <i className={`feather ${open ? "icon-chevron-up" : "icon-chevron-down"}`}></i>
        </span>
      </div>
      {open && (
        <Card.Body className="pt-2 pb-3 px-3 bg-light border-top">
          <div className="row g-2">
            <div className="col-6">
              <div className="small text-muted">Qty</div>
              <div className="fw-semibold">{qty}</div>
            </div>
            <div className="col-6">
              <div className="small text-muted">Invested</div>
              <div className="fw-semibold">{invested}</div>
            </div>
            <div className="col-6 mt-2">
              <div className="small text-muted">Current</div>
              <div className={`fw-semibold ${current >= 0 ? "text-success" : "text-danger"}`}>{current}</div>
            </div>
            <div className="col-6 mt-2">
              <div className="small text-muted">Returns</div>
              <div className={`fw-semibold ${returns >= 0 ? "text-success" : "text-danger"}`}>
                {returns >= 0 ? <i className="feather icon-arrow-up" /> : <i className="feather icon-arrow-down" />} {returns}
              </div>
            </div>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default MobileWatchlistRow;
