import { Chip } from '@mui/material';

const MethodologyBadge = ({ methodology }) => {
    let color
    if (String(methodology).toLowerCase() === 'agile') {
        color = "#f37322";
    } else if (String(methodology).toLowerCase() === 'waterfall') {
        color = "#2eb14c"
    } else {
        color = "#e5ecf6";
    }
    return (
        <Chip style={{backgroundColor:color}} label={methodology}/>
    )
}

export default MethodologyBadge;