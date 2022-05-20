import styles from './about.module.css'
import { Link } from 'react-router-dom'

const about = () => {
  return (
    <div className={styles.about}>
      <h2>About the My <span>Blog</span> </h2>
      <p>This project was made using a front-end React JS, CSS, JavaScript and Firebase for back-end </p>

      <Link to='/posts/create' className='btn'>Create Post</Link>
    </div>
  )
}

export default about
