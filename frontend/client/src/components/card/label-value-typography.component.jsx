import {Typography} from '@mui/material';


const LabelValueTypography = ({ label, value }) => {
    return (
        <Typography variant="body1" align="left" >
        <h3 style={{display: 'inline'}}>{label}: </h3>
        <span style={{flexGrow: 1}}></span>
        <span>{value}</span>
        </Typography>
    )
}

export default LabelValueTypography;