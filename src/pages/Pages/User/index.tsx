import React, { useEffect, useState } from "react";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component
import EntriesPerPageSelector from "../../../Common/EntriesPerPageSelector";

type UserListData = {
    _id: string;
    age: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    // otp: string;
    role: string;
    subscription_end: string;
    subscription_start: string;
};

const User = () => {
    const [userListData, setUserListData] = useState<UserListData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [entriesPerPage, setEntriesPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

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

    const fetchUserListData = React.useCallback(async () => {
        try {
            setLoading(true);
            const body = {
                limit: entriesPerPage,
                page: currentPage,
                search: searchQuery
            };
            const result = await postRequest("user/list", body, true);
            const { users, totalPages } = result.data;
            setUserListData(users);
            setTotalPages(totalPages);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }, [entriesPerPage, currentPage, searchQuery]);

    useEffect(() => {
        fetchUserListData();
    }, [entriesPerPage, currentPage, searchQuery, fetchUserListData]);

    return (
        <React.Fragment>
            <BreadcrumbItem mainTitle="User" subTitle="User List" />
            <div className="col-12 mt-4 pb-4">
                <Card className="table-card">
                    <CardHeader>
                        <div className="d-sm-flex align-items-center justify-content-between">
                            <h5 className="mb-3 mb-sm-0">User List</h5>
                        </div>
                    </CardHeader>
                    <div className="d-sm-flex align-items-center mt-4">
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
                    {loading ? (
                        <center className="m-4">Loading...</center>
                    ) : (
                        <React.Fragment>
                            <CardBody className="pt-3">
                                <div className="table-responsive">
                                    <table className="table table-hover" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Mobile</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userListData.map((item, key) => (
                                                <tr key={key}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <h6 className="mb-0">
                                                                {item?.firstName} {item?.lastName}
                                                            </h6>
                                                        </div>
                                                    </td>
                                                    <td>{item?.mobileNumber}</td>
                                                    <td>{item?.role}</td>
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
                            </CardBody>
                        </React.Fragment>
                    )}
                    <div className="px-4 py-2" style={{
                        width: "100%",
                        textAlign: 'center'
                    }}>
                        <div style={{ display: 'inline-block' }}>
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                        <EntriesPerPageSelector
                            entriesPerPage={entriesPerPage}
                            onEntriesPerPageChange={handleEntriesPerPageChange}
                        />
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default User;
