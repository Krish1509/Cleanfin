import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { getRequest, postRequest } from "../service/fetch-services";
import { Button } from "react-bootstrap";

const SocketUI = () => {
    const [status, setStatus] = useState<boolean>(false);

    const checkConnection = React.useCallback(async () => {
        try {
            const result = await postRequest("common/check-b2c-websocket", {});
            setStatus(result.isConnected);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const reconnectConnection = React.useCallback(async () => {
        try {
            await postRequest("common/reconnect-b2c-websocket", {});
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        // Check the initial connection
        checkConnection();

        // Set an interval to call reconnectConnection every 1.5 seconds
        const intervalId = setInterval(() => {
            checkConnection();
        }, 1500);

        // Cleanup interval when component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [checkConnection, reconnectConnection]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Dot active={status} />
            <span style={{ textTransform: "capitalize" }}>{status ? "Active" : "Inactive"}</span>
            <Button onClick={reconnectConnection}>Re-Connect</Button>
        </div>
    );
};

export default SocketUI;

const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? 'green' : 'red')};
`;
