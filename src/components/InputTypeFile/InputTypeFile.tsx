import React, {ChangeEvent} from 'react';
import {useAppDispatch} from '../../redux/store';
import {setAppErrorAC} from '../../redux/reducers/app-reducer';
import {convertFileToBase64} from '../../utils/convertFileToBase64';

type InputTypeFilePropsType = {
    uploadImage: (image: string) => void
    children: React.ReactNode
}

export const InputTypeFile: React.FC<InputTypeFilePropsType> = ({uploadImage, children}) => {

    const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    uploadImage(file64)
                })
            } else {
                dispatch(setAppErrorAC('The file is too large'))
            }
        }
    }

    return (
        <div>
            <label>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                {children}
            </label>
        </div>
    )
}
