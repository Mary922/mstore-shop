
const ConfirmModal = ({show, close, text, func, title}) => {

    return (
        <>
            {show && <div className="backdrop"></div>}
            <div className="modal shadow-lg" open={show}>
                <div className="modal-box bg-neutral-content">
                    <h3 className="font-bold text-lg flex items-center justify-center">{title}</h3>
                    <p className="py-4 flex items-center justify-center text-lg">{text}</p>
                    <div className="modal-action">
                        <div className='flex gap-3'>
                            <button className="btn btn-neutral btn-md text-white hover:text-white hover:bg-gray-600"
                                    onClick={async () => {
                                        func();
                                        close(false);
                                    }}>Да
                            </button>
                            <button className="btn btn-neutral btn-md text-white hover:text-white hover:bg-gray-600"
                                    onClick={() => close(false)}>Нет
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ConfirmModal;