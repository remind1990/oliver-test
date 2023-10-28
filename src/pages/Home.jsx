import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateUser from '../features/users/CreateUser';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledH1 = styled.h1`
  text-align: center;
`;
function Home() {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  return (
    <StyledHome>
      <StyledH1>
        Build your own layout components
        <br />
        Easy to create and use
      </StyledH1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <button onClick={() => navigate('/dashboard')}>
          Lets now move to building your layout, {username}
        </button>
      )}
    </StyledHome>
  );
}

export default Home;
