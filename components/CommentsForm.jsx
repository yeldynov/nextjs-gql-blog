import { useState, useRef, useEffect } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmit = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: checked } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });

    commentEl.current.value = '';
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-3'>
        Залиште відгук
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          name='comment'
          ref={commentEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 text-gray-700'
          placeholder='Відгук...'
        />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
          <input
            type='text'
            ref={nameEl}
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            placeholder="Ім'я"
            name='name'
          />
          <input
            type='email'
            ref={emailEl}
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            placeholder='Email'
            name='email'
          />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div>
            <input
              type='checkbox'
              ref={storeDataEl}
              id='storeData'
              name='storeData'
              value='true'
            />
            <label className='ml-2' htmlFor='storeData'>
              Зберегти мій email та ім'я для наступних коментарів.
            </label>
          </div>
        </div>
        {error && (
          <p className='text-xs text-red-500'>
            Усі поля обов'язкові для заповнення.
          </p>
        )}
        <div className='mt-8'>
          <button
            type='button'
            onClick={handleCommentSubmit}
            className='transition duration-200 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
          >
            Відправити відгук
          </button>
          {showSuccessMessage && (
            <span className='text-xl float-right font-semibold mt-3 text-green-500'>
              Відгук надіслано на перевірку.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsForm;
