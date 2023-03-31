import ErrorMessage from '../errorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';

import '../../style/style.scss';

const Page404 = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <ErrorMessage />
      <p className='error-text'>Page dosen't exist</p>
      <button onClick={goBack} className='button-back'>
        Go back
      </button>
    </div>
  );
};

export default Page404;
