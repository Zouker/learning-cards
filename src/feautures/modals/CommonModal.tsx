import React, {FC, memo, ReactNode} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import {IconButton} from '@mui/material';
import styles from './CommonModal.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


type CommonModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    handleCloseOperation?: () => void
    handleOperation: () => void
    modalTitle: string
    children: ReactNode
    buttonTitle: string
}


export const CommonModal: FC<CommonModalPropsType> = memo(({
                                                               isModalOpen,
                                                               setIsModalOpen,
                                                               handleOperation,
                                                               modalTitle,
                                                               children,
                                                               buttonTitle
                                                           }) => {

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
        >
            <Box sx={style}>
                <div className={styles.modalHeader}>
                    <h2>{modalTitle}</h2>
                    <IconButton aria-label="close" onClick={handleModalClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <hr/>
                <div>
                    {children}
                </div>
                <div className={styles.buttonsBar}>
                    <Button variant="outlined" onClick={handleModalClose}>Cancel</Button>
                    <Button variant="contained" onClick={() => handleOperation()}>{buttonTitle}</Button>
                </div>
            </Box>
        </Modal>
    );
})
