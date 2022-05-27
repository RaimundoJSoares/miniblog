//import style from './Post.module.scss';
import { useParams } from 'react-router-dom';
import { useFetchPosts } from '../../hooks/useFetchPosts';
import styles from './Post.module.css';


const Post = () => {
    const {id} = useParams()
    const {posts, loading} = useFetchPosts('posts', id)
   

  return (
    <div className={styles.post_container}>
        {loading && <p>Loading...</p>}
        {posts && (
            <>
                <h1>{posts.title}</h1>
                <img src={posts.image} alt={posts.title}/>
                <p>{posts.body}</p>
                <h3>This Post is about: </h3>
               <div className={styles.tags}>
               {posts.tagsArray.map((tag => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}

                    </p>
                )))}
               </div>

            </>
        )}
    </div>
  )
}

export default Post