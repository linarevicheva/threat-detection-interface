// app/layout.tsx
import '@/once-ui/styles/index.scss';
import '@/once-ui/tokens/index.scss';

import { Flex } from '@/once-ui/components';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import { Source_Code_Pro } from 'next/font/google';

const primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
  display: 'swap',
});

const code = Source_Code_Pro({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      as="html"
      lang="en"
      fillHeight
      background="page"
      data-neutral="gray"
      data-brand="violet"
      data-accent="magenta"
      data-solid="color"
      data-solid-style="flat"
      data-theme="dark"
      data-border="playful"
      data-surface="filled"
      data-transition="all"
      className={classNames(
        primary.variable,
        code.variable,
        'root'
      )}
    >
      <Flex as="body" fillWidth fillHeight margin="0" padding="0">
          <Flex flex={1} direction="column">
            {children}
          </Flex>
      </Flex>
    </Flex>
  );
}
