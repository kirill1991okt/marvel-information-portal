import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelServices from '../../services/MarvelService';

import '../../style/button.scss';
import './formChar.scss';

const FormChar = () => {
  const [char, setChar] = useState(null);
  const { getCharacterByName, clearError } = useMarvelServices();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name).then(onCharLoaded);
  };

  return (
    <>
      <div className="char__form">
        <h2>Or find a character by name:</h2>
        <Formik
          initialValues={{ name: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'This field is required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            updateChar(values.name.toLowerCase());
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="name" placeholder="Enter name" />
              <button
                className="button button__main"
                type="submit"
                disabled={isSubmitting}
              >
                <div className="inner">Find</div>
              </button>
              <ErrorMessage className="error" name="name" component="div" />
            </Form>
          )}
        </Formik>
        {char ? <View name={char.name} /> : null}
      </div>
    </>
  );
};

const View = ({ name }) => {
  return (
    <>
      {name ? (
        <div className="char__response">
          <p className="char__response-good">{`There is! Visit ${name} page?`}</p>
          <Link
            to={`characters/${name.toLowerCase()}`}
            className="button button__main"
          >
            <div className="inner">To Page</div>
          </Link>
        </div>
      ) : (
        <p className="char__response-bad">
          The character was not found. Check the name and try again
        </p>
      )}
    </>
  );
};

export default FormChar;
