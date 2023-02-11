import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

import '../../style/style.scss';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p className='error-text'>Page dosen't exist</p>
      <Link to={'/'} className='error-link'>
        Go to maim page
      </Link>
    </div>
  );
};

export default Page404;
