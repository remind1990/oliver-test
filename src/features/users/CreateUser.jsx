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
  align-items: center;
`;
function CreateUser() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.length < 3) {
      setError('Username must be at least 3 characters long');
    } else {
      setError('');
    }
  };

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
        variation="innerText"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={handleUsernameChange}
        className="input mb-8 w-72"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {username.length > 3 && (
        <div>
          <button>Start Building your Layout</button>
        </div>
      )}
    </StyledCreateUser>
  );
}

export default CreateUser;
