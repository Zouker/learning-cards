import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {Rating, TableHead} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import {deleteCardTC, setCardPageAC, setCardPageCountAC, updateCardTC} from '../../bll/reducers/cards-reducer';
import {formatDate} from '../../common/format-date/formatDate';

export const CardsTable = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)

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

    const deleteCard = (cardId: string) => {
        dispatch(deleteCardTC(cardId))
    }

    const updateCard = (cardId: string) => {
        const question = 'UPDATE QUESTION'
        const answer = 'UPDATE ANSWER'
        dispatch(updateCardTC(cardId, question, answer))
    }

    return (
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
                    {cards.map((card) => (
                        <TableRow key={card._id}>
                            <TableCell align="center" component="th" scope="row">
                                {card.question}
                            </TableCell>
                            <TableCell align="center">
                                {card.answer}
                            </TableCell>
                            <TableCell align="center">
                                {formatDate(card.updated)}
                            </TableCell>
                            <TableCell align="center">
                                <Rating name="read-only" value={card.grade} readOnly/>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => updateCard(card._id)}>
                                    <CreateIcon/>
                                </IconButton>
                                <IconButton onClick={() => deleteCard(card._id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={3}
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
    );
}
