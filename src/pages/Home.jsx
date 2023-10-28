import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateUser from '../features/users/CreateUser';

function Home() {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        Build your own layout components
        <br />
        Easy to create and use
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <button onClick={() => navigate('/dashboard')}>
          Lets now move to building your layout, {username}
        </button>
      )}
    </div>
  );
}

export default Home;
