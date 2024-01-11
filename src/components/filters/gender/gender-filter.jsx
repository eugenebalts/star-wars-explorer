import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import style from './gender-filter.module.scss';
import filtersStyle from '../filters.module.scss';

export default function GenderFilter() {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
  };

  return (
    <div className={`${filtersStyle.filters__item__wrapper} ${style['gender-filter']}`}>
      <h3>By gender</h3>
      <RadioGroup aria-labelledby="demo-form-control-label-placement" name="position">
        <FormControlLabel
          value="male"
          control={<Radio className={style['gender-filter__input']} />}
          label="Male"
          onChange={handleChange}
        />
        <FormControlLabel
          value="female"
          control={<Radio className={style['gender-filter__input']} />}
          label="Female"
          onChange={handleChange}
        />
        <FormControlLabel
          value="other"
          control={<Radio className={style['gender-filter__input']} />}
          label="Other"
          onChange={handleChange}
        />
      </RadioGroup>
    </div>
  );
}
