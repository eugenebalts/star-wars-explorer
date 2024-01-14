import { useNavigate, useParams } from 'react-router-dom';
import style from './character-page.module.scss';
import pageStyle from '../page.module.scss';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import Image from '../../assets/person.png';
import getIdFromUrl from '../../utils/getIdFromUrl';

export default function CharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({});
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);

  const fetchCharacter = async () => {
    try {
      const response = await api.getCharacter(id);

      setCardData(response);
    } catch (err) {
      navigate('/not-found');
    }
  };

  const fetchSpecies = async () => {
    const updatedSpecies = [];

    await Promise.all(
      cardData.species.map(async (url) => {
        const speciesId = getIdFromUrl(url, 'species')[0];

        try {
          const response = await api.getSpeciesById(speciesId);
          updatedSpecies.push(response.name);
        } catch (err) {
          console.error(`Cannot fetch species for id ${speciesId} with error: ${err}`);
        }
      })
    );

    setSpecies(updatedSpecies);
  };

  const fetchFilms = async () => {
    const newFilms = [];

    await Promise.all(
      cardData.films.map(async (url) => {
        const filmId = getIdFromUrl(url, 'films')[0];

        try {
          const response = await api.getFilmById(filmId);
          newFilms.push(response.title);
        } catch (err) {
          console.error(`Cannot fetch films for id ${filmId} with error: ${err}`);
        }
      })
    );

    setFilms(newFilms);
  };

  const fetchStarships = async () => {
    const newStarships = [];

    await Promise.all(
      cardData.starships.map(async (url) => {
        const starshipId = getIdFromUrl(url, 'starships')[0];

        try {
          const response = await api.getStarshipById(starshipId);
          newStarships.push(response.model);
        } catch (err) {
          console.error(`Cannot fetch starships for id ${starshipId} with error: ${err}`);
        }
      })
    );

    setStarships(newStarships);
  };

  useEffect(() => {
    if (cardData?.species?.length) fetchSpecies();
    if (cardData?.films?.length) fetchFilms();
    if (cardData?.starships?.length) fetchStarships();
  }, [cardData]);

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className={`${style['character-page']} ${pageStyle.page}`}>
      <section className={`${pageStyle.section}`}>
        <div className={style['character-about']}>
          <h2 className={style['character-about__title']}>{cardData?.name || 'unnamed'}</h2>
          <div className={style['character-about__introduction']}>
            <div className={style['character-about__introduction__image']}>
              <img src={Image} alt="character" />
            </div>
            <div className={style['character-about__introduction__about ']}>
              <p className={style['character-about__introduction__summary']}>
                {cardData?.name ?? 'This'} is a character from the iconic Star Wars universe. Born{' '}
                {cardData?.birth_year ? `in ${cardData.birth_year}` : ' a long time ago'}, standing at a height of{' '}
                {cardData?.birth_year ?? 'height of an average person'} in cm and weighing{' '}
                {cardData?.mass ?? 'something between an average values of usual people'} kg. Characters skin color is{' '}
                {cardData?.skin_color ?? 'very beautiful'}, and {cardData?.gender ?? 'unknown'} gender.
              </p>
            </div>
          </div>
          <div>
            <h3>Character shortcut:</h3>
            <ul>
              {species.length ? <li>Species: {species.join(', ')}</li> : ''}
              {films.length ? <li>Stared in: {films.join(', ')}</li> : ''}
              {starships.length ? <li>Starships: {starships.join(', ')}</li> : ''}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
