import React from 'react';
import { Avatar, Badge, IconButton, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import logoSrc from '../../assets/logo.png';
import { useTopBarStyles } from './TopBar.style';

interface Props {
  onMenuToggle?: () => void;
}

export const TopBar: React.FC<Props> = ({ onMenuToggle }) => {
  const classes = useTopBarStyles();

  return (
    <Box component="header" role="banner" className={classes.topBar}>
      {/* Skip link */}
      <Box
        component="a"
        href="#main-content"
        sx={{ position: 'absolute', left: '-9999px', '&:focus': { left: '16px', top: '8px', zIndex: 999 } }}
      >
        Skip to main content
      </Box>

      {/* Hamburger — mobile only */}
      <IconButton
        size="small"
        onClick={onMenuToggle}
        aria-label="Open navigation menu"
        className={classes.hamburger}
      >
        <MenuIcon sx={{ fontSize: '20px', color: '#374151' }} />
      </IconButton>

      {/* Brand */}
      <Box className={classes.brand}>
        <Box className={classes.brandLogo}>
          <img src={logoSrc} alt="ATS-NG logo" />
        </Box>
        <Box className={classes.brandText}>
          <Typography className={classes.brandTitle}>ATS-NG</Typography>
          <Typography className={classes.brandSubtitle}>Secure Hiring Platform</Typography>
        </Box>
      </Box>

      {/* Divider — hidden on mobile */}
      <Box className={classes.divider} />

      {/* Search — hidden on mobile */}
      <Box className={classes.searchBar} role="search">
        <SearchIcon className={classes.searchIcon} aria-hidden="true" />
        <Box
          component="input"
          className={classes.searchInput}
          placeholder="Search vacancies, candidates, applications..."
          aria-label="Search vacancies, candidates, applications"
          type="search"
        />
        <Box component="kbd" className={classes.searchKbd} aria-label="keyboard shortcut Command K">⌘K</Box>
      </Box>

      <Box className={classes.spacer} />

      {/* Right actions */}
      <Box className={classes.actions}>
        {/* Help — hidden on mobile */}
        <Box className={classes.helpBtn}>
          <IconButton size="small" className={classes.iconBtn} aria-label="Help">
            <HelpOutlineIcon sx={{ fontSize: '18px', color: '#6b7280' }} />
          </IconButton>
        </Box>

        {/* Language — hidden on mobile */}
        <Box className={classes.langBtn} role="button" tabIndex={0} aria-label="Language: English">
          <Box component="span" className={classes.langFlag} aria-hidden="true">🇬🇧</Box>
          <Typography className={classes.langText}>en</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: '12px', color: '#9ca3af' }} aria-hidden="true" />
        </Box>

        {/* Notifications */}
        <Badge badgeContent={2} className={classes.notifBadge}>
          <IconButton size="small" className={classes.iconBtn} aria-label="Notifications, 2 unread">
            <NotificationsIcon sx={{ fontSize: '18px', color: '#6b7280' }} />
          </IconButton>
        </Badge>

        {/* Divider */}
        <Box className={classes.actionsDivider} />

        {/* User */}
        <Stack direction="row" alignItems="center" className={classes.userBtn} role="button" tabIndex={0} aria-label="User menu">
          <Avatar className={classes.userAvatar} aria-hidden="true">AU</Avatar>
          <Box className={classes.userBtnText}>
            <Typography className={classes.userName}>Admin User</Typography>
            <Typography className={classes.userRole}>Administrator</Typography>
          </Box>
          <KeyboardArrowDownIcon className={classes.chevron} aria-hidden="true" />
        </Stack>
      </Box>
    </Box>
  );
};
