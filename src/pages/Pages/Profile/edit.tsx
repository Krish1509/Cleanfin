/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { handleFormData } from "../../../service/fetch-services";
import ToastAlert from "../../../helper/toast-alert";

// Type for the form values
interface FormValues {
    _id: string;
    firstName: string;
    lastName: string;
    image: string | null;
    age: number | string;
    mobileNumber: string;
    role: string;
    subscription_start: string;
    subscription_end: string;
    isActive: boolean;
}

const EditProfile = () => {

    // const user = localStorage?.getItem("user");
    // const userData: FormValues = user ? JSON.parse(user) : null;

    const [userData, setUserData] = useState<FormValues | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Fetch user data from localStorage when the component mounts
    useEffect(() => {
        const user = localStorage?.getItem("user");
        if (user) {

            const data = JSON.parse(user)
            setUserData(data);
            setSelectedImage(data.image);
        }
    }, []);



    // Initial form values
    const initialValues: FormValues = {
        _id: userData?._id || "",
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        image: userData?.image || null,
        age: userData?.age || "",
        mobileNumber: userData?.mobileNumber || "",
        role: userData?.role || "",
        subscription_start: userData?.subscription_start || "",
        subscription_end: userData?.subscription_end || "",
        isActive: userData?.isActive || false,
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        age: Yup.number().required("Age is required").positive().integer(),
        mobileNumber: Yup.string()
            .matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, "Invalid mobile number")
            .required("Mobile number is required"),
        subscription_start: Yup.date().required("Subscription start is required"),
        subscription_end: Yup.date().required("Subscription end is required"),
        isActive: Yup.boolean(),
    });

    // Handle image file change for the circle avatar
    const handleImageChange = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append("userId", values._id);
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("age", values.age.toString());
            formData.append("mobileNumber", values.mobileNumber);
            formData.append("role", values.role);
            formData.append("subscription_start", values.subscription_start);
            formData.append("subscription_end", values.subscription_end);
            formData.append("isActive", values.isActive.toString());
            if (selectedImage) {
                formData.append("filePath", selectedImage);
            }

            const result = await handleFormData("user/edit", formData);

            if (result) {
                ToastAlert.success(
                    `Profile updated successfully.`
                );
                localStorage.setItem('user', JSON.stringify(result.data));
                setUserData(result.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancel = (resetForm: () => void) => {
        setSelectedImage(null);
        resetForm();
    };

    return (
        <React.Fragment>
            <BreadcrumbItem mainTitle="Profile" subTitle="Edit Profile" />
            <Row>
                <Col sm={12}>
                    <Card>
                        <div className="card-header">
                            <h5>Edit Profile</h5>
                        </div>
                        <Card.Body>
                            <Formik
                                initialValues={userData || initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize={true}
                            >
                                {({ setFieldValue, values, dirty, resetForm }) => (
                                    <FormikForm>
                                        <Row>
                                            <Col lg={12} className="mb-3">
                                                <label className="col-form-label">Profile Image</label>
                                                <Dropzone
                                                    onDrop={(acceptedFiles) => {
                                                        handleImageChange(acceptedFiles);
                                                        setFieldValue("image", acceptedFiles[0]);
                                                    }}
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <div
                                                            className="dropzone dz-clickable d-flex align-items-center p-0"
                                                            {...getRootProps()}
                                                            style={{
                                                                width: "120px",
                                                                height: "120px",
                                                                borderRadius: "50%",
                                                                border: "2px dashed",
                                                                margin: "auto",
                                                                position: "relative", // Ensure the Remove button is positioned correctly
                                                            }}
                                                        >
                                                            <div className="dz-message needsclick m-auto">
                                                                {selectedImage ? (
                                                                    <>
                                                                        <div style={{ position: "relative", width: "110px", height: "110px", top: 0, left: 0 }}>
                                                                            <img
                                                                                src={selectedImage}
                                                                                alt="Preview"
                                                                                className="avatar-sm rounded-circle"
                                                                                style={{
                                                                                    width: "110px",
                                                                                    height: "110px",
                                                                                    objectFit: "cover",
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-danger"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setSelectedImage(null);
                                                                                setFieldValue("image", null);
                                                                            }}
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: "0%",
                                                                                right: "0%",
                                                                                border: "none",
                                                                                borderRadius: "50%",
                                                                                padding: "5px",
                                                                                cursor: "pointer",
                                                                            }}
                                                                        >
                                                                            <div className="d-flex align-items-center justify-content-center" style={{ minWidth: 20, minHeight: 20 }}>
                                                                                <i className="ph-duotone ph-trash-simple"></i>
                                                                            </div>
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <h6 className="text-muted p-2 mt-2">Drop image here or click to upload</h6>
                                                                )}
                                                                <input {...getInputProps()} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Dropzone>
                                                <ErrorMessage name="image" component="div" className="text-danger" />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6} sm={12} className="mb-3">
                                                <label className="col-form-label text-sm-end">First Name</label>
                                                <Field
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control"
                                                    placeholder="First Name"
                                                />
                                                <ErrorMessage name="firstName" component="div" className="text-danger" />
                                            </Col>
                                            <Col lg={6} sm={12} className="mb-3">
                                                <label className="col-form-label text-sm-end">Last Name</label>
                                                <Field
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control"
                                                    placeholder="Last Name"
                                                />
                                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6} sm={12} className="mb-3">
                                                <label className="col-form-label text-sm-end">Age</label>
                                                <Field
                                                    type="number"
                                                    name="age"
                                                    className="form-control"
                                                    placeholder="Enter age"
                                                />
                                                <ErrorMessage name="age" component="div" className="text-danger" />
                                            </Col>
                                            <Col lg={6} sm={12} className="mb-3">
                                                <label className="col-form-label text-sm-end">Mobile Number</label>
                                                <Field
                                                    type="tel"
                                                    name="mobileNumber"
                                                    className="form-control"
                                                    placeholder="Mobile number"
                                                    disabled
                                                />
                                                <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={12} className="mb-3">
                                                <label className="col-form-label text-sm-end">Role</label>
                                                <Field
                                                    type="text"
                                                    name="role"
                                                    className="form-control"
                                                    placeholder="Role"
                                                    disabled
                                                />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6} sm={12} className="mb-3">
                                                <label className="col-form-label text-sm-end">Subscription Start</label>
                                                <Field
                                                    type="date"
                                                    value={values?.subscription_start ? new Date(values?.subscription_start)?.toISOString()?.split("T")[0] : ""}
                                                    name="subscription_start"
                                                    className="form-control"
                                                    disabled
                                                />
                                                <ErrorMessage name="subscription_start" component="div" className="text-danger" />
                                            </Col>
                                            <Col lg={6} sm={12} className="mb-3">
                                                <label className="col-form-label text-sm-end">Subscription End</label>
                                                <Field
                                                    type="date"
                                                    value={values?.subscription_end ? new Date(values?.subscription_end)?.toISOString()?.split("T")[0] : ""}
                                                    name="subscription_end"
                                                    className="form-control"
                                                    disabled
                                                />
                                                <ErrorMessage name="subscription_end" component="div" className="text-danger" />
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={12} className="text-end">
                                                <button type="submit" className="btn btn-primary me-2"
                                                    disabled={!dirty}
                                                >
                                                    Apply Change
                                                </button>
                                                <button type="reset" className="btn btn-outline-secondary"
                                                    onClick={() => handleCancel(resetForm)}
                                                >
                                                    Cancel
                                                </button>
                                            </Col>
                                        </Row>
                                    </FormikForm>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EditProfile;
