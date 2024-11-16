import { base64ToFile } from "../../../utils/commonUtils";

export const useHandlers = () => {

};

export const convertToFormData = (formData) => {
  const form = new FormData();

  form.append("name", formData.name);
  form.append("detailsPrices", JSON.stringify(formData.detailsPrices));
  if (formData.image) {
    if (typeof formData.image === "string") {
      form.append("image", base64ToFile(formData.image, "DEFAULT_IMAGE.png"));
    } else {
      form.append("image", formData.image);
    }
  }
  if (formData.labourPrice !== null && formData.labourPrice !== "")
    form.append("labourPrice", formData.labourPrice);

  return form;
};
