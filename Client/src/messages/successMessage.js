import { toast } from 'react-toastify';

export default (theme, results) =>
  toast.success(`Query completada, ${results} resultados.`, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme ?? 'dark',
  });
