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
import {Button, TableHead} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {addPacksTC, deletePacksTC} from '../../bll/reducers/packs-reducer';
import CreateIcon from '@mui/icons-material/Create';
import {NavLink} from 'react-router-dom';

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

export const PacksTable = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const [page, setPage] = React.useState(0);
    const [packsPerPage, setPacksPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyPacks =
        page > 0 ? Math.max(0, (1 + page) * packsPerPage - packs.length) : 0;

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

    const deletePack = (packId: string) => {
        dispatch(deletePacksTC(packId))
    }

    return (
        <TableContainer component={Paper}>
            <Button variant="contained" onClick={() => dispatch(addPacksTC())}>Add new pack</Button>
            <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right">Created By</TableCell>
                        <TableCell align="right">Updated</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(packsPerPage > 0
                            ? packs.slice(page * packsPerPage, page * packsPerPage + packsPerPage)
                            : packs
                    ).map((pack) => (
                        <TableRow key={pack._id}>
                            <TableCell component="th" scope="row">
                                <NavLink to={`/cards/${pack._id}`}>
                                    {pack.name}
                                </NavLink>
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                {pack.cardsCount}
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                {pack.user_name}
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                {pack.updated}
                            </TableCell>
                            <TableCell style={{width: 160}} align="right">
                                <IconButton aria-label="delete" onClick={() => deletePack(pack._id)}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => deletePack(pack._id)}>
                                    <CreateIcon/>
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
                            count={packs.length}
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