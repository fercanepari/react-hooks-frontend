import React from 'react'

const UserTable = (props) => (
  <table>
    <thead>
    <tr>
        <th>PostId (PK)</th>
        <th>Title</th>
        <th>Content</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    {props.users.length > 0 ? (
        props.users.map((user) => (
      <tr key={user.postId}>
        <td>{user.postId}</td>
        <td>{user.title}</td>
        <td>{user.content}</td>
        <td>
          <button onClick={() => {
                        props.editRow(user)
                    }} 
                  className="button muted-button">Edit</button>
          <button onClick={() =>  props.deleteUser(user.postId) 
                    } 
                  className="button muted-button">Delete</button>
        </td>
      </tr>
      ))
      ) : (
        <tr>
          <td colSpan={3}>No posts</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable