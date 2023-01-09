import React from 'react';
import styles from './HomePage.module.scss'
import { Avatar, TextField, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectUserData, selectUserStatus, setStatus } from '../../app/reducers/userReducer';
import { createTask, deleteTask, getTask, selectTaskData, updateTask } from '../../app/reducers/taskReducer';
import Task from '../../Components/Task/Task';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const HomePage = () => {

    const userStatus = useSelector(selectUserStatus)
    const accessToken = useSelector(selectAccessToken)
    const user = useSelector(selectUserData)
    const data = useSelector(selectTaskData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    // const handleClick = () => {
    //     setIsOpen(true);
    // }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    }

    useEffect(() => {
        if (userStatus != 'succeeded')
            navigate('/signin')
    }, [])

    useEffect(() => {
        if (userStatus == 'succeeded')
            dispatch(getTask(accessToken))
                .then(unwrapResult)
                .catch((rejectedValueOrSerializedError) => {
                    if (rejectedValueOrSerializedError == '401') {
                        dispatch(setStatus('unauthorized'))
                        navigate('/signin')
                    } else {
                        setMessage('Check your connection and try again')
                        setType('error')
                        setIsOpen(true)
                    }
                })
    }, [userStatus])

    const handleCreateTask = () => {
        const data = { name, status: false }
        dispatch(createTask({ accessToken, data }))
            .then(unwrapResult)
            .then(() => {
                setMessage('Create task successfully')
                setType('success')
                setIsOpen(true)
            })
            .catch(() => {
                setMessage('Create task error')
                setType('error')
                setIsOpen(true)
            })
        setName('')
    }

    const handleUpdateTask = (data, id) => {
        dispatch(updateTask({ accessToken, data, id }))
            .then(unwrapResult)
            .then(() => {
                setMessage('Update task successfully')
                setType('success')
                setIsOpen(true)
            })
            .catch(() => {
                setMessage('Update task error')
                setType('error')
                setIsOpen(true)
            })
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTask({ accessToken, id }))
            .then(unwrapResult)
            .then(() => {
                setMessage('Delete task successfully')
                setType('success')
                setIsOpen(true)
            })
            .catch(() => {
                setMessage('Delete task error')
                setType('error')
                setIsOpen(true)
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Avatar
                    sx={{ width: 48, height: 48, margin: '0 20px' }}>
                    <AccountCircleIcon />
                </Avatar>
                Welcome {user.username}
            </div>
            <div className={styles.body}>
                <div className={styles.input}>
                    <div style={{ width: '90%' }}>
                        <TextField label="Task name" variant="outlined" size='small' value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    </div>
                    <Button variant="contained" size='small' onClick={() => handleCreateTask()}>Add</Button>
                </div>
                <div className={styles.list}>
                    {
                        data && data.length > 0 && data.map(task => {
                            return (
                                <Task key={task.id} data={task} handleUpdate={handleUpdateTask} handleDelete={handleDeleteTask} />
                            )
                        })
                    }

                </div>
            </div>
            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default HomePage