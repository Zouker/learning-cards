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
import {TableHead} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {deletePackTC, setPackPageAC, setPackPageCountAC, updatePackTC} from '../../bll/reducers/packs-reducer';
import CreateIcon from '@mui/icons-material/Create';
import {useNavigate} from 'react-router-dom';
import styles from './PacksTable.module.css'
import {formatDate} from '../../common/format-date/formatDate';

export const PacksTable = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setPackPageAC(newPage + 1))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPackPageCountAC(+event.target.value))
        dispatch(setPackPageAC(1))
    };

    const updatePack = (packId: string) => {
        const newPackName = 'BYE'
        const newDeckCover = ''
        dispatch(updatePackTC(packId, newPackName, newDeckCover))
    }

    const deletePack = (packId: string) => {
        dispatch(deletePackTC(packId))
    }

    const openCards = (packId: string, packName: string) => {
        navigate(`/cards/${packName}~${packId}`)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Cards</TableCell>
                        <TableCell align="center">Created By</TableCell>
                        <TableCell align="center">Updated</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((pack) => (
                        <TableRow key={pack._id}>
                            <TableCell component="th" scope="row">
                                <div onClick={() => openCards(pack._id, pack.name)} className={styles.openPack}>
                                    {pack.name}
                                </div>
                            </TableCell>
                            <TableCell align="center">
                                {pack.cardsCount}
                            </TableCell>
                            <TableCell align="center">
                                {pack.user_name}
                            </TableCell>
                            <TableCell align="center">
                                {formatDate(pack.updated)}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => updatePack(pack._id)}>
                                    <CreateIcon/>
                                </IconButton>
                                <IconButton onClick={() => deletePack(pack._id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            colSpan={3}
                            count={cardPacksTotalCount}
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