import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import style from './gender-filter.module.scss';

export default function GenderFilter() {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
  };

  return (
    <RadioGroup
      aria-labelledby="demo-form-control-label-placement"
      name="position"
      defaultValue="top"
      className={style['gender-filter']}
    >
      <FormControlLabel
        value="male"
        control={<Radio className={style['gender-filter__input']} />}
        label="Male"
        onChange={handleChange}
      />
      <FormControlLabel
        value="other"
        control={<Radio className={style['gender-filter__input']} />}
        label="Other"
        onChange={handleChange}
      />
      <FormControlLabel
        value="female"
        control={<Radio className={style['gender-filter__input']} />}
        label="Female"
        onChange={handleChange}
      />
    </RadioGroup>
  );
}
