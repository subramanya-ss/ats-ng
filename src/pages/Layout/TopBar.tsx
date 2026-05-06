import React, { useState } from "react";
import {
  Avatar,
  Badge,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";
import logoSrc from "../../assets/logo.png";
import { useTopBarStyles } from "./TopBar.style";

const LANGUAGES = [
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "GA", label: "Irish", flag: "🇮🇪" },
  { code: "FR", label: "French", flag: "🇫🇷" },
];

interface Props {
  onMenuToggle?: () => void;
}

export const TopBar: React.FC<Props> = ({ onMenuToggle }) => {
  const classes = useTopBarStyles();
  const navigate = useNavigate();
  const [langAnchor, setLangAnchor] = useState<HTMLElement | null>(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const activeLang =
    LANGUAGES.find((l) => l.code === selectedLang) ?? LANGUAGES[0];
  const [userAnchor, setUserAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box component="header" role="banner" className={classes.topBar}>
      {/* Skip link */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: "absolute",
          left: "-9999px",
          "&:focus": { left: "16px", top: "8px", zIndex: 999 },
        }}
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
        <MenuIcon sx={{ fontSize: "20px", color: "#374151" }} />
      </IconButton>

      {/* Brand */}
      <Box className={classes.brand}>
        <Box className={classes.brandLogo}>
          <img src={logoSrc} alt="ATS-NG logo" />
        </Box>
        <Box className={classes.brandText}>
          <Typography className={classes.brandTitle}>ATS-NG</Typography>
          <Typography className={classes.brandSubtitle}>
            Secure Hiring Platform
          </Typography>
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
        <Box
          component="kbd"
          className={classes.searchKbd}
          aria-label="keyboard shortcut Command K"
        >
          ⌘K
        </Box>
      </Box>

      <Box className={classes.spacer} />

      {/* Right actions */}
      <Box className={classes.actions}>
        {/* Help — hidden on mobile */}
        <Box className={classes.helpBtn}>
          <IconButton
            size="small"
            className={classes.iconBtn}
            aria-label="Help"
          >
            <HelpOutlineIcon sx={{ fontSize: "18px", color: "#6b7280" }} />
          </IconButton>
        </Box>

        {/* Language — hidden on mobile */}
        <Box
          className={classes.langBtn}
          role="button"
          tabIndex={0}
          aria-label={`Language: ${activeLang.label}`}
          aria-haspopup="true"
          aria-expanded={Boolean(langAnchor)}
          onClick={(e) => setLangAnchor(e.currentTarget)}
          onKeyDown={(e) =>
            e.key === "Enter" && setLangAnchor(e.currentTarget as HTMLElement)
          }
        >
          <Box component="span" className={classes.langFlag} aria-hidden="true">
            {activeLang.flag}
          </Box>
          <Typography className={classes.langText}>
            {activeLang.code}
          </Typography>
          <KeyboardArrowDownIcon
            sx={{
              fontSize: "12px",
              color: "#9ca3af",
              transition: "transform 0.15s",
              transform: langAnchor ? "rotate(180deg)" : "none",
            }}
            aria-hidden="true"
          />
        </Box>

        {/* Language dropdown */}
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={() => setLangAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                mt: "4px",
                minWidth: "160px",
                borderRadius: "10px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                border: "1px solid #f1f5f9",
                overflow: "hidden",
              },
            },
          }}
        >
          <Box
            sx={{ px: "12px", py: "8px", borderBottom: "1px solid #f1f5f9" }}
          >
            <Typography
              sx={{ fontSize: "11px", fontWeight: 700, color: "#1a2332" }}
            >
              Language
            </Typography>
          </Box>
          {LANGUAGES.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang.code);
                setLangAnchor(null);
              }}
              sx={{
                px: "12px",
                py: "7px",
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor:
                  lang.code === selectedLang ? "#f8fafc" : "transparent",
                "&:hover": { backgroundColor: "#f8fafc" },
              }}
            >
              <Typography
                sx={{ fontSize: "15px", lineHeight: 1, flexShrink: 0 }}
              >
                {lang.flag}
              </Typography>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#1a2332",
                }}
              >
                {lang.label}
              </Typography>
              {lang.code === selectedLang && (
                <CheckIcon
                  sx={{ fontSize: "13px", color: "#1a2332", flexShrink: 0 }}
                />
              )}
            </MenuItem>
          ))}
        </Menu>

        {/* Notifications */}
        <Badge badgeContent={2} className={classes.notifBadge}>
          <IconButton
            size="small"
            className={classes.iconBtn}
            aria-label="Notifications, 2 unread"
          >
            <NotificationsIcon sx={{ fontSize: "18px", color: "#6b7280" }} />
          </IconButton>
        </Badge>

        {/* Divider */}
        <Box className={classes.actionsDivider} />

        {/* User */}
        <Stack
          direction="row"
          alignItems="center"
          className={classes.userBtn}
          role="button"
          tabIndex={0}
          aria-label="User menu"
          aria-haspopup="true"
          aria-expanded={Boolean(userAnchor)}
          onClick={(e) => setUserAnchor(e.currentTarget)}
          onKeyDown={(e) =>
            e.key === "Enter" && setUserAnchor(e.currentTarget as HTMLElement)
          }
        >
          <Avatar className={classes.userAvatar} aria-hidden="true">
            AU
          </Avatar>
          <Box className={classes.userBtnText}>
            <Typography className={classes.userName}>Admin User</Typography>
            <Typography className={classes.userRole}>Administrator</Typography>
          </Box>
          <KeyboardArrowDownIcon
            className={classes.chevron}
            aria-hidden="true"
            sx={{
              transition: "transform 0.15s",
              transform: userAnchor ? "rotate(180deg)" : "none",
            }}
          />
        </Stack>

        {/* User dropdown */}
        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={() => setUserAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                mt: "4px",
                minWidth: "180px",
                borderRadius: "10px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                border: "1px solid #f1f5f9",
                overflow: "hidden",
              },
            },
          }}
        >
          {/* User info header */}
          <Box sx={{ px: "12px", py: "10px" }}>
            <Typography
              sx={{ fontSize: "12px", fontWeight: 700, color: "#1a2332" }}
            >
              Admin User
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "#9ca3af", mt: "1px" }}>
              admin@ats-ng.eu
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "#f3f4f6" }} />

          {/* My Profile */}
          <MenuItem
            onClick={() => setUserAnchor(null)}
            sx={{
              px: "12px",
              py: "7px",
              minHeight: 0,
              gap: "8px",
              "&:hover": { backgroundColor: "#f8fafc" },
            }}
          >
            <PersonOutlineIcon
              sx={{ fontSize: "15px", color: "#9ca3af", flexShrink: 0 }}
            />
            <Typography
              sx={{ fontSize: "12px", fontWeight: 500, color: "#1a2332" }}
            >
              My Profile
            </Typography>
          </MenuItem>

          <Divider
            sx={{
              borderColor: "#f3f4f6",
              marginTop: "0px",
              marginBottom: "0px",
            }}
          />

          {/* Sign Out */}
          <MenuItem
            onClick={() => {
              setUserAnchor(null);
              navigate("/login");
            }}
            sx={{
              px: "12px",
              py: "7px",
              minHeight: 0,
              gap: "8px",
              "&:hover": { backgroundColor: "#fff5f5" },
            }}
          >
            <LogoutIcon
              sx={{ fontSize: "15px", color: "#f43f5e", flexShrink: 0 }}
            />
            <Typography
              sx={{ fontSize: "12px", fontWeight: 500, color: "#f43f5e" }}
            >
              Sign Out
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
