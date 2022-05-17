import React ,{ useEffect, useState } from 'react'
import UserTable from './tables/UserTable'
import AddPostForm from './forms/AddPostForm';
import EditPostForm from './forms/EditPostForm';
import Constants from "./utilities/Constants";

const App = () => {

  useEffect(() => {
    //alert("I have been mounted")
    getPosts()
  }, [])

  const [editing, setEditing] = useState(false)

  const initialFormState = { postId: null, title: '', content: '' }

  const [currentUser, setCurrentUser] = useState(initialFormState)

  const editRow = (user) => {
    setEditing(true)
    setCurrentUser({ postId: user.postId, title: user.title, content: user.content })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
    
    const url = Constants.API_URL_UPDATE_POST;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
        .then(response => response.json())
        .then(responseFromServer => {
            console.log(responseFromServer);
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
    

    setPosts(users.map((user) => (user.postId === id ? updatedUser : user)))
  }

  const deleteUser = (id) => {
    setPosts(users.filter((user) => user.postId !== id))
    deletePost(id)
  }

  const [users, setPosts] = useState([])

  const addUser = (user) => {
    //user.postId = users.length + 1
    setPosts([...users, user])
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit post</h2>
              <EditPostForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add new post!</h2>
              <AddPostForm addUser={addUser} onPostCreated={onPostCreated} />
            </div>
          )}
        </div>
        <div className="flex-large">
          {/*
          <button onClick={getPosts} >Get Posts from server</button>
          <button onClick={() => setPosts([])}>Empty React posts array</button>
          */}
          <h2>View posts</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>
        </div>
      </div>
      
    </div>
  )

  function deletePost(postId) {
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function getPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(postsFromServer => {
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function onPostCreated(createdPost) {

    if (createdPost === null) {
      return;
    }

    alert(`Post successfully created. After clicking OK, your new post tilted "${createdPost.title}" will show up in the table below.`);

    getPosts();
  }

}

export default App
