import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import style from './gender-filter.module.scss';
import filtersStyle from '../filters.module.scss';
import { filtersActions } from '../../../redux/slices/filtersSlice';

export default function GenderFilter() {
  const dispatch = useDispatch();
  const { updateGender } = filtersActions;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(updateGender(value));
  };

  return (
    <div className={`${filtersStyle.filters__item__wrapper} ${style['gender-filter']}`}>
      <h3>By gender</h3>
      <RadioGroup aria-labelledby="demo-form-control-label-placement" name="position">
        <FormControlLabel
          value=""
          control={<Radio className={style['gender-filter__input']} checked />}
          label="All"
          onChange={handleChange}
        />
        <FormControlLabel
          value="Male"
          control={<Radio className={style['gender-filter__input']} />}
          label="Male"
          onChange={handleChange}
        />
        <FormControlLabel
          value="Female"
          control={<Radio className={style['gender-filter__input']} />}
          label="Female"
          onChange={handleChange}
        />
        <FormControlLabel
          value="Other"
          control={<Radio className={style['gender-filter__input']} />}
          label="Other"
          onChange={handleChange}
        />
      </RadioGroup>
    </div>
  );
}
