import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateToast({ message, type }) {
    const notify = () => {
        toast[type](message, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            hideProgressBar:true,
        });
    };
    notify();

    return (
        <ToastContainer />
    );
}

export default CreateToast;