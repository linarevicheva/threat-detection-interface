'use client';
import { Flex } from '@/once-ui/components/Flex';
import { Heading } from '@/once-ui/components/Heading';
import { LetterFx, IconButton } from '@/once-ui/components';
import EmailSignUpForm from '@/app/components/emailSignUp';

export default function Notifications() {
  return (
    <Flex
    alignItems='center'
    direction='column'
    height={100}
    fillHeight
    fillWidth
    paddingTop='160'
    >
    
      <Heading wrap="balance" variant="display-strong-xl" gap='20'>
      
                <span className="font-code" style={{display: 'flex', flexDirection: 'row', gap: '10%', marginLeft: '-20%'}}>
                <IconButton icon='chevronLeft' href='/' size='l'/>
                <LetterFx trigger="instant">Salem</LetterFx>
                </span>
      </Heading>
    <Flex>
        <EmailSignUpForm />
    </Flex>
    </Flex>
  );
}
