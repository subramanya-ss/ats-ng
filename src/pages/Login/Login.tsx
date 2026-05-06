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
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LogoSrc from '../../assets/logo.png';
import { useStyles } from './Login.style';

/** Login page — ATS-NG secure hiring platform */
export const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(true);

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
          aria-label="Language: English"
          onKeyDown={(e) => e.key === 'Enter' && undefined}
        >
          <Typography className={classes.langFlag} aria-hidden="true">🇬🇧</Typography>
          <Typography className={classes.langText}>EN</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '14px' }} aria-hidden="true" />
        </Box>
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
