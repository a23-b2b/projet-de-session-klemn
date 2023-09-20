import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    return (
        <div className={styles.body}>
            <BlogueForm />
        </div>
    );
}

export default Home;
