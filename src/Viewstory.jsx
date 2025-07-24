import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import axios

function Viewstory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage if invalid id
    if (id > tot || id <= 0) {
      navigate('/');
      return;
    }

    axios
      .get(`https://my-json-server.typicode.com/dharanichandhar/insta-api/story/${id}`) // ✅ axios call
      .then(res => setStory(res.data))
      .catch(err => console.log(err));
  }, [id, tot, navigate]);

  return (
    <div>
      {story ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Link to={`/story/${Number(id) - 1}/${tot}`}>
            <i className='bi bi-arrow-left-circle-fill'></i>
          </Link>
          <img className='vh-100' src={story.image} alt='' />
          <Link to={`/story/${Number(id) + 1}/${tot}`}>
            <i className='bi bi-arrow-right-circle-fill'></i>
          </Link>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Viewstory;
