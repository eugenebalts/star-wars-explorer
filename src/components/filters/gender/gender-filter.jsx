import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import style from './gender-filter.module.scss';
import filtersStyle from '../filters.module.scss';
import { filtersActions } from '../../../redux/slices/filtersSlice';

export default function GenderFilter() {
  const dispatch = useDispatch();
  const { updateGender } = filtersActions;
  const { gender } = useSelector((state) => state.filters);
  const [checkedItem, setCheckedItem] = useState('');

  const handleChange = (event) => {
    dispatch(updateGender(event.target.value));
  };

  useEffect(() => {
    setCheckedItem(gender);
  }, [gender]);

  return (
    <div className={`${filtersStyle.filters__item__wrapper} ${style['gender-filter']}`}>
      <h3>By gender</h3>
      <RadioGroup aria-labelledby="demo-form-control-label-placement" name="position">
        <FormControlLabel
          value=""
          control={<Radio className={style['gender-filter__input']} />}
          label="All"
          onChange={handleChange}
          checked={checkedItem === ''}
        />
        <FormControlLabel
          value="Male"
          control={<Radio className={style['gender-filter__input']} />}
          label="Male"
          onChange={handleChange}
          checked={checkedItem === 'Male'}
        />
        <FormControlLabel
          value="Female"
          control={<Radio className={style['gender-filter__input']} />}
          label="Female"
          onChange={handleChange}
          checked={checkedItem === 'Female'}
        />
        <FormControlLabel
          value="Other"
          control={<Radio className={style['gender-filter__input']} />}
          label="Other"
          onChange={handleChange}
          checked={checkedItem === 'Other'}
        />
      </RadioGroup>
    </div>
  );
}
