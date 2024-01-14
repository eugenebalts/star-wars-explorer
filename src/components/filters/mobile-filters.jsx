import { Button, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import style from './mobile-filters.module.scss';
import { useState } from 'react';
import Filters from './filters';

export default function MobileFilters() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style['mobile-filters']}>
      <Button variant="contained" onClick={handleClickOpen} className={style['mobile-filters__button']}>
        Show filters
      </Button>
      <Dialog className={style.dialog} open={open} onClose={handleClose}>
        <div className={style['dialog__close-btn']} onClick={handleClose} role="button" aria-hidden="true">
          <CloseIcon />
        </div>
        <Filters />
      </Dialog>
    </div>
  );
}
