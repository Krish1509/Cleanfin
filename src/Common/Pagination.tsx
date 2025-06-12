import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  entriesPerPage: number;
  onEntriesPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange, entriesPerPage, onEntriesPerPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageLimit = 2; // Number of pages to show on each side of current

    if (totalPages <= 7) {
      // Show all if few pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page

      if (currentPage > pageLimit + 2) {
        pages.push("prev-ellipsis"); // '...'
      }

      const start = Math.max(2, currentPage - pageLimit);
      const end = Math.min(totalPages - 1, currentPage + pageLimit);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - (pageLimit + 1)) {
        pages.push("next-ellipsis"); // '...'
      }

      pages.push(totalPages); // Always show last page
    }

    return pages.map((page, index) => {
      if (typeof page === "string") {
        return (
          <li key={page + index} className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      return (
        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(page)}>
            {page}
          </button>
        </li>
      );
    });
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <ul className="list-inline m-0" style={{ display: "flex", alignItems: "center" }}>
        <span className="me-2">Per page</span>
        <li className="list-inline-item">
          <select className="form-select" onChange={onEntriesPerPageChange} value={entriesPerPage} style={{ padding: "0.4rem 2rem 0.4rem 0.75rem" }}>
            {[5, 10, 20, 30, 40].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </li>
      </ul>

      <nav>
        <ul className="pagination justify-content-end m-0 flex-wrap">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          </li>

          {renderPageNumbers()}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
