import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Rating, TableHead} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import {setCardPageAC, setCardPageCountAC} from '../../redux/reducers/cards-reducer';
import {formatDate} from '../../common/format-date/formatDate';
import {CardsType} from '../../api/cardsAPI';
import {DeleteCardModal} from '../modals/modals-cards/DeleteCardModal';
import {UpdateCardModal} from '../modals/modals-cards/UpdateCardModal';
import noImage from '../../assets/img/no-image.svg';
import styles from './Cards.module.css'

export const CardsTable = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const userId = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.app.status)

    const [deleteCardData, setDeleteCardData] = useState<CardsType | null>(null);
    const [isOpenCardDeleteModal, setIsOpenCardDeleteModal] = useState(false);

    const [updateCardData, setUpdateCardData] = useState<CardsType | null>(null);
    const [isOpenCardUpdateModal, setIsOpenCardUpdateModal] = useState(false);


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setCardPageAC(newPage + 1))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setCardPageCountAC(+event.target.value))
        dispatch(setCardPageAC(1))
    };

    const openModalDeleteCard = (card: CardsType) => {
        setIsOpenCardDeleteModal(true);
        setDeleteCardData(card);
    }

    const openModalUpdateCard = (card: CardsType) => {
        setIsOpenCardUpdateModal(true);
        setUpdateCardData(card);
    }

    const cardQuestion = (question: string) => {
        if (question.includes('data:image')) {
            return <img src={question} alt={'img question'}
                        style={{width: '100px'}}/>
        } else if (question.includes('/learning')) {
            return <img src={noImage} className={styles.packDeckCover} alt={'no img'}/>
        }
        return <>{question}</>
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Question</TableCell>
                            <TableCell align="center">Answer</TableCell>
                            <TableCell align="center">Last Updated</TableCell>
                            <TableCell align="center">Grade</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.length ? status !== 'loading' && cards.map((card) => (
                            <TableRow key={card._id}>
                                <TableCell align="center" component="th" scope="row">
                                    {cardQuestion(card.question)}
                                </TableCell>
                                <TableCell align="center">
                                    {card.answer}
                                </TableCell>
                                <TableCell align="center">
                                    {formatDate(card.updated)}
                                </TableCell>
                                <TableCell align="center">
                                    <Rating name="read-only" value={card.grade}
                                            readOnly/>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton disabled={userId !== card.user_id}
                                                onClick={() => openModalUpdateCard(card)}>
                                        <CreateIcon/>
                                    </IconButton>
                                    <IconButton disabled={userId !== card.user_id}
                                                onClick={() => openModalDeleteCard(card)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                            : status !== 'loading' && <TableRow><TableCell colSpan={5}
                                                                           sx={{
                                                                               textAlign: 'center',
                                                                               fontWeight: 'bold',
                                                                               color: 'red'
                                                                           }}>CARDS NOT
                            FOUND</TableCell></TableRow>}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={5}
                                count={cardsTotalCount}
                                rowsPerPage={pageCount}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            {updateCardData && <UpdateCardModal
                isModalOpen={isOpenCardUpdateModal}
                setIsModalOpen={setIsOpenCardUpdateModal}
                _id={updateCardData._id}
                cardsPack_id={updateCardData.cardsPack_id}
                question={updateCardData.question}
                answer={updateCardData.answer}
            />
            }
            {deleteCardData && <DeleteCardModal
                isModalOpen={isOpenCardDeleteModal}
                setIsModalOpen={setIsOpenCardDeleteModal}
                _id={deleteCardData._id}
                cardsPack_id={deleteCardData.cardsPack_id}
                question={deleteCardData.question}

            />
            }
        </>
    );
}
