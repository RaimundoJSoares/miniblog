import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments} from '../../hooks/useFetchDocuments'
import { useState } from "react";
import PostDetail from "../../components/postdetail/PostDetail"

//components

const Home = () => {
  const [query, setQuery] = useState("");
  const { document: posts, loading} = useFetchDocuments('posts')

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          placeholder="ou busque por tags"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetail  key={post.id} post={post}/>
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrado Posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
