import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Menu,
  MenuItem,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CheckIcon from '@mui/icons-material/Check';
import LogoSrc from '../../assets/logo.png';
import { useStyles } from './Login.style';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ga', label: 'Irish', flag: '🇮🇪' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
];

/** Login page — ATS-NG secure hiring platform */
export const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(true);
  const [langAnchor, setLangAnchor] = useState<HTMLElement | null>(null);
  const [selectedLang, setSelectedLang] = useState('en');
  const activeLang = LANGUAGES.find((l) => l.code === selectedLang) ?? LANGUAGES[0];

  const handleSignIn = () => navigate('/dashboard');

  return (
    <Box className={classes.root}>
      {/* ─── Top bar ──────────────────────────────────────────────── */}
      <Box className={classes.topBar} component="header">
        <Box className={classes.brand}>
          <Box className={classes.brandLogo} aria-hidden="true">
            <img src={LogoSrc} alt="" className={classes.brandLogoImg} />
          </Box>
          <Stack spacing={0}>
            <Typography className={classes.brandTitle}>ATS-NG</Typography>
            <Typography className={classes.brandSubtitle}>Secure Hiring Platform</Typography>
          </Stack>
        </Box>

        <Box
          className={classes.langSelector}
          role="button"
          tabIndex={0}
          aria-label={`Language: ${activeLang.label}`}
          aria-haspopup="true"
          aria-expanded={Boolean(langAnchor)}
          onClick={(e) => setLangAnchor(e.currentTarget)}
          onKeyDown={(e) => e.key === 'Enter' && setLangAnchor(e.currentTarget as HTMLElement)}
        >
          <Typography className={classes.langFlag} aria-hidden="true">{activeLang.flag}</Typography>
          <Typography className={classes.langText}>{activeLang.code.toUpperCase()}</Typography>
          <KeyboardArrowDownIcon
            sx={{ fontSize: '14px', transition: 'transform 0.15s', transform: langAnchor ? 'rotate(180deg)' : 'none' }}
            aria-hidden="true"
          />
        </Box>

        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={() => setLangAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: {
                mt: '4px',
                minWidth: '160px',
                borderRadius: '10px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                border: '1px solid #f1f5f9',
                overflow: 'hidden',
              },
            },
          }}
        >
          <Box sx={{ px: '12px', py: '8px', borderBottom: '1px solid #f1f5f9' }}>
            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#1a2332' }}>Language</Typography>
          </Box>
          {LANGUAGES.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => { setSelectedLang(lang.code); setLangAnchor(null); }}
              sx={{
                px: '12px', py: '7px', minHeight: 0,
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: lang.code === selectedLang ? '#f8fafc' : 'transparent',
                '&:hover': { backgroundColor: '#f8fafc' },
              }}
            >
              <Typography sx={{ fontSize: '15px', lineHeight: 1, flexShrink: 0 }}>{lang.flag}</Typography>
              <Typography sx={{ flex: 1, fontSize: '12px', fontWeight: 500, color: '#1a2332' }}>{lang.label}</Typography>
              {lang.code === selectedLang && <CheckIcon sx={{ fontSize: '13px', color: '#1a2332', flexShrink: 0 }} />}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* ─── Card ─────────────────────────────────────────────────── */}
      <Box className={classes.centerContent}>
        <Box className={classes.card} role="main">
          {/* Secure badge */}
          <Box className={classes.secureBadge} aria-label="Secure sign-in with TLS 1.3">
            <LockIcon sx={{ fontSize: '12px', color: '#64748b' }} aria-hidden="true" />
            <Typography className={classes.secureBadgeText}>Secure Sign-In · TLS 1.3</Typography>
          </Box>

          <Typography component="h1" className={classes.cardTitle}>Welcome back</Typography>
          <Typography className={classes.cardSubtitle}>Sign in to your ATS-NG workspace</Typography>

          {/* Username */}
          <Box className={classes.inputWrapper}>
            <Typography component="label" htmlFor="username" className={classes.fieldLabel}>
              Username
            </Typography>
            <TextField
              id="username"
              fullWidth
              placeholder="Enter Username"
              size="small"
              autoComplete="username"
              inputProps={{ 'aria-required': true }}
            />
          </Box>

          {/* Password */}
          <Box className={classes.inputWrapper}>
            <Box className={classes.fieldLabelRow}>
              <Typography component="label" htmlFor="password" className={classes.fieldLabel} sx={{ mb: 0 }}>
                Password
              </Typography>
              <Link href="#" className={classes.forgotLink} tabIndex={0}>
                Forgot password?
              </Link>
            </Box>
            <TextField
              id="password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              size="small"
              autoComplete="current-password"
              inputProps={{ 'aria-required': true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword
                        ? <VisibilityOffIcon sx={{ fontSize: '15px' }} />
                        : <VisibilityIcon sx={{ fontSize: '15px' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Keep me signed in */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={keepSigned}
                onChange={(e) => setKeepSigned(e.target.checked)}
                sx={{ color: '#1a2332', '&.Mui-checked': { color: '#1a2332' } }}
                inputProps={{ 'aria-label': 'Keep me signed in' }}
              />
            }
            label={<Typography sx={{ fontSize: '13px', fontWeight: 500 }}>Keep me signed in</Typography>}
            sx={{ mb: '20px' }}
          />

          {/* Sign in button */}
          <Button
            className={classes.signInBtn}
            variant="contained"
            onClick={handleSignIn}
            aria-label="Sign in to ATS-NG"
            disableElevation
          >
            Sign in
          </Button>

          {/* Divider */}
          <Divider sx={{ my: '20px' }}>
            <Typography className={classes.dividerText}>or</Typography>
          </Divider>

          {/* SSO button */}
          <Button
            className={classes.ssoBtn}
            variant="outlined"
            startIcon={<LockIcon sx={{ fontSize: '15px' }} />}
            aria-label="Continue with Single Sign-On"
          >
            Continue with SSO
          </Button>

          {/* Security note */}
          <Box className={classes.securityNote} aria-label="Security information">
            <LockIcon sx={{ fontSize: '11px', color: '#94a3b8' }} aria-hidden="true" />
            <Typography className={classes.securityNoteText}>
              GDPR-ready · Hosted in the EU
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <Box className={classes.footer} component="footer">
        <Typography className={classes.footerText}>
          New to ATS-NG?{'  '}
          <Link href="#" className={classes.footerLink}>Contact Administrator</Link>
        </Typography>

        {/* GDPR notice */}
        <Box className={classes.gdprNotice}>
          <VerifiedUserOutlinedIcon className={classes.gdprIcon} aria-hidden="true" />
          <Typography className={classes.gdprText}>
            Your data is protected under GDPR regulations. All connections are encrypted with TLS 1.3. We never share your information with third parties.
          </Typography>
        </Box>

        <Typography className={classes.footerSmall}>
          By signing in you agree to our{' '}
          <Link href="#" className={classes.footerSmallLink}>Privacy Policy</Link>
          {' . '}
          <Link href="#" className={classes.footerSmallLink}>Terms</Link>
          {' . '}
          <Link href="#" className={classes.footerSmallLink}>Cookies</Link>
        </Typography>
      </Box>
    </Box>
  );
};
