/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { postRequest } from "../../../../service/fetch-services";
import ToastAlert from "../../../../helper/toast-alert";
import Select from "react-select";
import * as Yup from "yup";

interface AddModalProps {
  show: boolean;
  handleClose: () => void;
  handleAfterCreateScript: (data: any) => void;
  selectedWatchlist?: string;
}
const SegmentOptions = [
  { value: 1, label: "NSE_EQ" },
  { value: 2, label: "NSE_FO" },
  { value: 5, label: "MCX_FO" },
];

const validationSchema = Yup.object().shape({
  scriptId: Yup.string().required("Script is required!"),
  segmentID: Yup.string().required("Segment is required!"),
});

const AddWatchListScript: React.FC<AddModalProps> = ({ show, handleClose, handleAfterCreateScript, selectedWatchlist }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [scriptloading, setScriptloading] = React.useState<boolean>(false);
  const [scriptdata, setScriptdata] = React.useState<any[]>([]);

  const getScriptList = async (value: number) => {
    try {
      setScriptloading(true);
      const result = await postRequest("option-scripts/list", {
        segmentID: value,
      });

      if (result) {
        const formattedArray = result?.data?.map((item: { _id: any; name: any }) => ({
          value: item._id,
          label: item.name,
        }));

        setScriptdata(formattedArray);
      }

      setScriptloading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      setLoading(true);
      const body = {
        id: selectedWatchlist,
        items: [
          {
            scriptId: values?.scriptId,
            segment: values?.segmentID,
          },
        ],
      };
      const result = await postRequest("watchlist/update", body);

      if (result) {
        ToastAlert.success("Script added successfully!");
        setLoading(false);
        handleClose();
        handleAfterCreateScript(result?.data);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} id="removeCartModal" className="fade zoomIn" dialogClassName="modal-dialog-centered" size="lg">
      <Modal.Header closeButton style={{ borderBottom: "none" }}>
        Add Script
      </Modal.Header>
      <Modal.Body className="bg-transparent">
        <Formik initialValues={{ segmentID: "", scriptId: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form>
              <Row>
                <Col sm={12}>
                  <div className="mb-3">
                    <label className="form-label">Segment</label>
                    <Select
                      isSearchable={true}
                      isClearable
                      options={SegmentOptions}
                      placeholder="Select"
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(value) => {
                        setFieldValue("segmentID", value?.value || "");

                        // Only call getScriptList if a value is selected
                        if (value) {
                          getScriptList(value?.value);
                        }
                        if (!value) {
                          setScriptdata([]);
                          setFieldValue("scriptId", "");
                        }
                      }}
                      value={SegmentOptions?.filter((obj) => Number(values?.segmentID) === obj.value)}
                    />

                    {errors.segmentID && touched.segmentID ? <div className="invalid-feedback d-flex align-items-start">{errors.segmentID}</div> : null}
                  </div>
                </Col>
                <Col sm={12}>
                  <div>
                    <label className="form-label">Script</label>
                    <Select
                      isClearable
                      isSearchable={true}
                      options={scriptdata}
                      placeholder="Select"
                      className="react-select"
                      isDisabled={scriptloading || !scriptdata?.length}
                      classNamePrefix="react-select"
                      onChange={(selectedOption) => {
                        setFieldValue("scriptId", selectedOption ? selectedOption.value : "");
                      }}
                      value={scriptdata?.filter((obj: any) => values?.scriptId === obj.value)}
                    />

                    {errors.scriptId && touched.scriptId ? <div className="invalid-feedback d-flex align-items-start">{errors.scriptId}</div> : null}
                  </div>
                </Col>
              </Row>
              <div className="d-flex gap-2 justify-content-end mt-4 mb-2">
                <Button type="button" variant="light" className="btn w-sm" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" className="btn w-sm" id="remove-cartproduct" disabled={isSubmitting || loading}>
                  Save {loading ? <Spinner className="ml-2" size="sm" /> : ""}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddWatchListScript;
