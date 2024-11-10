/* eslint-disable react/prop-types */
import { Image, X } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { renderBase64Image } from "../../../utils/renderers";

const ImageField = ({
  fileInputRef,
  handleImageUpload,
  handleUploadClick,
  handleRemoveImage,
  formData,
}) => {
  // it is either in base64 or getting it from the user, so this may do the work
  const getImage = () => {
    try {
      return URL.createObjectURL(formData.image);
    } catch {
      return formData.image ? renderBase64Image(formData.image) : null;
    }
  }

  return (
    <div className="col-6 mt-4">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: "none" }}
        />

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "2px dashed #ccc",
            borderRadius: 2,
            cursor: "pointer",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
          onClick={handleUploadClick}
        >
          <IconButton
            color="primary"
            aria-label="upload image"
            component="span"
            sx={{
              width: 60,
              height: 60,
              "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
            }}
          >
            <Image size={32} />
          </IconButton>
          <Typography variant="body1" color="textSecondary">
            Кликнете, за да добавите изображение
          </Typography>
        </Paper>

        {formData.image && (
          <Paper
            elevation={2}
            sx={{
              position: "relative",
              maxWidth: 500,
              width: "100%",
              mt: 2,
            }}
          >
            <IconButton
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
                boxShadow: 1,
              }}
              size="small"
            >
              <X size={20} />
            </IconButton>
            <img
              src={getImage()}
              alt="Uploaded preview"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: 8,
                display: "block",
              }}
            />
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default ImageField;
