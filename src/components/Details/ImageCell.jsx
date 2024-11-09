import { useState } from "react";
import ImageModal from "./ImageModal";

// ImageCell.jsx
// eslint-disable-next-line react/prop-types
const ImageCell = ({ base64Image, modalImage, name }) => {
    const [showModal, setShowModal] = useState(false);
    const imageUrl = base64Image ? `data:image/jpeg;base64,${base64Image}` : null;
  
    return (
      <td style={{ width: "100px" }}>
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={name}
              className="img-fluid rounded cursor-pointer"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer"
              }}
              loading="lazy"
              onClick={() => setShowModal(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.png";
              }}
            />
            {showModal && (
              <ImageModal
                base64Image={modalImage}
                name={name}
                onClose={() => setShowModal(false)}
              />
            )}
          </>
        ) : (
          <div 
            className="bg-light rounded d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px"
            }}
          >
            <span className="text-muted">No image</span>
          </div>
        )}
      </td>
    );
  };
  
  export default ImageCell;