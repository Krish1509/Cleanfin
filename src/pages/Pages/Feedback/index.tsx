import React, { useEffect, useState } from "react";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component

type FeedbackListData = {
    _id: string;
    userId: string;
    description: string;
};

const Feedback = () => {
    const [feedbackListData, setFeedbackListData] = useState<FeedbackListData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [entriesPerPage, setEntriesPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset page to 1 when search query changes
    };

    const handleEntriesPerPageChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset page to 1 when entries per page changes
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const fetchFeedbackListData = async () => {
        try {
            setLoading(true);
            const body = {}; // Add your API request body if needed
            const result = await postRequest("feedback/list", body, true);
            setFeedbackListData(result.data); // Assuming the data has a 'users' property
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbackListData();
    }, []);

    const filteredData = feedbackListData?.filter((item) =>
        item?.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(
        indexOfFirstEntry,
        indexOfLastEntry
    );

    return (
        <React.Fragment>
            <BreadcrumbItem mainTitle="Feedback" subTitle="Feedback List" />
            <div className="col-12 mt-4 pb-4">
                <Card className="table-card">
                    <CardHeader>
                        <div className="d-sm-flex align-items-center justify-content-between">
                            <h5 className="mb-3 mb-sm-0">Feedback List</h5>
                        </div>
                    </CardHeader>
                    {loading ? (
                        <center className="m-4">Loading...</center>
                    ) : (
                        <React.Fragment>
                            <div className="d-sm-flex align-items-center mt-4">
                                <ul className="list-inline me-auto my-1 ms-4">
                                    <li className="list-inline-item">
                                        <select
                                            className="form-select"
                                            onChange={handleEntriesPerPageChange}
                                        >
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="40">40</option>
                                        </select>
                                    </li>
                                    <span> entries per page</span>
                                </ul>
                                <ul className="list-inline ms-auto my-1 me-4">
                                    <li className="list-inline-item">
                                        <form className="form-search">
                                            <Form.Control
                                                type="search"
                                                placeholder="Search...."
                                                className="ps-2 pe-3 pt-2 pb-3"
                                                onChange={handleSearchChange}
                                            />
                                        </form>
                                    </li>
                                </ul>
                            </div>
                            <CardBody className="pt-3">
                                <div className="table-responsive">
                                    <table className="table table-hover" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentEntries.map((item, key) => (
                                                <tr key={key}>
                                                    <td>{item?.userId}</td>
                                                    <td>{item?.description}</td>
                                                    <td>
                                                        <a
                                                            href="#"
                                                            className="avtar avtar-xs btn-link-secondary"
                                                        >
                                                            <i className="ti ti-eye f-20"></i>
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="avtar avtar-xs btn-link-secondary"
                                                        >
                                                            <i className="ti ti-edit f-20"></i>
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="avtar avtar-xs btn-link-secondary"
                                                        >
                                                            <i className="ti ti-trash f-20"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </CardBody>
                        </React.Fragment>
                    )}
                </Card>
            </div>
        </React.Fragment>
    );
};

export default Feedback;
