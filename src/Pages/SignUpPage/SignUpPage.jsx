import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createUser, selectUserStatus } from '../../app/reducers/userReducer';
import { unwrapResult } from '@reduxjs/toolkit'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

const SignUpPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const status = useSelector(selectUserStatus)
    const [errMsg, setErrMsg] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isNotValidated, setIsNotValidated] = useState(false)
    const [isNotValidatedEmail, setIsNotValidatedEmail] = useState(false)

    const handleSubmit = () => {
        if (!username || !password || !email)
            setIsNotValidated(true)
        else {
            if (!String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )) {
                setIsNotValidated(true)
                setIsNotValidatedEmail(true)
            }
            else {
                const data = { username, password, email }
                dispatch(createUser(data))
                    .then(unwrapResult)
                    .catch((rejectedValueOrSerializedError) => {
                        console.error(rejectedValueOrSerializedError)
                        if (rejectedValueOrSerializedError == '409')
                            setErrMsg('Username or email already in use')
                        else
                            setErrMsg('Server error')
                    })
            }
        }
    }

    useEffect(() => {
        if (status == 'succeeded')
            navigate('/')
    }, [status])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    label="Username"
                                    autoFocus
                                    value={username}
                                    onChange={e => setUserName(e.target.value)}
                                />
                                {
                                    isNotValidated && !username &&
                                    <Alert variant="outlined" severity="error" sx={{ margin: '10px 0', fontSize: '13px' }}>
                                        Username is required
                                    </Alert>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => {
                                        setEmail(e.target.value)
                                        setIsNotValidated(false)
                                    }}
                                />
                                {
                                    isNotValidated && !email &&
                                    <Alert variant="outlined" severity="error" sx={{ margin: '10px 0', fontSize: '13px' }}>
                                        Email is required
                                    </Alert>
                                }
                                {
                                    isNotValidatedEmail && isNotValidated &&
                                    <Alert variant="outlined" severity="error" sx={{ margin: '10px 0', fontSize: '13px' }}>
                                        Please enter a valid email address
                                    </Alert>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {
                                    isNotValidated && !password &&
                                    <Alert variant="outlined" severity="error" sx={{ margin: '10px 0', fontSize: '13px' }}>
                                        Password is required
                                    </Alert>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                            {
                                status == 'loading' &&
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <CircularProgress />
                                    </Box>
                                </Grid>
                            }
                            {
                                errMsg &&
                                <Grid item xs={12}>
                                    <Alert variant="outlined" severity="error" sx={{ margin: '10px 0', fontSize: '13px' }}>
                                        {errMsg}
                                    </Alert>
                                </Grid>
                            }
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => handleSubmit()}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link variant="body2" onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}

export default SignUpPage