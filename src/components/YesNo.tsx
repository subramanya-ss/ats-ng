import React, { useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconYes from '../assets/Yes.svg';
import IconNo from '../assets/No.svg';

const useStyles = makeStyles({
  group: {
    display: 'inline-flex',
    gap: '8px',
  },
  btnBase: {
    boxSizing: 'border-box' as const,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 17px',
    height: '34px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    outline: 'none',
  },
  yesActive: {
    backgroundColor: '#ECFDF5',
    border: '1px solid #6EE7B7',
    color: '#047857',
  },
  yesInactive: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#64748B',
    '&:hover': { backgroundColor: '#F8FAFC' },
  },
  noActive: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FCA5A5',
    color: '#DC2626',
  },
  noInactive: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#64748B',
    '&:hover': { backgroundColor: '#F8FAFC' },
  },
  emptyDot: {
    boxSizing: 'border-box' as const,
    width: '14px',
    height: '14px',
    borderRadius: '9999px',
    border: '1px solid #CBD5E1',
    backgroundColor: 'transparent',
    flexShrink: 0,
    display: 'inline-block',
  },
  iconImg: {
    width: '14px',
    height: '14px',
    flexShrink: 0,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

export interface YesNoProps {
  value?: 'yes' | 'no' | null;
  defaultValue?: 'yes' | 'no' | null;
  onChange?: (v: 'yes' | 'no' | null) => void;
  label: string;
}

export const YesNo: React.FC<YesNoProps> = ({ value, defaultValue = null, onChange, label }) => {
  const classes = useStyles();
  const [internal, setInternal] = useState<'yes' | 'no' | null>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const yesActive = current === 'yes';
  const noActive = current === 'no';

  const set = (next: 'yes' | 'no' | null) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <Box className={classes.group} role="group" aria-label={label}>
      <Box
        component="button"
        type="button"
        onClick={() => set(yesActive ? null : 'yes')}
        className={`${classes.btnBase} ${yesActive ? classes.yesActive : classes.yesInactive}`}
        aria-pressed={yesActive}
        aria-label="Yes"
      >
        {yesActive
          ? <img src={IconYes} alt="" aria-hidden="true" className={classes.iconImg} />
          : <span className={classes.emptyDot} aria-hidden="true" />}
        Yes
      </Box>
      <Box
        component="button"
        type="button"
        onClick={() => set(noActive ? null : 'no')}
        className={`${classes.btnBase} ${noActive ? classes.noActive : classes.noInactive}`}
        aria-pressed={noActive}
        aria-label="No"
      >
        {noActive
          ? <img src={IconNo} alt="" aria-hidden="true" className={classes.iconImg} />
          : <span className={classes.emptyDot} aria-hidden="true" />}
        No
      </Box>
    </Box>
  );
};
