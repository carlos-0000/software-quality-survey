'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Column,
  Content,
  Grid,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
  Row,
  SkipToContent,
} from '@carbon/react';
import { Asleep, Light } from '@carbon/icons-react';
import { useTheme } from '@/contexts';

interface UIShellProps {
  content: React.ReactNode;
}

export const UIShell: React.FC<UIShellProps> = ({ content }) => {
  const { push } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'white' || theme === 'g10';

  useEffect(() => {
    console.log('theme', theme);
    if (theme) {
      document.documentElement.setAttribute('data-carbon-theme', theme);
    }
  }, [theme]);

  return (
    <>
      <Header aria-label="Calidad de Software">
        <SkipToContent />
        <HeaderName
          href="/"
          prefix="Calidad de Software"
          onClick={(
            event: React.SyntheticEvent<HTMLAnchorElement, MouseEvent>,
          ) => {
            event.preventDefault();
            push('/');
          }}
        >
          USCO PRO 4K
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Toggle theme"
            tooltipAlignment="end"
            onClick={() => toggleTheme(isLight ? 'g100' : 'white')}
          >
            {isLight ? <Asleep size={20} /> : <Light size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      <Content
        id="main-content"
        style={{
          height: '100%',
        }}
      >
        {/*<Grid>*/}
        {/*  <Row>*/}
        {/*    <Column>{content}</Column>*/}
        {/*  </Row>*/}
        {/*</Grid>*/}
        {content}
      </Content>
    </>
  );
};
