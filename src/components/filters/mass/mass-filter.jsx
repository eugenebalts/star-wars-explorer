import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import style from './mass-filter.module.scss';
import filtersStyle from '../filters.module.scss';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import debounce from '../../../utils/debounce';

export default function MassFilter() {
  const dispatch = useDispatch();
  const { updateMinMass, updateMaxMass } = filtersActions;
  const { MIN_MASS, MAX_MASS } = useSelector((state) => state.filters);
  const { filteringProps } = useSelector((state) => state.filters);
  const [minMassValue, setMinMassValue] = useState(MIN_MASS || 0);
  const [maxMassValue, setMaxMassValue] = useState(MAX_MASS || 0);

  const debouncedUpdateMinMass = debounce((value) => {
    let editedValue = Math.floor(value);

    if (value >= MIN_MASS) {
      editedValue = editedValue <= maxMassValue ? editedValue : maxMassValue;
    } else {
      editedValue = MIN_MASS;
    }

    setMinMassValue(editedValue);
    dispatch(updateMinMass(editedValue));
  }, 1000);

  const debouncedUpdateMaxMass = debounce((value) => {
    let editedValue = Math.floor(value);

    if (value <= MAX_MASS) {
      editedValue = editedValue >= minMassValue ? editedValue : minMassValue;
    } else {
      editedValue = MAX_MASS;
    }

    setMaxMassValue(editedValue);
    dispatch(updateMaxMass(editedValue));
  }, 1000);

  const handleChangeMin = (event) => {
    setMinMassValue(event.target.value);
    debouncedUpdateMinMass(event.target.value);
  };

  const handleChangeMax = (event) => {
    setMaxMassValue(event.target.value);
    debouncedUpdateMaxMass(event.target.value);
  };

  useEffect(() => {
    if (!filteringProps.minMass.isChanged) setMinMassValue(MIN_MASS);
    if (!filteringProps.maxMass.isChanged) setMaxMassValue(MAX_MASS);
    if (minMassValue < MIN_MASS || minMassValue > MAX_MASS) setMinMassValue(MIN_MASS);
    if (maxMassValue > MAX_MASS || maxMassValue < MIN_MASS) setMaxMassValue(MAX_MASS);
  }, [filteringProps.minMass.isChanged, filteringProps.maxMass.isChanged, MAX_MASS, MIN_MASS]);

  return (
    <div className={`${style['mass-filter']} ${filtersStyle.filters__item__wrapper}`}>
      <h4>By mass</h4>
      <div className={style['mass-filter__inputs-list']}>
        <TextField
          id="outlined-number"
          label="Min, kg"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeMin}
          value={minMassValue}
        />
        <TextField
          id="outlined-number"
          label="Max, kg"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeMax}
          value={maxMassValue}
        />
      </div>
    </div>
  );
}
