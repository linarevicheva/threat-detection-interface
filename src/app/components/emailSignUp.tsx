import React, { useState } from 'react';
import { Button, Input, Flex} from '@/once-ui/components';

export default function EmailSignUpForm() {
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
    <Flex>
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
        <Flex paddingY='40'
        >
        <Input
          type="email"
          label="Enter your email"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        style={{width: '270px'}}
        />
        </Flex>
      <Button type="submit" size='l'>Subscribe</Button>
      <p style={{marginTop: '10%'}}>{status}</p>
    </form>
    </Flex>
  );
}
