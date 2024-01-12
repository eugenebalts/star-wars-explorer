import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import style from './card.module.scss';

export default function CharacterCard({ name, gender, height, hair, eye }) {
  return (
    <Card sx={{ maxWidth: 300 }} className={style.card}>
      <CardActionArea>
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
};
