import React, { useState } from 'react'

const EditPostForm = (props) => {
  const [user, setUser] = useState(props.currentUser)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        props.updateUser(user.postId, user)
      }}
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
      <button>Update post</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  )
}

export default EditPostForm