import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MovieIcon from '@material-ui/icons/Movie';
import PeopleIcon from '@material-ui/icons/People';
import UpdateIcon from '@material-ui/icons/Update';
import InfoIcon from '@material-ui/icons/Info';

interface AppLayoutProps {
  children: JSX.Element;
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export function AppLayout({ children }: AppLayoutProps) {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(true);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const resolveRouteTitle = (pathname: string): string => {
    let title = '';

    switch (pathname.replace('/', '')) {
      case 'movies':
        title = 'Movies';
        break;
      case 'movies/create':
        title = 'Add movie';
        break;
      case 'movies/[id]':
        title = 'Edit movie';
        break;
      case 'customers':
        title = 'Customers';
        break;
      case 'customers/create':
        title = 'Add customer';
        break;
      case 'customers/[id]':
        title = 'Edit customer';
        break;
      case 'rentals':
        title = 'Rentals';
        break;
      case 'rentals/create':
        title = 'Rent movie';
        break;
      case 'rentals/[id]':
        title = 'Update rental';
        break;
      default:
        title = pathname;
        break;
    }

    return title;
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar /*, open && classes.appBarShift*/)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {resolveRouteTitle(router.pathname)}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <List>
          <Link href="/movies" passHref>
            <ListItem button>
              <ListItemIcon>
                <MovieIcon />
              </ListItemIcon>

              <ListItemText primary="Movies" />
            </ListItem>
          </Link>

          <Link href="/customers" passHref>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>

              <ListItemText primary="Customers" />
            </ListItem>
          </Link>

          <Link href="/rentals" passHref>
            <ListItem button>
              <ListItemIcon>
                <UpdateIcon />
              </ListItemIcon>

              <ListItemText primary="Rentals" />
            </ListItem>
          </Link>

          <Divider />

          {/* <Link href="/about" passHref>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>

              <ListItemText primary="About" />
            </ListItem>
          </Link> */}
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        {children}
      </main>
    </div>
  );
}
