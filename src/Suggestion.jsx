import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

function Suggestion() {

  const [profile, setProfile ] = useState(null);
  const [suggestions, setSuggestion] = useState([]);
  // const [Following, setFollowing] = useState(false);

  useEffect(()=>{
    fetch('http://localhost:3000/profile')
    .then (data => data.json())
    .then ( data => setProfile(data))
    .catch(err => console.log(err))

   
    fetch('http://localhost:3000/suggestion')
    .then (data => data.json())
    .then ( data => setSuggestion(data))
    .catch(err => console.log(err))

  },[]);

   const handleFollow = async(id , username) => {
    axios.post('http://localhost:3000/followers',{ "id" : id, "username" : username})
    .then(alert("followed"))
    .catch(err => console.log(err))
   }

   

  return (
    <div >
      <div className='suggestions w-75 m-4  position-fixed'>
            {profile ? 
            <div className="d-flex ">
                <img className="db rounded-circle"  src={profile.profile_Pic}  alt ="Profile pic"></img>
                <h5 className='username'>{profile.username}</h5>
                <small className='follow position-fixed text-primary' style={{cursor: 'pointer'}} >Switch</small>
            </div>
            : <p>Loading</p>
          }


          <div className='d-flex'>
            <p>Suggested for you</p>
            <b className='follow position-fixed'>See All</b>
          </div>


           {suggestions.length > 0 ? (
                <div>
                    {suggestions.map((suggestion)=>(
                        <div className='my-3' key={suggestion.id}>
                            <div className="d-flex ">
                                <img className="db rounded-circle" src={suggestion.profile_Pic}  alt ="Profile pic"></img>
                                <h5 className='username'>{suggestion.username}</h5>
                                <a onClick={()=>{handleFollow(suggestion.id , suggestion.username)}} className='follow text-primary  position-fixed' style={{cursor: 'pointer'}} >Follow</a>
                            </div>
                                 
    
                        </div>

                    ))}
                </div>
            ):(
                <div>
                    Loading 
                </div>
            )}


       </div>
    </div>
  )
}

export default Suggestion;
