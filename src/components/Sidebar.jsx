import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useNavigate } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { list2Data } from '../data';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar({children}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [logoOpen, setLogoOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  const handleNavigate = (path) => {
    if(path === "/user-studio"){
      window.open(path, '_blank');
    }
    navigate(path);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setLogoOpen(false);
  };

  const handleNavigateToHome = () => {
    window.location.href = "/";
  }

  
  return (
    <Box id="box" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{
        '& .MuiSvgIcon-root': {
          color: 'white',
          fontSize: '1.7rem',
        },
        
      }}>
        <Toolbar id="toolbar">
          <IconButton
            color="black"
            aria-label="open drawer"
            // onClick={handleDrawerOpen}
            onClick={handleClick}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open),
            }}  id="menu-icon"
          >
            <MenuIcon />
          </IconButton>
            {logoOpen ? "":<> <YouTubeIcon onClick={handleNavigateToHome} style={{ color: "red",fontSize: "2rem",cursor:"pointer" }} />
          <Typography className='youtube-typo2' variant="h6" noWrap component="div" >
            Youtube
          </Typography> </>}
        </Toolbar>
      </AppBar>
      <Drawer style={{border:"500px"}} variant="permanent" open={open} sx={{                 // targeting the complete sidebar
        '& .MuiDrawer-paper': {
            marginTop: '10px',
          backgroundColor: '#212121',
          color: 'white',
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
            fontSize: '19px',
          },
        
      }}>
        
        <Divider />
        <List id="list1" sx={{
            '& .MuiListItemText-root':{
                fontSize: '14px',
            },
            '& .MuiSvgIcon-root':{
                fontSize:"1.2rem",                                 // targeting the icons of first list
            }
        }}>
        <ListItem className='listItem' key={"Home"} disablePadding sx={{ display: 'block',borderColor:"white",'& .MuiListItemButton-root:hover':{
                    // backgroundColor: 'grey',
                  
                  } }}>
              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>{window.location.href = "/"}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HomeIcon sx={{color:"white", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '8rem',
                      }}}/>

                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Home" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>{handleNavigate("/explore")}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ExploreIcon style={{color:"white", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Explore" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>{handleNavigate("/subscriptions")}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SubscriptionsIcon style={{color:"white", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Subscriptions" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List sx={{ borderBottom: '0.4px solid #ccc',
            '& .MuiListItemText-root':{
                fontSize: '14px',
            },
            '& .MuiSvgIcon-root':{
                fontSize:"1.2rem",    
                marginLeft:"4px",                             // targeting the icons of second list                             
            }
        }}>
          
        <ListItem className='listItem' key={"Library"} disablePadding sx={{ display: 'block',borderColor:"white",'& .MuiListItemButton-root:hover':{
                    backgroundColor: 'grey',
                  
                  } }}>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>{handleNavigate("/history")}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HistoryIcon style={{color:"white", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="History" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>{handleNavigate("/user-studio")}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <VideoLibraryIcon style={{color:"white", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Your Videos" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>{handleNavigate("/subscriptions")}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <WatchLaterIcon style={{color:"white", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Watch Later" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>{handleNavigate("/like-videos")}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ThumbUpIcon style={{color:"white", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Liked Videos" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>


            </ListItem>


         
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
