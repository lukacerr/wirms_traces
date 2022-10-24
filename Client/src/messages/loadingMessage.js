import { toast } from 'react-toastify';

const str = 'Realizando query...';

export default (theme) =>
  toast.info(str, {
    position: 'bottom-right',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme ?? 'dark',
  });
