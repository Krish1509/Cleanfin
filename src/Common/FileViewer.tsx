import React, { useState, useEffect, CSSProperties } from "react";

const validFileExtensions = [
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "mp4",
  "avi",
  "mkv",
  "mov",
  "mp3",
  "wav",
  "ogg",
  "flac",
  "webm",
  "mpg",
  "mpeg",
];

const defaultStyles = {
  container: {
    flexDirection: "column",
    padding: "auto",
  } as CSSProperties,
  svg: {
    position: "relative",
    userSelect: "none",
    display: "inline-block",
    height: "42px",
    fill: "grey",
  } as CSSProperties,
  noPreviewText: {
    color: "rgb(128, 144, 162)",
    fontSize: "12px",
    textAlign: "center",
  } as CSSProperties,
};

type FilePreviewProps = {
  type?: "url" | "file";
  file?: File | null;
  url?: string;
  width?: string;
  height?: string;
  invalidExtensions?: string[];
  styles?: typeof defaultStyles;
  onError?: (message: string | Error) => void;
};

type FileState = {
  preview: "imgPreview" | "docPreview" | "noURL";
  type: "url" | "file";
  file: File | null;
  url: string;
};

function getFileUrl({
  type,
  url,
  file,
  onError,
}: Pick<FilePreviewProps, "type" | "url" | "file" | "onError">): {
  url: string;
  preview: "imgPreview" | "noURL";
} {
  let resolvedUrl = url || "";
  if (type === "file" && file) {
    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!fileExtension || !validFileExtensions.includes(fileExtension)) {
        const msg = `${file.name} is not a valid file.`;
        if (onError) {
          onError(msg);
        } else {
          alert(msg);
        }
      } else {
        resolvedUrl = URL.createObjectURL(file);
      }
    } catch (err) {
      if (onError) {
        onError(err as Error);
      } else {
        alert(err);
      }
    }
  }
  return {
    url: resolvedUrl,
    preview: resolvedUrl !== "" ? "imgPreview" : "noURL",
  };
}

const FilePreview: React.FC<FilePreviewProps> = ({
  type = "url",
  file = null,
  url = "",
  width = "100%",
  height = "auto",
  styles = defaultStyles,
  onError,
}) => {
  const [state, setState] = useState<FileState>(() => {
    const { url: initialUrl, preview } = getFileUrl({ type, url, file, onError });
    return {
      preview,
      type,
      file,
      url: initialUrl,
    };
  });

  const objPreviewStyle: CSSProperties = {
    width: "100%",
    height,
    objectFit: "contain"
  };

  useEffect(() => {
    const { url: newUrl, preview } = getFileUrl({ type, url, file, onError });
    setState({
      preview,
      type,
      file,
      url: newUrl,
    });
  }, [type, file, url, onError]);

  const { preview, url: resolvedUrl } = state;

  return (
    <div
      style={{
        ...styles.container,
        width,
      }}
    >
      {preview === "imgPreview" ? (
        <img
          src={resolvedUrl}
          onError={() => setState((prev) => ({ ...prev, preview: "docPreview" }))}
          style={objPreviewStyle}
          alt="Preview"
        />
      ) : preview === "docPreview" ? (
        <object
          style={{
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            aspectRatio: "4/3",
          }}
          data={resolvedUrl}
        ></object>
      ) : (
        <div style={{ ...styles.container, padding: "5em" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <svg color="grey" viewBox="0 0 24 24" style={styles.svg}>
              <g>
                <path d="M2.25 24A2.252 2.252 0 0 1 0 21.75V2.25A2.252 2.252 0 0 1 2.25 0h19.5A2.252 2.252 0 0 1 24 2.25v19.5A2.252 2.252 0 0 1 21.75 24H2.25zm0-22.5a.75.75 0 0 0-.75.75v19.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V2.25a.75.75 0 0 0-.75-.75H2.25z"></path>
                <path d="M16.5 11.25c-2.068 0-3.75-1.682-3.75-3.75s1.682-3.75 3.75-3.75 3.75 1.682 3.75 3.75-1.682 3.75-3.75 3.75zm0-6c-1.241 0-2.25 1.009-2.25 2.25s1.009 2.25 2.25 2.25 2.25-1.009 2.25-2.25-1.009-2.25-2.25-2.25zM15.655 19.858a.746.746 0 0 1-.699-.478 7.507 7.507 0 0 0-1.132-1.96l-.021-.026a7.364 7.364 0 0 0-3.819-2.495 7.485 7.485 0 0 0-1.979-.268 7.442 7.442 0 0 0-3.674.98.754.754 0 0 1-1.023-.281.751.751 0 0 1 .28-1.023 8.936 8.936 0 0 1 4.415-1.177 8.97 8.97 0 0 1 2.376.322 8.892 8.892 0 0 1 4.1 2.441 5.243 5.243 0 0 1 2.902-.879c1.219 0 2.402.427 3.331 1.204a.743.743 0 0 1 .266.509.743.743 0 0 1-.172.548.747.747 0 0 1-1.056.094 3.699 3.699 0 0 0-2.369-.855c-.692 0-1.375.195-1.957.555a8.833 8.833 0 0 1 .928 1.769.747.747 0 0 1-.697 1.02z"></path>
              </g>
            </svg>
            <span style={styles.noPreviewText}>No Preview Available</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
