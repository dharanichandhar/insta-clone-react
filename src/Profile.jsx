import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

      const [profile, setProfile] = useState(null);

      const [followers, setFollowers] = useState([]);

      const [unfollowed , setUnfollowed] =useState(0);

    useEffect(()=>{
        axios.get('https://my-json-server.typicode.com/dharanichandhar/insta-api/profile')
        .then(data => setProfile(data.data))
        .catch(err=> console.log(err))

        axios.get('https://my-json-server.typicode.com/dharanichandhar/insta-api/followers')
        .then(data => setFollowers(data.data))
        .catch(err=> console.log(err))
    },[unfollowed])

    function handleOnChange(e){
        setProfile(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = async ()=>{
        axios.put('https://my-json-server.typicode.com/dharanichandhar/insta-api/profile', profile)
        .then(console.log("Updated"))
        .catch(err => console.log(err))
    }

      const handleUnFollow = async(id)=>{
    axios.delete(`https://my-json-server.typicode.com/dharanichandhar/insta-api/followers/${id}`)
    .then(alert("unfollwed"))
    .then(setUnfollowed(!unfollowed))
    .catch(err => console.log(err))
   }

  return (
    <div className='m-5'> 
      {profile ? (
        <div>
            <img src={profile.profile_Pic} alt="" className='profile rounded-circle' />
            <h5>{profile.username}</h5>
            
            <input type="text" 
            value={profile.username}
            name = "username"
            className='form-control my-4'
            onChange= {handleOnChange}
            />

            <input type="text" 
            name="profile_Pic"
            value={profile.profile_Pic}
            className='form-control'
             onChange= {handleOnChange}
             />

             <button onClick={handleUpdate} className='btn btn-primary my-4' >Update</button>
      </div>
      ) : 
      (
        <div>
            Loading profile
        </div>
      )}

      {followers.length > 0 ? (
            followers.map(follower => (
                <div key={follower.id} className="d-flex my-2">
                    {follower.username}
                    <button className='btn btn-primary ms-auto' onClick={()=>{handleUnFollow(follower.id)}}>Un Follow</button>
                </div>
            ))
      ): 
      (
        <div> Loading followers</div>
      )}

    </div>
  )
}

export default Profile
