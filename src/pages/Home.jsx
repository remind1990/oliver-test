import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TypewriterText from '../features/ui/TypeWritterText';
import CreateUser from '../features/users/CreateUser';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  return (
    <StyledHome>
      <TypewriterText text="Build your own layout components. Easy to create and use" />

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
