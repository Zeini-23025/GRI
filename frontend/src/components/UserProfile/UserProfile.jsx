import React, { useState, useRef, useMemo } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';
import {
  FiUser,
  FiSettings,
  FiBell,
  FiTrash2,
  FiLogOut,
  FiEdit2,
  FiSun,
  FiMoon
} from 'react-icons/fi';

const drawerWidth = 300; // <-- Increase sidebar width

const UserProfilePage = () => {
  // Dark/Light theme toggle
  const [darkMode, setDarkMode] = useState(false);

  // Sidebar active item
  const [activeItem, setActiveItem] = useState('editProfile');

  // Profile data
  const [profileData, setProfileData] = useState({
    nom: localStorage.getItem('username'),
    prenom: localStorage.getItem('first_name'),
    email: localStorage.getItem('email'),
    telephone: localStorage.getItem('telephone'),
    location: localStorage.getItem(''),
    bio: 'I am a Product and UX designer with 10 years of experience...',
    photoUrl: 'https://via.placeholder.com/150'
  });

  console.log(profileData.telephone)

  // Edit mode
  const [editMode, setEditMode] = useState(false);

  // File input ref for photo
  const fileInputRef = useRef(null);

  // Handle text field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileData((prev) => ({ ...prev, photoUrl: imageUrl }));
    }
  };

  // Save changes
  const handleSave = () => {
    console.log('Profile saved:', profileData);
    setEditMode(false);
  };

  // Logout
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Light theme
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#000' },
      background: { default: '#f5f5f5', paper: '#fff' },
      text: { primary: '#000' }
    },
    typography: {
      fontFamily: 'Arial, sans-serif'
    }
  });

  // Dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#fff' },
      background: { default: '#121212', paper: '#1e1e1e' },
      text: { primary: '#fff' }
    },
    typography: {
      fontFamily: 'Arial, sans-serif'
    }
  });

  // Determine current theme
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  // Navigation items
  const navItems = [
    { key: 'editProfile', label: 'Edit Profile', icon: <FiUser size={20} /> },
    { key: 'language', label: 'Language', icon: <FiSettings size={20} /> },
    { key: 'notifications', label: 'Notifications', icon: <FiBell size={20} /> }
  ];

  // Render main content
  const renderMainContent = () => {
    if (activeItem === 'editProfile') {
      return (
        <Paper sx={{ p: 4, maxWidth: 900, width: '100%', boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Edit Profile
          </Typography>

          {/* Top Section: Avatar + Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={profileData.photoUrl}
              sx={{ width: 120, height: 120, mb: 1, bgcolor: 'grey.300' }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => fileInputRef.current.click()}
                sx={{ textTransform: 'none' }}
              >
                Change Photo
              </Button>
              {!editMode && (
                <Button
                  variant="contained"
                  startIcon={<FiEdit2 />}
                  onClick={() => setEditMode(true)}
                  sx={{ textTransform: 'none' }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Box>

          {/* Form Fields in a single column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First Name"
              name="prenom"
              value={profileData.prenom}
              onChange={handleInputChange}
              disabled={!editMode}
              size="small"
            />
            <TextField
              label="Last Name"
              name="nom"
              value={profileData.nom}
              onChange={handleInputChange}
              disabled={!editMode}
              size="small"
            />
            <TextField
              label="Phone"
              name="telephone"
              value={profileData.telephone}
              onChange={handleInputChange}
              disabled={!editMode}
              size="small"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!editMode}
              size="small"
            />
            <TextField
              label="Location"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              disabled={!editMode}
              size="small"
            />
            <TextField
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={profileData.bio}
              onChange={handleInputChange}
              disabled={!editMode}
              size="small"
            />

            {editMode && (
              <Box sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ textTransform: 'none' }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      );
    }

    if (activeItem === 'language') {
      return (
        <Paper sx={{ p: 4, maxWidth: 900, width: '100%', boxShadow: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Language Settings
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Here you can manage your language preferences...
          </Typography>
        </Paper>
      );
    }

    if (activeItem === 'notifications') {
      return (
        <Paper sx={{ p: 4, maxWidth: 900, width: '100%', boxShadow: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Notifications
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Manage your notification settings here...
          </Typography>
        </Paper>
      );
    }

    // Default fallback
    return (
      <Paper sx={{ p: 4, maxWidth: 900, width: '100%', boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Welcome
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Select an option from the sidebar.
        </Typography>
      </Paper>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* SIDEBAR */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
          }}
        >
          {/* Sidebar Top Section: A small user info block */}
          <Box
            sx={{
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: 1,
              borderColor: darkMode ? '#444' : '#ddd',
              p: 2
            }}
          >
            <Avatar
              src={darkMode ? '/images/logo2.png' : '/images/logo.png'}
              sx={{ width: 64, height: 64 }}
            />
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </Typography>
          </Box>

          {/* Navigation Items */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <List>
              {navItems.map((item) => (
                <ListItemButton
                  key={item.key}
                  selected={activeItem === item.key}
                  onClick={() => {
                    setActiveItem(item.key);
                    setEditMode(false);
                  }}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: darkMode ? '#333' : '#f0f0f0'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: darkMode ? '#fff' : '#000' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
            <Divider sx={{ borderColor: darkMode ? '#444' : '#ddd' }} />
            <List>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ color: darkMode ? '#fff' : '#000' }}>
                  <FiLogOut size={20} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon sx={{ color: darkMode ? '#fff' : '#000' }}>
                  <FiTrash2 size={20} />
                </ListItemIcon>
                <ListItemText primary="Delete account" />
              </ListItemButton>
            </List>
          </Box>

          {/* Theme Toggle at Bottom */}
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <IconButton onClick={toggleTheme} sx={{ color: darkMode ? '#fff' : '#000' }}>
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </IconButton>
          </Box>
        </Drawer>

        {/* MAIN CONTENT AREA */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          {/* (Optional) Top Bar */}
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              pl: 2,
              borderBottom: 1,
              borderColor: darkMode ? '#444' : '#ddd'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {activeItem === 'editProfile'
                ? 'Edit Profile'
                : activeItem === 'language'
                ? 'Language Settings'
                : activeItem === 'notifications'
                ? 'Notifications'
                : 'Dashboard'}
            </Typography>
          </Box>

          {/* Center the content */}
          <Box
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
              height: 'calc(100vh - 64px)',
              overflowY: 'auto'
            }}
          >
            {renderMainContent()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserProfilePage;