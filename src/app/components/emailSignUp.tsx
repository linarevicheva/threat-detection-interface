import React, { useState } from 'react';
import { Button, Input, Flex } from '@/once-ui/components';
import { useMediaQuery, useTheme } from '@mui/material';

export default function EmailSignUpForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setStatus('Subscription successful!');
      setEmail('');
    } else {
      setStatus('Failed to subscribe. Try again later.');
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{
        padding: isMobile ? '10px' : '20px',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Flex paddingY={ isMobile ? '20' : '40'} style={{ width: '100%' }}>
          <Input
            type="email"
            label="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: isMobile ? '200px' : '250px',
              padding: '10px',
              fontSize: '16px',
            }}
          />
        </Flex>
        <Button type="submit" size="l" style={{ width: '100%', maxWidth: isMobile ? '150px' : '200px' }}>
          Subscribe
        </Button>
        <p style={{ marginTop: '10%', textAlign: 'center', fontSize: '14px' }}>{status}</p>
      </form>
    </Flex>
  );
}
