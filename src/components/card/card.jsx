import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import style from './card.module.scss';
import getIdFromUrl from '../../utils/getIdFromUrl';
import Image from '../../assets/person.png';

export default function CharacterCard({ name, gender, height, hair, eye, url }) {
  const navigate = useNavigate();
  const handleClick = () => {
    const id = getIdFromUrl(url, 'people')[0];

    if (id) navigate(`/people/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 300 }} className={style.card} onClick={handleClick}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={Image} alt="character" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`This is a ${eye}-eyed ${gender}-gender person with ${hair}
            hairs and ${height} of height. Did you find out who it is? Follow the card and see more details`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CharacterCard.propTypes = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  hair: PropTypes.string.isRequired,
  eye: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
