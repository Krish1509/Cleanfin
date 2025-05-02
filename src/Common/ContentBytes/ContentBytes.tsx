import React from "react";
import { IContentbytes } from "../../pages/Pages/UserDashboard/Helper/interfaces";
import audio from "../../assets/images/user/audio.jpg";
import video from "../../assets/images/user/video.jpg";
import file from "../../assets/images/user/file.jpg";
import { useNavigate } from "react-router-dom";

//import Components

interface IContentbytesProps {
  data: IContentbytes;
  uri?: string;
}

const ContentBytes: React.FC<IContentbytesProps> = ({ data, uri = "content" }) => {
  const navigate = useNavigate();
  
  return (
    <React.Fragment>
      <div className="mb-3" onClick={() => navigate(`/${uri}/view`, { state: { id: data._id } })}>
        <div className="card overflow-hidden">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="position-relative">
                <img
                  src={
                    data.type === "audio"
                      ? audio
                      : data.type === "video"
                      ? video
                      : file
                  }
                  className="img-fluid rounded-md-start fixed-image-size"
                  alt="card-image"
                />
                <div className="position-absolute bottom-0 end-0 m-2">
                  <>
                    {data.type === "audio" && (
                      <i className="ph-duotone ph-music-note text-white fs-2"></i>
                    )}
                    {data.type === "video" && (
                      <i className="fa fa-play-circle text-white fs-2"></i>
                    )}
                    {data.type === "file" && (
                      <i className="ph-duotone ph-file-text text-white fs-2"></i>
                    )}
                  </>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body d-flex flex-column justify-content-between h-100">
                <h5 className="card-title">{data?.title}</h5>

                <div className="card-text d-flex justify-content-between align-items-center">
                  <div className="d-flex align-middle">
                    <small className="text-muted d-flex gap-1 align-items-center">
                      <i className="ti ti-clock f-13"></i>
                      {data?.uploaded}
                    </small>
                  </div>
                  <span className="badge bg-light-primary ms-2">
                    {data?.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContentBytes;
