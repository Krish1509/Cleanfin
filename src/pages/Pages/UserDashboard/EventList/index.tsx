/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { postRequest } from "../../../../service/fetch-services";
import Loader from "../../../../Common/Loader/Loader";
import moment from "moment";
import { IEventList } from "../Helper/interfaces";

const EventList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [eventList, setEventList] = useState<IEventList[]>([]);

    const fetchContentBytes = async () => {
        try {
            setLoading(true);
            const result = await postRequest("event/list");
            setEventList(result?.data?.events);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContentBytes();
    }, []);

    return (
        <React.Fragment>
            <div className="col-12 mt-4 pb-4">
                <Card className="table-card">
                    <CardHeader>
                        <div className="d-sm-flex align-items-center justify-content-between">
                            <h5 className="mb-3 mb-sm-0">Event List</h5>
                        </div>
                    </CardHeader>
                    {!loading && (
                        <React.Fragment>
                            <CardBody className="pt-3">
                                <div className="table-responsive">
                                    <table className="table table-hover" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Country</th>
                                                <th>Date</th>
                                                <th>Impact</th>
                                                <th>Forecast</th>
                                                <th>Previous</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventList?.map((item, key) => (
                                                <tr key={key}>
                                                    <td>{item?.title}</td>
                                                    <td>{item?.country}</td>
                                                    <td>{moment(item?.date).format("YYYY-MM-DD hh:mm A")}</td>
                                                    <td>{item?.impact}</td>
                                                    <td>{item?.forecast}</td>
                                                    <td>{item?.previous}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </React.Fragment>
                    )}
                </Card>
            </div>

            <Loader updateLoading={loading}></Loader>
        </React.Fragment >
    );
};

export default EventList;
