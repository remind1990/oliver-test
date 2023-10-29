import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TypewriterText from '../features/ui/TypeWritterText';
import CreateUser from '../features/users/CreateUser';
import { motion } from 'framer-motion';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AnimatedStyledHome = motion(StyledHome);
function Home() {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  return (
    <AnimatedStyledHome
      initial={{
        y: 0,
      }}
      animate={{
        y: 0, // Keep it at 0 for the initial state
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        y: -window.innerHeight, // Move it off the top of the screen
        transition: {
          duration: 0.5,
        },
      }}
    >
      <TypewriterText text="Build your own layout components. Easy to create and use" />

      {username === '' ? (
        <CreateUser />
      ) : (
        <button onClick={() => navigate('/dashboard')}>
          Lets now move to building your layout, {username}
        </button>
      )}
    </AnimatedStyledHome>
  );
}

export default Home;
