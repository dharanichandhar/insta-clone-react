import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Stories() {
const [stories, setStories ] = useState([]);

const navigate = useNavigate()

let tot = 0;
  
useEffect(()=>{
  axios
  .get('https://my-json-server.typicode.com/dharanichandhar/insta-api/posts')
  .then(data => setStories(data))
  .catch(err => console.log(err))
},[]);

return (
    <div className='story d-flex '>
      <div className='d-none'> {tot=stories.length}</div>
      {stories.length > 0 ? (
        stories.map((story=>(
          <div key={story.id} className='mx-1' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
            <div className='gradient-border'>
                   <img src={story.user.profile_Pic} alt="db" className='story-db rounded-circle ' />
            </div>
            <p className='text-truncate' style={{width : "50px"}}>{story.user.username}</p>
          </div>
        )))
      ) : ( 
        <p>Loading</p>
      )}

    </div>
  )
}

export default Stories
