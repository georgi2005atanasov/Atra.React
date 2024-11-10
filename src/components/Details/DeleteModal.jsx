import ReactDOM from 'react-dom';
import './DeleteModal.css'; // Custom CSS for additional responsiveness

const DeleteModal = ({ handleDelete, setDeleteModal, deleteModal }) => {
    return ReactDOM.createPortal(
        <>
            <div className="modal-backdrop fade show w-100 h-100" />
            <div className="modal d-flex justify-content-center align-items-center" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-sm modal-md modal-lg">
                    <div className="modal-content p-3">
                        <div className="modal-header">
                            <h5 className="modal-title">Потвърждение за изтриване</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setDeleteModal({ isOpen: false, companyName: "" })}
                            />
                        </div>
                        <div className="modal-body">
                            <p className="mb-0">
                                Сигурен ли сте че искате да изтриете &apos;
                                {deleteModal.detailName}&apos;?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setDeleteModal({ isOpen: false, detailName: "", detailId: null })}
                            >
                                Отказ
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete(deleteModal.detailId)}
                            >
                                Изтрий
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('root')
    );
};

export default DeleteModal;