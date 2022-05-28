import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //user's post
  const { document: posts, loading } = useFetchDocuments("posts", null, uid);

  const deleteDocument = (id) => {
  }

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.nopost}>
          <p>Posts don't found </p>
          <Link className="btn" to="/posts/create">
            Create post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Title</span>
            <span>Actions</span>
          </div>
          {posts && posts.map((post) => <div className={styles.post_row} key={post.id}>
            <p>{post.title}</p>

            <div>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>Visualize</Link>
              <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Edit</Link>
              <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>Delete</button>
            </div>
          </div>)}
        </>
      )}
    </div>
  );
};

export default Dashboard;
