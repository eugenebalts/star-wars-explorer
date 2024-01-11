import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './mass-filter.module.scss';
import filtersStyle from '../filters.module.scss';

export default function MassFilter() {
  const [minMass, setMinMass] = useState(0);
  const [maxMass, setMaxMass] = useState(100);
  const { MIN_MASS, MAX_MASS } = useSelector((state) => state.filters);

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
    setMinMass(MIN_MASS);
    setMaxMass(MAX_MASS);
  }, [MIN_MASS, MAX_MASS]);

  return (
    <div className={`${style['mass-filter']} ${filtersStyle.filters__item__wrapper}`}>
      <h3>By mass</h3>
      <div className={style['mass-filter__inputs-list']}>
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
    </div>
  );
}
