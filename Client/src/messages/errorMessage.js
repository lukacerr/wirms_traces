import { toast } from 'react-toastify';

const str = 'Error. Revise la response.';

export default (theme) =>
  toast.error(str, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme ?? 'dark',
  });
