import styles from './Task.module.scss'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton } from '@mui/material'
import { useState } from 'react';

const Task = ({ data, handleUpdate, handleDelete }) => {

    const id = data.id
    const [name, setName] = useState(data.name)
    const [status, setStatus] = useState(data.status)
    const [isEditName, setIsEditName] = useState(false)

    const handleUpdateTask = () => {
        const data = { name, status }
        handleUpdate(data, id)
    }

    const handleUpdateStatus = (status) => {
        const data = { name, status }
        handleUpdate(data, id)
    }

    return (
        <div className={styles.item} style={{ backgroundColor: status ? '#18bd18' : '#fff' }}>
            <div className={styles.name} onClick={() => setIsEditName(true)}>
                {
                    isEditName ?
                        <TextField label="Task name" variant="outlined" size='small' fullWidth autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => {
                                handleUpdateTask()
                                setIsEditName(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUpdateTask()
                                    setIsEditName(false)
                                }
                            }}
                        />
                        :
                        <span>{name}</span>
                }
            </div>
            <div className={styles.btn}>
                <IconButton
                    sx={{ width: 25, height: 25, margin: '0 10px' }}
                    onClick={() => setIsEditName(true)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    sx={{ width: 25, height: 25, margin: '0 10px' }}
                    onClick={() => {
                        handleUpdateStatus(!status)
                        setStatus(!status)
                    }}
                >
                    <DoneIcon />
                </IconButton>
                <IconButton
                    sx={{ width: 25, height: 25, margin: '0 10px' }}
                    onClick={() => handleDelete(id)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Task