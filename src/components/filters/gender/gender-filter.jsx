import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import style from './gender-filter.module.scss';
import filtersStyle from '../filters.module.scss';
import { filtersActions } from '../../../redux/slices/filtersSlice';
import { cardsActions } from '../../../redux/slices/cardsSlice';

export default function GenderFilter() {
  const dispatch = useDispatch();
  const { updateGender } = filtersActions;
  const { filterCardsByGender } = cardsActions;
  const { filteringProps } = useSelector((state) => state.filters);

  const handleChange = (event) => {
    dispatch(updateGender(event.target.value));
  };

  useEffect(() => {
    dispatch(filterCardsByGender(filteringProps));
  }, [filteringProps.gender.value]);

  return (
    <div className={`${filtersStyle.filters__item__wrapper} ${style['gender-filter']}`}>
      <h3>By gender</h3>
      <RadioGroup aria-labelledby="demo-form-control-label-placement" name="position">
        <FormControlLabel
          value=""
          control={<Radio className={style['gender-filter__input']} />}
          label="All"
          onChange={handleChange}
          checked={filteringProps.gender.value === ''}
        />
        <FormControlLabel
          value="male"
          control={<Radio className={style['gender-filter__input']} />}
          label="Male"
          onChange={handleChange}
          checked={filteringProps.gender.value === 'male'}
        />
        <FormControlLabel
          value="female"
          control={<Radio className={style['gender-filter__input']} />}
          label="Female"
          onChange={handleChange}
          checked={filteringProps.gender.value === 'female'}
        />
        <FormControlLabel
          value="other"
          control={<Radio className={style['gender-filter__input']} />}
          label="Other"
          onChange={handleChange}
          checked={filteringProps.gender.value === 'other'}
        />
      </RadioGroup>
    </div>
  );
}
