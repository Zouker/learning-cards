import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {CardsType} from '../cards/cardsAPI';
import styles from './Learn.module.css';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import {getCardsTC, updateCardGradeTC} from '../../bll/reducers/cards-reducer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const grades = [
    {value: 1, label: 'Did not know'},
    {value: 2, label: 'Forgot'},
    {value: 3, label: 'A lot of thought'},
    {value: 4, label: 'Confused'},
    {value: 5, label: 'Knew the answer'}
];

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const Learn = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [first, setFirst] = useState(true);
    const [value, setValue] = useState('');
    const [grade, setGrade] = useState(0);

    const {packId, packName} = useParams<'packId' | 'packName'>()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {cards} = useAppSelector(state => state.cards);

    const [card, setCard] = useState<CardsType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 1,
        shots: 0,
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        __v: 0,
    });

    const onClickBackHandler = () => {
        navigate(-1)
    }

    const onNext = () => {
        if (packId) {
            setIsChecked(false);
            dispatch(updateCardGradeTC(card._id, grade))
            setCard(getCard(cards));
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        if (first) {
            packId && dispatch(getCardsTC(packId));
            setFirst(false);
        }
        if (cards.length > 0) {
            setCard(getCard(cards));
        }

    }, [dispatch, packId, cards, first]);

    return (
        <div className={styles.wrapper}>
            <div onClick={onClickBackHandler} className={styles.backButton}>
                <ArrowBackIcon/>
                <div className={styles.back}>Back to Packs List</div>
            </div>
            <p className={styles.title}>Learn {packName}</p>
            <div className={styles.container}>
                <div>
                    Question: {card.question}
                </div>
                <div className={styles.shots}>
                    Количество попыток ответов на вопрос: {card.shots}
                </div>
                {isChecked
                    ? <>
                        <div>Answer: {card.answer}</div>
                        <div className={styles.rating}>
                            <FormControl>
                                <FormLabel>Rate yourself:</FormLabel>
                                <RadioGroup
                                    value={value}
                                    onChange={handleChange}
                                >
                                    {grades.map((grade, i) => (
                                        <FormControlLabel
                                            key={'grade-' + i}
                                            value={grade.value}
                                            control={<Radio onChange={() => setGrade(grade.value)}/>}
                                            label={grade.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div><Button disabled={!value} variant={'contained'} onClick={onNext}>next</Button></div>
                    </>
                    : <div><Button variant={'contained'} onClick={() => setIsChecked(true)}>Show answer</Button></div>
                }
            </div>
        </div>
    );
};