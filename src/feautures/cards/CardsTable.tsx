import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {TableHead} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import {deleteCardTC, updateCardTC} from '../../bll/reducers/cards-reducer';
import {useParams} from 'react-router-dom';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

export const CardsTable = () => {
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams()
    const cards = useAppSelector(state => state.cards.cards)

    const [page, setPage] = React.useState(0);
    const [packsPerPage, setPacksPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyPacks =
        page > 0 ? Math.max(0, (1 + page) * packsPerPage - cards.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setPacksPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteCard = (cardId: string) => {
        cardsPack_id && dispatch(deleteCardTC(cardsPack_id, cardId))
    }

    const updateCard = (cardId: string) => {
        const question = 'UPDATE QUESTION'
        const answer = 'UPDATE ANSWER'
        cardsPack_id && dispatch(updateCardTC(cardsPack_id, cardId, question, answer))
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell align="right">Answer</TableCell>
                        <TableCell align="right">Last Updated</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(packsPerPage > 0
                            ? cards.slice(page * packsPerPage, page * packsPerPage + packsPerPage)
                            : cards
                    ).map((card) => (
                        <TableRow key={card._id}>
                            <TableCell component="th" scope="row">
                                {card.question}
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                {card.answer}
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                {card.updated}
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                {card.grade}
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                <IconButton>
                                    <CreateIcon onClick={() => updateCard(card._id)}/>
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon onClick={() => deleteCard(card._id)}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyPacks > 0 && (
                        <TableRow style={{height: 53 * emptyPacks}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            colSpan={3}
                            count={cards.length}
                            rowsPerPage={packsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
