import styles from './CreatePosto.module.css'

import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuthValue} from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {

  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [ tags, setTags ] = useState([])
  const [formError, setFormError] = useState('')

  const { user } = useAuthValue()

  const { insertDocument, response} = useInsertDocument('posts')
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    //validate image URL
    try {
      
      new URL(image)

    } catch (error) {
      setFormError("The image needs to be an URL!")
    }

    //create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Please fill all the fields")
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid:user.uid,
      createdBy: user.displayName,
    })

    //redirect to home page
    navigate('/')
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
        {!response.loading && <button className="btn">Register</button>}
        { response.loading && (
          <button className='btn' disabled>
            Waiting...
          </button>
        )}
        {response.error &&  <p className ='error'>{response.error}</p>}
        {formError &&  <p className ='error'>{formError}</p>}
      </form>
    </div>
  )
}
 
export default CreatePost
