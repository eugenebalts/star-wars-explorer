import { useSelector } from 'react-redux';
import CharacterCard from '../../card/card';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import style from './catalog-list.module.scss';

export default function CatalogList() {
  const { status } = useSelector((state) => state.cards.default);
  const { filteredCards, currentPage } = useSelector((state) => state.cards.filtered);

  return (
    <div className={style['catalog-list']}>
      {status === 'pending' ? (
        <Box className={style['catalog-list__loading']} sx={{ display: 'flex', margin: 'auto' }}>
          <CircularProgress />
        </Box>
      ) : (
        filteredCards.slice(Number(`${currentPage - 1}0`), currentPage * 10).map((card) => {
          return (
            <CharacterCard
              key={card.name}
              name={card.name}
              gender={card.gender}
              height={card.height}
              hair={card.hair_color}
              eye={card.eye_color}
            />
          );
        })
      )}
    </div>
  );
}
