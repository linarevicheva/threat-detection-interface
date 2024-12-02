'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';;
import { Heading, Text, Flex, Button, Grid, Icon, Logo, Background, LetterFx } from '@/once-ui/components';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const links = [
    {
      href: '/dashboard',
      title: 'Monitor',
      description: 'Go to main dashboard.',
    },
    {
      href: '/notifications',
      title: 'Stay tuned',
      description: 'Set up notifications.',
    },
  ];

  const handleEmail = () => {
    window.location.href = 'mailto:linarevicheva@gmail.com';
  };

  return (
    <Flex
      fillWidth
      paddingTop="l"
      paddingX="xl"
      direction="column"
      alignItems="center"
      flex={1}
    >
      <Background dots={false} />
      <Flex
        position="relative"
        as="section"
        overflow="hidden"
        fillWidth
        minHeight="0"
        maxWidth={52}
        direction="column"
        alignItems="center"
        flex={1}
      >
        <Flex
          as="main"
          direction="column"
          justifyContent="center"
          fillWidth
          fillHeight
          padding="l"
          gap="l"
        >
          <Flex mobileDirection="column" fillWidth gap="24">
            <Flex position="relative" flex={2} paddingTop="56" paddingX="xl">
              <Logo size="xl" icon={false} style={{ zIndex: '1' }} />
            </Flex>
            <Flex
              position="relative"
              flex={4}
              gap="24"
              marginBottom="104"
              direction="column"
            >
              <Heading wrap="balance" variant="display-strong-xl">
                <span className="font-code">
                  <LetterFx trigger="instant">Salem</LetterFx>
                </span>
              </Heading>
              <Heading wrap="balance" variant="display-strong-s">
                <span className="font-code">
                  <LetterFx trigger="instant">
                    We hunt before you know
                  </LetterFx>
                </span>
              </Heading>
              <Button
                href="/dashboard"
                suffixIcon="chevronRight"
                variant="secondary"
              >
                Start now
              </Button>
            </Flex>
          </Flex>
          <Grid
            radius="l"
            border="neutral-medium"
            borderStyle="solid-1"
            columns="repeat(2, 1fr)"
            tabletColumns="1col"
            mobileColumns="1col"
            width={40}
          >
            {links.map((link) => (
              <Link
                target="_blank"
                style={{ padding: 'var(--responsive-space-l)' }}
                key={link.href}
                href={link.href}
              >
                <Flex
                  fillWidth
                  paddingY="8"
                  gap="8"
                  direction="column"
                >
                  <Flex fillWidth gap="12" alignItems="center">
                    <Text variant="body-strong-m" onBackground="neutral-strong">
                      {link.title}
                    </Text>
                    <Icon size="s" name="arrowUpRight" />
                  </Flex>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {link.description}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Grid>
        </Flex>
      </Flex>
      <Flex
        as="footer"
        position="relative"
        fillWidth
        paddingX="l"
        paddingY="m"
        justifyContent="space-between"
      >
        <Flex gap="12">
          <Button
            onClick={handleEmail}
            prefixIcon="paperPlane"
            size="s"
            variant="tertiary"
          >
            Contact us (please don&apos;t)
          </Button>
          <Button
            href="https://github.com/linarevicheva/threat-detection-interface"
            prefixIcon="github"
            size="s"
            variant="tertiary"
          >
            See code
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
