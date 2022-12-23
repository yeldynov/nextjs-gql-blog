import { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getComments } from '../services';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  const commentWord = (commentsLength) => {
    switch (commentsLength) {
      case 1:
        return 'Відгук';
      case 2:
      case 3:
      case 4:
        return 'Відгуки';
      default:
        'Відгуків';
    }
  };

  useEffect(() => {
    getComments(slug)
      .then((comments) => setComments(comments))
      .catch((err) => console.log(err));
  }, [slug]);

  console.log(comments);

  return (
    <>
      {comments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length} {commentWord(comments.length)}
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className='border-b border-gray-100 mb-4 pb-4'
            >
              <p className='flex gap-5'>
                {moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
                <span className='font-semibold'>{comment.name}</span>{' '}
                <small> {comment.email}</small>
              </p>
              <p className='mb-4'></p>
              <p className='whitespace-pre-line text-gray-600 w-full'>
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
      {comments.length === 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl font-semibold'>
            Поки немає відгуків. Будь першим!
          </h3>
        </div>
      )}
    </>
  );
};

export default Comments;
