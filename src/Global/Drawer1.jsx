import React, { useState, useEffect } from 'react';
//PACKAGES
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../images/logo_valleybeach_black.png';
import { TiUser } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

//COMPONENTS

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const LeftDrawer = ({ children }) => {
  const classes = useStyles();
  // const theme = useTheme();
  const [open] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const user = useSelector((state) => state.user.nome);

  const history = useHistory();

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSair = () => {
    // setAnchorEl(null);

    localStorage.removeItem('token');
    localStorage.clear('persist:root');
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
        style={{
          backgroundColor: 'white',
        }}
      >
        <Toolbar
          style={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            height: '50px',
            color: 'black',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '30%',
              textAlign: 'start',
              alignItems: 'center',
            }}
          ></div>
          <div
            style={
              windowDimensions.width > 1220
                ? { display: 'flex', width: '30%', justifyContent: 'center' }
                : { display: 'flex' }
            }
          >
            <Link to='/app'>
              <img
                src={Logo}
                alt=''
                style={{
                  height: '40px',
                }}
              />
            </Link>
          </div>
          <div
            style={
              windowDimensions.width > 1219.99
                ? {
                    width: '30%',
                    textAlign: 'end',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }
                : {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '30%',
                  }
            }
          >
            {windowDimensions.width > 800 ? (
              <div>
                <p>{user}</p>
              </div>
            ) : null}

            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <TiUser color='#757575' />
              </IconButton>
            </div>

            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open1}
              onClose={handleClose}
            >
              <div>
                <MenuItem onClick={handleSair}>Sair</MenuItem>
              </div>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <main>
        <div className={classes.drawerHeader} style={{ marginTop: '50px' }} />
        {children}
      </main>
    </div>
  );
};

export default LeftDrawer;
