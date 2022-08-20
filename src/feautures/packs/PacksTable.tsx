import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {TableHead} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import {setPackPageAC, setPackPageCountAC, sortPacksTC,} from '../../bll/reducers/packs-reducer';
import CreateIcon from '@mui/icons-material/Create';
import {useNavigate} from 'react-router-dom';
import styles from './PacksTable.module.css'
import {formatDate} from '../../common/format-date/formatDate';
import {CardPacksType} from './packsAPI';
import {UpdatePackModal} from '../modals/modals-packs/UpdatePackModal';
import {DeletePackModal} from '../modals/modals-packs/DeletePackModal';
import noImage from '../../assets/img/no-image.svg';

export const PacksTable = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const sortPacks = useAppSelector(state => state.packs.params.sortPacks)
    const userId = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.app.status)

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updatePacksData, setUpdatePacksData] = useState<CardPacksType | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePacksData, setDeletePacksData] = useState<CardPacksType | null>(null);

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

    const openUpdatePackModal = (pack: CardPacksType) => {
        setIsUpdateModalOpen(true);
        setUpdatePacksData(pack);
    }

    const openDeletePackModal = (pack: CardPacksType) => {
        setIsDeleteModalOpen(true);
        setDeletePacksData(pack);
    }

    const openLearnPage = (packId: string, packName: string) => {
        navigate(`/learn/${packId}/${packName}`)
    }

    const sort = (sortParams: string) => {
        return sortPacks === `1${sortParams}` ? dispatch(sortPacksTC(`0${sortParams}`)) : dispatch(sortPacksTC(`1${sortParams}`))
    }

    const openCards = (packId: string, packName: string) => {
        navigate(`/cards/${packId}/${packName}`)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Cover</TableCell>
                            <TableCell align="center"
                                       className={sortPacks === '0name' ? styles.sortUp : styles.sortDown}
                                       onClick={() => sort('name')}>Name</TableCell>
                            <TableCell align="center"
                                       className={sortPacks === '0cardsCount' ? styles.sortUp : styles.sortDown}
                                       onClick={() => sort('cardsCount')}>Cards</TableCell>
                            <TableCell align="center"
                                       className={sortPacks === '0user_name' ? styles.sortUp : styles.sortDown}
                                       onClick={() => sort('user_name')}>Created By</TableCell>
                            <TableCell align="center"
                                       className={sortPacks === '0updated' ? styles.sortUp : styles.sortDown}
                                       onClick={() => sort('updated')}>Updated</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.length ? status !== 'loading' && packs.map((pack) => (
                            <TableRow key={pack._id}>
                                <TableCell align="center" component="th" scope="row">
                                    <img src={pack.deckCover ? pack.deckCover : noImage} alt={'pack cover'}
                                         className={styles.deckCover}/>
                                </TableCell>
                                <TableCell align="center" onClick={() => openCards(pack._id, pack.name)}
                                           className={styles.openPack}>
                                    {pack.name}
                                </TableCell>
                                <TableCell align="center">
                                    {pack.cardsCount}
                                </TableCell>
                                <TableCell align="center" className={styles.createdBy}>
                                    {pack.user_name}
                                </TableCell>
                                <TableCell align="center">
                                    {formatDate(pack.updated)}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton disabled={userId !== pack.user_id}
                                                onClick={() => openUpdatePackModal(pack)}>
                                        <CreateIcon/>
                                    </IconButton>
                                    <IconButton disabled={userId !== pack.user_id}
                                                onClick={() => openDeletePackModal(pack)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton disabled={pack.cardsCount === 0}
                                                onClick={() => openLearnPage(pack._id, pack.name)}>
                                        <SchoolIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                            : status !== 'loading' && <TableRow><TableCell colSpan={5}
                                                                           sx={{
                                                                               textAlign: 'center',
                                                                               fontWeight: 'bold',
                                                                               color: 'red'
                                                                           }}>PACKS NOT FOUND</TableCell></TableRow>}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                colSpan={6}
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
            {updatePacksData && <UpdatePackModal isModalOpen={isUpdateModalOpen}
                                                 setIsModalOpen={setIsUpdateModalOpen}
                                                 cardsPack={updatePacksData}
            />}
            {deletePacksData && <DeletePackModal isModalOpen={isDeleteModalOpen}
                                                 setIsModalOpen={setIsDeleteModalOpen}
                                                 packName={deletePacksData && deletePacksData.name}
                                                 _id={deletePacksData && deletePacksData._id}

            />}
        </>
    );
}