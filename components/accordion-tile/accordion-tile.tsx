import React, { useEffect } from 'react';
// @ts-ignore
import { Button, Layer, Tile } from '@carbon/react';
import { ChevronDown, ChevronUp } from '@carbon/icons-react';
// @ts-ignore
import * as motion from '@carbon/motion';
import { useSoftware } from '@/contexts';

type AccordionTileProps = React.PropsWithChildren<{
  title: string;
  isOpenProp?: boolean;
}>;

export const AccordionTile: React.FC<AccordionTileProps> = ({
  title,
  children,
  isOpenProp = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(isOpenProp);
  const { surveyFinished } = useSoftware();

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [surveyFinished]);
  return (
    <Tile>
      <Layer
        style={{
          display: 'grid',
          gridTemplateColumns: '100%',
          gridTemplateRows: isOpen ? 'auto 1fr' : 'auto 0fr',
          transition: `all ${motion.durationModerate02} ${motion.easings.standard.expressive}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h4>{title}</h4>
          <Button
            kind={'ghost'}
            size={'sm'}
            renderIcon={isOpen ? ChevronUp : ChevronDown}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            {isOpen ? 'Ocultar' : 'Mostrar'}
          </Button>
        </div>
        <div
          style={{
            minHeight: '0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {children}
        </div>
      </Layer>
    </Tile>
  );
};
