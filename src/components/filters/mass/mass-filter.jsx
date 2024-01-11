import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './mass-filter.module.scss';

export default function MassFilter() {
  const [MIN_MASS, SET_MIN_MASS] = useState(0);
  const [MAX_MASS, SET_MAX_MASS] = useState(100);
  const [minMass, setMinMass] = useState(0);
  const [maxMass, setMaxMass] = useState(100);

  const handleChangeMin = (event) => setMinMass(event.target.value);
  const handleChangeMax = (event) => setMaxMass(event.target.value);

  const handleBlurMin = (event) => {
    const {
      target: { value },
    } = event;

    let editedValue = Math.floor(value);

    if (value >= MIN_MASS) {
      editedValue = editedValue <= MAX_MASS ? editedValue : MAX_MASS;
    } else {
      editedValue = MIN_MASS;
    }

    setMinMass(editedValue);
  };

  const handleBlurMax = (event) => {
    const {
      target: { value },
    } = event;

    let editedValue = Math.floor(value);

    if (value <= MAX_MASS) {
      editedValue = editedValue >= MIN_MASS ? editedValue : MIN_MASS;
    } else {
      editedValue = MAX_MASS;
    }

    setMaxMass(editedValue);
  };

  useEffect(() => {
    SET_MIN_MASS(0);
    SET_MAX_MASS(100);
  });

  return (
    <div className={style['mass-filter']}>
      <TextField
        id="outlined-number"
        label="Min, kg"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeMin}
        onBlur={handleBlurMin}
        value={minMass}
      />
      <TextField
        id="outlined-number"
        label="Max, kg"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeMax}
        onBlur={handleBlurMax}
        value={maxMass}
      />
    </div>
  );
}
