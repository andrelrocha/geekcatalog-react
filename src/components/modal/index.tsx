import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

type Props = {
  open?: boolean;
  onClose?: () => void;
  fullScreen?: boolean;
  icon?: React.ReactNode;
  iconClick?: () => void;
  content: React.ReactNode;
  title?: string;
};

const Modal: React.FC<Props> = ({
  open = false,
  onClose,
  fullScreen = true,
  icon = <CloseIcon />,
  iconClick,
  content,
  title,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleIconClick = () => {
    if (iconClick) {
      iconClick();
    } else {
      handleClose();
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80%',
      width: '80%',
      margin: 'auto',
    },
    title: {
      fontWeight: 600,
    }
  }

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose} sx={styles.container}>
      <DialogActions>
          {icon && (
            <IconButton edge="start" color="inherit" onClick={handleIconClick} aria-label="close">
              {icon}
            </IconButton>
          )}
        </DialogActions>
      <Box sx={styles.content}>
        {title && <DialogTitle sx={styles.title}>{title}</DialogTitle>}
        <DialogContent>
          {content}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default Modal;
