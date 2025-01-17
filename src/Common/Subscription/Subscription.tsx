import { Card } from "react-bootstrap";

const Subscription = () => {
  return (
    <div
      style={{
        padding: "2px",
        borderRadius: "12px",
      }}
    >
      <Card
        className="price-card p-1 border border-primary border-2 h-100 card bg-primary bg-opacity-10"
        style={{
          borderRadius: "10px",
          background: "white",
        }}
      >
        <Card.Body className="text-left">
          <div className="p-4">
            <div className="mb-3">
              <i
                className="fas fa-lock  text-primary"
                style={{
                  padding: "10px",
                  backgroundColor: "#e9f5ff",
                  borderRadius: "50%",
                }}
              ></i>
            </div>
            <div className="mb-2">
              <p className="text-muted mb-1">Today's Stock Recommendation</p>
            </div>
            <div className="mb-3">
              <h6 className="font-weight-bold">Get High Octane Stack Calls</h6>
            </div>
            <div>
              <button
                className="w-100 btn btn-dark "
                style={{ borderRadius: "5px" }}
              >
                Subscribe to Unlock
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Subscription;
