import React, { useState } from 'react'
import Constants from '../utilities/Constants'

const AddPostForm = (props) => {
  const initialFormState = { postId: null, title: '', content: '' }
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (!user.title || !user.content) return

        props.addUser(user)

        const postToCreate = {
          postId: 0,
          title: user.title,
          content: user.content
      };

      const url = Constants.API_URL_CREATE_POST;

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(postToCreate)
      })
          .then(response => response.json())
          .then(responseFromServer => {
              console.log(responseFromServer);
          })
          .catch((error) => {
              console.log(error);
              alert(error);
          });

        setUser(initialFormState)
        props.onPostCreated(postToCreate);
      }
    }
    >
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={user.title}
        onChange={handleInputChange}
      />
      <label>Content</label>
      <input
        type="text"
        name="content"
        value={user.content}
        onChange={handleInputChange}
      />
      <button>Add new post</button>
    </form>
  )
}

export default AddPostForm