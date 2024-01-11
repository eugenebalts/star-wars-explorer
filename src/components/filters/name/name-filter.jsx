import { TextField } from '@mui/material';
import style from './name-filter.module.scss';

export default function NameFilter() {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
  };
  return (
    <TextField
      id="outlined-basic"
      label="Type name"
      variant="outlined"
      className={style['name-filter']}
      onChange={handleChange}
      color="primary"
    />
  );
}
