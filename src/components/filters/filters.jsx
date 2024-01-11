import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { AccordionActions, AccordionDetails, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import style from './filters.module.scss';
import FilterActions from './actions/actions';
import FilmsFilter from './films/films-filter';
import NameFilter from './name/name-filter';
import GenderFilter from './gender/gender-filter';

export default function Filters() {
  return (
    <Accordion className={style.filters}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon className={style['filters__dropdown-icon']} />}
        aria-controls="panel1-content"
        id="panel1-header">
        <Typography className={style.filters__dropdown}>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={style.filters__list}>
          <div className={style.filters__item}>
            <FilmsFilter />
          </div>
          <div className={style.filters__item}>
            <NameFilter />
          </div>
          <div className={style.filters__item}>
            <GenderFilter />
          </div>
        </div>
        <AccordionActions>
          <FilterActions />
        </AccordionActions>
      </AccordionDetails>
    </Accordion>
  );
}
