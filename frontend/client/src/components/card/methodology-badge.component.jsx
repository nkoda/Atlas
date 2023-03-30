import { Chip } from '@mui/material';

const MethodologyBadge = ({ methodology }) => {
    let color
    if (methodology === 'Agile') {
        color = "success";
    } else {
        color = "info"
    }
    return (
        <Chip color={color} label={methodology}/>
    )
}

export default MethodologyBadge;