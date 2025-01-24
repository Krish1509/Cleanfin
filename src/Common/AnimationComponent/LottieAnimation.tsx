import React from 'react';
import Lottie from 'lottie-react';
import stoploss from '../../assets/animations/stop_loss.json';
import target from '../../assets/animations/target_achieved.json'; // Assuming you have a target animation file

// eslint-disable-next-line react-refresh/only-export-components
export enum Varient {
    StopLoss = 'stoploss',
    Target = 'target',
}

interface Props {
    show: boolean;
    varient: Varient;
    info: string;
}

const animationMap: Record<Varient, object> = {
    [Varient.StopLoss]: stoploss,
    [Varient.Target]: target, // Assuming target animation is available
};

const LottieAnimation: React.FC<Props> = ({ show, varient, info }) => {
    if (!show) return null;

    return (
        <div
            className="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center flex-column"
            style={{
                zIndex: 99999999,
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency for the background
            }}
        >
            <div className='w-25'>
                <Lottie animationData={animationMap[varient]} loop={true} />
            </div>
            <div
                className="fw-bold"
                style={{
                    fontSize: "36px",
                    animation: "fadeInText 3s ease-out 0.5s forwards",
                    textAlign: 'center'
                }}
            >
                {info}
                <br />
                <p style={{ fontSize: "20px" }}>Continue your investment journey.</p>
            </div>
        </div>
    );
};

export default LottieAnimation;
