import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateName } from './userSlice';
import { Input } from '../ui/Input';
import styled from 'styled-components';

const StyledCreateUser = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 21rem;
`;
function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate('/dashboard');
  }

  return (
    <StyledCreateUser onSubmit={handleSubmit}>
      <p>👋 Welcome! Please enter your name to start:</p>

      <Input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== '' && (
        <div>
          <button>Start Building your Layout</button>
        </div>
      )}
    </StyledCreateUser>
  );
}

export default CreateUser;
