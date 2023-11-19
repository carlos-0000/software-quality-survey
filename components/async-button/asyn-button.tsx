import React, { FC, useRef, useState } from 'react';
import { Button } from '@carbon/react';
import Loading from '@carbon/react/es/components/Loading/Loading';
// @ts-ignore
import { Help } from '@carbon/icons-react';

interface AsyncButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'onClick' | 'hasIconOnly'> {
  confirm?: boolean;
  action: () => Promise<void>;
}

export const AsyncButton: FC<AsyncButtonProps> = (props) => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'confirming'
  >('idle');
  const loadingBar = useRef<HTMLDivElement>(null);

  const { action, confirm = false, ...rest } = props;

  const actionHandler = () =>
    action()
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
      .finally(() => {
        setStatus('idle');
      });

  return (
    <div>
      <Button
        {...rest}
        renderIcon={status === 'idle' ? props.renderIcon : Help}
        style={{
          ...(props.style || {}),
          position: 'relative',
          ...(status !== 'confirming' && status !== 'idle'
            ? {
                pointerEvents: 'none',
                cursor: 'default',
              }
            : {}),
        }}
        hasIconOnly={false}
        onClick={async () => {
          if (!confirm) {
            setStatus('loading');
            await actionHandler();
            return;
          }
          if (status === 'idle') {
            setStatus('confirming');
            setTimeout(() => setStatus('idle'), 2000);
            return;
          }
          if (status === 'confirming') {
            setStatus('loading');
            await actionHandler();
          }
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 2,
            opacity: status === 'confirming' ? 1 : 0,
            pointerEvents: 'none',
            backgroundColor: 'var(--cds-button-danger-hover, #b81921)',
            color: 'var(--cds-text-on-color, #ffffff)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div
            ref={loadingBar}
            style={{
              zIndex: 1,
              position: 'absolute',
              inset: 0,
              background: 'var(--cds-layer)',
              opacity: 0.5,
              right: status === 'confirming' ? '0%' : '100%',
              transition: status === 'confirming' ? 'right 2s linear' : 'none',
            }}
          />
          Confirmar
        </div>
        {props.children}
        {status === 'loading' ? (
          <div
            style={{
              zIndex: 1,
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding:
                '0 calc(var(--cds-layout-density-padding-inline-local) - 0.0625rem)',
              backgroundColor: 'var(--cds-layer)',
              outline: '3px solid var(--cds-layer)',
            }}
          >
            <Loading
              active={true}
              withOverlay={false}
              small={true}
              description={'Loading Notification Numbers...'}
            />
          </div>
        ) : null}
      </Button>
    </div>
  );
};
