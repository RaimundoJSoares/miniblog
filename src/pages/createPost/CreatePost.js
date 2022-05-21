import styles from './CreatePosto.module.css'

import { useState } from "react"

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [ tags, setTags ] = useState([])
  const [formError, setFormError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Write what you like and share your knowledge</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input type="text" name="title" placeholder='Your Title here' required 
          value={title}
          onChange={(e) =>setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL of Image:</span>
          <input type="text" name="image" placeholder='Select your image' required 
          value={image}
          onChange={(e) =>setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Body:</span>
          <textarea  name="body" placeholder='Write your content' required 
          value={body}
          onChange={(e) =>setBody(e.target.value)}
          />
        </label>
        <label>
          <span>Tag:</span>
          <input type="text" name="tags" placeholder='Write your tags here' required 
          value={tags}
          onChange={(e) =>setTags(e.target.value)}
          />
        </label>
        <button className="btn">Send </button>
      </form>
    </div>
  )
}
 
export default CreatePost
