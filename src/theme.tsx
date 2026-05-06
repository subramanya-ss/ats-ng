import { createTheme } from '@mui/material/styles';

// Augment the Theme to include custom palette keys
declare module '@mui/material/styles' {
  interface Palette {
    navy: {
      900: string;
      800: string;
      700: string;
      600: string;
      400: string;
      200: string;
      100: string;
      50: string;
    };
    teal: {
      500: string;
      400: string;
      200: string;
      100: string;
    };
    slate: {
      700: string;
      500: string;
      400: string;
      300: string;
      200: string;
      100: string;
      50: string;
    };
    bg: {
      main: string;
      paper: string;
      sidebar: string;
    };
  }
  interface PaletteOptions {
    navy?: Palette['navy'];
    teal?: Palette['teal'];
    slate?: Palette['slate'];
    bg?: Palette['bg'];
  }
  interface TypographyVariants {
    label: React.CSSProperties;
    badge: React.CSSProperties;
    tableHeader: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
    badge?: React.CSSProperties;
    tableHeader?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
    badge: true;
    tableHeader: true;
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#1a2332' },
    secondary: { main: '#2dd4bf' },
    error: { main: '#ef4444', light: '#fee2e2', dark: '#991b1b' },
    warning: { main: '#f59e0b', light: '#fef3c7', dark: '#92400e' },
    success: { main: '#22c55e', light: '#dcfce7', dark: '#166534' },
    info: { main: '#3b82f6', light: '#dbeafe', dark: '#1e40af' },
    navy: {
      900: '#0f1923',
      800: '#1a2332',
      700: '#243040',
      600: '#2e3f54',
      400: '#4a6080',
      200: '#8fa8c4',
      100: '#c5d5e8',
      50: '#eef3f9',
    },
    teal: {
      500: '#14b8a6',
      400: '#2dd4bf',
      200: '#99f6e4',
      100: '#ccfbf1',
    },
    slate: {
      700: '#374151',
      500: '#64748b',
      400: '#94a3b8',
      300: '#b0bec5',
      200: '#e2e8f0',
      100: '#f0f2f5',
      50: '#f8fafc',
    },
    bg: {
      main: '#f0f2f5',
      paper: '#ffffff',
      sidebar: '#0f1923',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontSize: '24px', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '20px', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '18px', fontWeight: 700, lineHeight: 1.3 },
    h4: { fontSize: '16px', fontWeight: 700, lineHeight: 1.4 },
    h5: { fontSize: '14px', fontWeight: 700, lineHeight: 1.4 },
    h6: { fontSize: '13px', fontWeight: 700, lineHeight: 1.4 },
    subtitle1: { fontSize: '14px', fontWeight: 600, lineHeight: 1.5 },
    subtitle2: { fontSize: '13px', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '14px', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '13px', fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: '11px', fontWeight: 400, lineHeight: 1.4 },
    overline: { fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.4 },
    label: { fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, lineHeight: 1.4 },
    badge: { fontSize: '11px', fontWeight: 700, lineHeight: 1 },
    tableHeader: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          fontSize: '13px',
          lineHeight: 1.4,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        sizeLarge: { fontSize: '14px', padding: '12px 24px' },
        sizeMedium: { fontSize: '13px', padding: '8px 18px' },
        sizeSmall: { fontSize: '12px', padding: '5px 12px' },
        containedPrimary: {
          backgroundColor: '#1a2332',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#0f1923' },
        },
        outlinedPrimary: {
          borderColor: '#e2e8f0',
          color: '#1a2332',
          '&:hover': { backgroundColor: '#f8fafc', borderColor: '#94a3b8' },
        },
        textPrimary: {
          color: '#64748b',
          '&:hover': { backgroundColor: '#f0f2f5', color: '#1a2332' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          borderRadius: '12px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#94a3b8',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #f0f2f5',
          padding: '10px 14px',
        },
        body: {
          fontSize: '13px',
          color: '#1a2332',
          padding: '10px 14px',
          borderBottom: '1px solid #f8fafc',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '13px',
          color: '#64748b',
          minWidth: '90px',
          padding: '8px 16px',
          '&.Mui-selected': { color: '#1a2332' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: '#1a2332', height: '2px' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontSize: '11px', fontWeight: 700, borderRadius: '6px', height: '22px' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontSize: '13px',
          '& fieldset': { borderColor: '#e2e8f0' },
          '&:hover fieldset': { borderColor: '#94a3b8' },
          '&.Mui-focused fieldset': { borderColor: '#1a2332', borderWidth: '1.5px' },
        },
        input: { padding: '8px 12px' },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        body: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: '#f0f2f5',
        },
        '@import': "url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap')",
      },
    },
  },
});

export default theme;
