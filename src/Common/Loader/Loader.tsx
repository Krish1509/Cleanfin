/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const Loader = ({ updateLoading }: { updateLoading: boolean }) => {
  useEffect(() => {
    const elem = document.querySelector(".loader") as HTMLElement;
    let fadeInterval: any;

    const fade = (start: number, end: number, timing: number) => {
      clearInterval(fadeInterval);
      let opacity = start;

      elem.style.display = start < end ? "flex" : "none";
      elem.style.opacity = String(opacity);

      fadeInterval = setInterval(() => {
        if ((start < end && opacity < end) || (start > end && opacity > end)) {
          opacity += start < end ? 0.01 : -0.01;
          elem.style.opacity = String(opacity);
        } else {
          clearInterval(fadeInterval);
          if (end === 0) elem.style.display = "none";
        }
      }, timing);
    };

    if (updateLoading) {
      fade(0, 1, 5); // Fade in
    } else {
      fade(1, 0, 5); // Fade out
    }

    return () => clearInterval(fadeInterval);
  }, [updateLoading]);

  return (
    <div>
      <div className="loader">
        <div className="p-4 text-center">
          <div className="custom-loader"></div>
          <h2 className="my-3 f-w-400">Loading..</h2>
          <p className="mb-0">
            Please wait while we get your information from the web
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
