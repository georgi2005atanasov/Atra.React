import { TextField } from "@mui/material";
import { CompaniesApi } from "../../../services/Companies/Api";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useLoading } from "../../../utils/hooks";
import Storage from "../../../utils/storage/Storage";
import TopBarGA from "../../../components/Dashboard/TopBarGA";
import BackButtonGA from "../../../components/Common/BackButtonGA";

const CompanyForm = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [companyName, setCompanyName] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const validateName = (name) => {
    if (!name.trim()) {
      return "Името е задължително";
    }
    if (name.length < 2) {
      return "Името трябва да е поне 2 символа";
    }
    if (name.length > 50) {
      return "Името не може да е по-дълго от 50 символа";
    }
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCompanyName(value);
    if (touched) {
      setError(validateName(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTouched(true);

    const validationError = validateName(companyName);
    setError(validationError);

    if (!validationError) {
      try {
        const response = await CompaniesApi.get().create({
          name: companyName,
        });

        if (response.success) {
          setCompanyName("");
          setTouched(false);
          setError("");
          navigate(`/private/companies/all`, { replace: true });
        } else {
          setError(error || "Възникна грешка при създаването на компанията");
        }
        setLoading(false);
      } catch (ex) {
        const error = await ex.response.data.error;
        setError(error || "Възникна грешка при създаването на компанията");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-md-center align-items-md-center align-items-start m-md-0 m-3 vh-100">
        <div className="card" style={{ width: "100%" }}>
          <div className="position-absolute">
            <BackButtonGA />
          </div>
          <div className="card-header text-center">
            <h3 className="card-title mb-0">Добави компания</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-12">
                <TextField
                  fullWidth
                  label="Име на компанията"
                  name="name"
                  onChange={handleNameChange}
                  value={companyName}
                  error={error}
                  color="error"
                />
                {error && <h6 className="mt-2 text-danger">{error}</h6>}
              </div>

              <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="btn btn-danger w-100">
                  Добави
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
