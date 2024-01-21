import { useNavigate, useParams } from 'react-router-dom';
import style from './character-page.module.scss';
import pageStyle from '../page.module.scss';
import { useEffect } from 'react';
import Image from '../../assets/person.png';
import CustomBreadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import {
  characterActions,
  fetchCharacter,
  fetchSpecies,
  fetchStarships,
  fetchFilms,
} from '../../redux/slices/characterSlice';

const breadcrumbLink = [
  {
    pageName: 'Catalog',
    link: '/',
  },
];

export default function CharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resetCharacter } = characterActions;
  const dispatch = useDispatch();
  const { characterData, species, starships, films, error } = useSelector((state) => state.character);

  useEffect(() => {
    dispatch(fetchCharacter(id));

    return () => {
      dispatch(resetCharacter());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchSpecies(characterData.species));
    dispatch(fetchStarships(characterData.starships));
    dispatch(fetchFilms(characterData.films));
  }, [characterData]);

  useEffect(() => {
    if (error) navigate('/not-found');
  }, [error]);

  return (
    <div className={`${style['character-page']} ${pageStyle.page}`}>
      <CustomBreadcrumbs links={breadcrumbLink} currentPage={characterData?.name ?? 'Character'} />
      <section className={`${pageStyle.section}`}>
        <div className={style['character-about']}>
          <h2 className={style['character-about__title']}>{characterData?.name || 'unnamed'}</h2>
          <div className={style['character-about__introduction']}>
            <div className={style['character-about__introduction__image']}>
              <img src={Image} alt="character" />
            </div>
            <div className={style['character-about__introduction__about ']}>
              <p className={style['character-about__introduction__summary']}>
                {characterData?.name ?? 'This'} is a character from the iconic Star Wars universe. Born{' '}
                {characterData?.birth_year ? `in ${characterData.birth_year}` : ' a long time ago'}, standing at a
                height of {characterData?.birth_year ?? 'height of an average person'} in cm and weighing{' '}
                {characterData?.mass ?? 'something between an average values of usual people'} kg. Characters skin color
                is {characterData?.skin_color ?? 'very beautiful'}, and {characterData?.gender ?? 'unknown'} gender.
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
