import { useNavigate } from 'react-router-dom';
import { ShieldX, Home, ArrowLeft, Lock } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <div className="d-inline-block p-3 rounded-circle" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                  <ShieldX size={48} className="text-danger" />
                </div>
              </div>

              <h1 className="h2 mb-4">Достъпът е отказан</h1>
              <p className="text-muted mb-4">
                Съжаляваме, нямате разрешение за достъп до тази страница. Моля, свържете се с администратора си,
                ако смятате, че това е грешка.
              </p>

              <div className="card bg-light border-0 mb-4">
                <div className="card-body py-3">
                  <div className="d-flex align-items-center justify-content-center text-muted mb-2">
                    <Lock size={16} className="me-2" />
                    <span>Изисквано ниво на достъп</span>
                  </div>
                  <p className="small text-muted mb-0">
                    Този ресурс изисква допълнителни разрешения.
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <button
                  className="btn btn-light d-flex align-items-center justify-content-center"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft size={16} className="me-2" />
                  Назад
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  onClick={() => navigate('/')}
                >
                  <Home size={16} className="me-2" />
                  Към началната страница
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
