import axios from 'axios';
import  { useEffect, useState } from 'react'

function Posts() {

const [posts , setPosts] = useState([]);

useEffect(()=>{
    axios
    .get("https://my-json-server.typicode.com/dharanichandhar/insta-api/posts")
    .then((data=>setPosts(data.data)))
    .catch(err=> console.log(err))
},[]);

  return (
    <div className='d-flex justify-content-center'>
            {posts.length > 0 ? (
                <div>
                    {posts.map((post)=>(
                        <div className='my-3' key={post.id}>
                            <div className="d-flex">
                                <img className="db rounded-circle" src={post.user.profile_Pic}  alt ="Profile pic"></img>
                                <h5 className='username'>{post.user.username}</h5>
                            </div>
                                 {post.image ? (
                                    <img className="image" src={post.image} alt="" />
                                    ) : post.video ? (
                                    <video className="image" src={post.video} controls  />
                                    ) : null}


                            <div>
                                <i className="bi bi-heart"></i>
                                <i className="bi bi-chat"></i>
                                <i className="bi bi-send"></i>
                            </div>

                            <div>
                                <b>{post.likes} Likes</b>
                            </div>

                            <div>
                                {post.caption}
                            </div>
    
                        </div>

                    ))}
                </div>
            ):(
                <div>
                    Loading posts
                </div>
            )}
    </div>
  )
}

export default Posts
