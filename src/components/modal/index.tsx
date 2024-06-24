import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open?: boolean;
  onClose?: () => void;
  fullScreen?: boolean;
  icon?: React.ReactNode;
  iconClick?: () => void;
  content: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  open = false,
  onClose,
  fullScreen = true,
  icon = <CloseIcon />,
  iconClick,
  content,
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

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogActions>
        {icon && (
          <IconButton edge="start" color="inherit" onClick={handleIconClick} aria-label="close">
            {icon}
          </IconButton>
        )}
      </DialogActions>
      <DialogContent>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
