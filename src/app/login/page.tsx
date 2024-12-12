'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/once-ui/components/Button';
import { Input } from '@/once-ui/components/Input';
import { Flex } from '@/once-ui/components/Flex';
import { Heading } from '@/once-ui/components/Heading';
import { LetterFx } from '@/once-ui/components';
import {useMediaQuery, useTheme} from '@mui/material';
import MatrixBackground from './MatrixBackground';
import styles from './login.module.css'
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <MatrixBackground />
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height={100}
        fillHeight
        fillWidth
        style={{ position: 'relative', zIndex: 1 }}
      >
        <img src='/logo.png' alt='logo' style={{width: isMobile ? '40%' : ''}}/>
        <Heading wrap="balance" variant="display-strong-xl">
          <span className="font-code">
            <LetterFx trigger="instant">Salem</LetterFx>
          </span>
        </Heading>
        <Flex padding="16" direction="column">
          <form style={{ padding: '20px' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Flex width={16}>
              <Input
                id="1"
                label="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Flex>
            <Flex paddingTop="20">
              <Input
                id="2"
                label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Flex>
          </form>
        </Flex>
        <Button type="submit" onClick={handleSubmit} size="l" className={styles.loginbtn}>
          Login
        </Button>
      </Flex>
    </div>
  );
}
