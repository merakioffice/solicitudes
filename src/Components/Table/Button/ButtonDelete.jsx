import { fetchDelete } from '../../../api/api';

const ButtonDelete = (props) => {
  const { url, uid, msg, toast } = props;
  console.log(toast);
  fetchDelete(`${url}/${uid}`).then(() => {
    toast.current.show({
      severity: 'success',
      summary: 'Eliminado',
      detail: `${msg} eliminado correctamente`,
      life: 3000,
    });
  });
};

export default ButtonDelete;
