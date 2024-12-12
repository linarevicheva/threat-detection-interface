'use client';
import { Flex } from '@/once-ui/components/Flex';
import { Heading } from '@/once-ui/components/Heading';
import { LetterFx, IconButton } from '@/once-ui/components';
import EmailSignUpForm from '@/app/components/emailSignUp';
import {useMediaQuery, useTheme} from '@mui/material';
import MatrixBackground from '../login/MatrixBackground';

export default function Notifications() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden'}}>
    <Flex
    alignItems='center'
    direction='column'
    height={100}
    fillHeight
    fillWidth
    paddingTop='160'
    style={{
      width: isMobile ? '100%' : '100%',
      maxWidth: isMobile ? '430px' : '100%',
      marginLeft: isMobile ? '4%' : '0'
    }}
    >
      <MatrixBackground />
      <Heading wrap="balance" variant={isMobile ? 'display-strong-l' : "display-strong-xl"} style={{marginLeft: isMobile ? '15%' : '0'}}>
      
                <span className="font-code" style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10%', marginLeft: '-20%'}}>
                <IconButton icon='chevronLeft' href='/' size='l' style={{marginLeft: isMobile ? '-10%' : '0'}}/>
                <LetterFx trigger="instant">Salem</LetterFx>
                </span>
      </Heading>
    <Flex style={{marginLeft: isMobile ? '-20px' : '0'}}>
        <EmailSignUpForm />
    </Flex>
    </Flex>
    </div>
  );
}