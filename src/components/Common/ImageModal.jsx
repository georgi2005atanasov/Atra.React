// eslint-disable-next-line react/prop-types
const ImageModal = ({ base64Image, name, onClose }) => {
  if (!base64Image) return null;

  const imageUrl = `data:image/jpeg;base64,${base64Image}`;

  return (
    <>
      <div
        className="modal d-block"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" style={{ maxWidth: "400px", maxHeight: "400px" }}>
          <div className="modal-content" style={{ aspectRatio: "1/1" }}>
            <div className="modal-header border-0">
              <h5 className="modal-title">{name}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body text-center d-flex align-items-center justify-content-center">
              <img
                src={imageUrl}
                alt={name}
                className="img-fluid"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
