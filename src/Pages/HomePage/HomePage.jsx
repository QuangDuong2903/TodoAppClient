import styles from './HomePage.module.scss'
import { Avatar, TextField, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken, selectUserData, selectUserStatus, setStatus } from '../../app/reducers/userReducer';
import { createTask, deleteTask, getTask, selectTaskData, updateTask } from '../../app/reducers/taskReducer';
import Task from '../../Components/Task/Task';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit'

const HomePage = () => {

    const userStatus = useSelector(selectUserStatus)
    const accessToken = useSelector(selectAccessToken)
    const user = useSelector(selectUserData)
    const data = useSelector(selectTaskData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')

    useEffect(() => {
        if (userStatus != 'succeeded')
            navigate('/signin')
    }, [])

    useEffect(() => {
        if (userStatus == 'succeeded')
            dispatch(getTask(accessToken))
                .then(unwrapResult)
                .then((originalPromiseResult) => {
                    //console.log(originalPromiseResult)
                })
                .catch((rejectedValueOrSerializedError) => {
                    //console.log(rejectedValueOrSerializedError)
                    if (rejectedValueOrSerializedError == '401') {
                        dispatch(setStatus('unauthorized'))
                        navigate('/signin')
                    }
                })
    }, [userStatus])

    const handleCreateTask = () => {
        const data = { name, status: false }
        dispatch(createTask({ accessToken, data }))
        setName('')
    }

    const handleUpdateTask = (data, id) => {
        dispatch(updateTask({ accessToken, data, id }))
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTask({ accessToken, id }))
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
        </div>
    )
}

export default HomePage