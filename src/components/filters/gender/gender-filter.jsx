import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import style from './gender-filter.module.scss';
import filtersStyle from '../filters.module.scss';
import { filtersActions } from '../../../redux/slices/filtersSlice';

export default function GenderFilter() {
  const dispatch = useDispatch();
  const { updateGender } = filtersActions;
  const [checkedItem, setCheckedItem] = useState('');

  const handleChange = (event) => {
    console.log(typeof event.target.value);

    setCheckedItem(event.target.value);
    dispatch(updateGender(event.target.value));
  };

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
          value="male"
          control={<Radio className={style['gender-filter__input']} />}
          label="Male"
          onChange={handleChange}
          checked={checkedItem === 'male'}
        />
        <FormControlLabel
          value="female"
          control={<Radio className={style['gender-filter__input']} />}
          label="Female"
          onChange={handleChange}
          checked={checkedItem === 'female'}
        />
        <FormControlLabel
          value="other"
          control={<Radio className={style['gender-filter__input']} />}
          label="Other"
          onChange={handleChange}
          checked={checkedItem === 'other'}
        />
      </RadioGroup>
    </div>
  );
}
