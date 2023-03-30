import { Paper, Box } from '@mui/material';
import { Card, CardActions, CardContent } from '@mui/material';
import { Divider, Chip, Button } from '@mui/material';
import {Typography, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';

import LabelValueTypography from './label-value-typography.component';
import MethodologyBadge from './methodology-badge.component';


const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(20),
    },
  }));

const ProductCard = ({ product }) => {
    const {
        productId,
        productName,
        productOwnerName,
        scrumMasterName,
        developers,
        startDate,
        methodology,
    } = product;

    const developersList = developers.map((developer) => {
        return (
          <p
            key={`${productId}${developer}`}
            style={{ margin: '4px 0', paddingLeft: '10px' }}
          >
            • {developer}
          </p>
        );
      });

    return (
        <Root>
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <Typography variant="h5" align="left" gutterBottom>
              <Box display="inline-block" mr={1}>
                  <b>{productName}</b>
              </Box>
              <MethodologyBadge methodology={methodology}></MethodologyBadge>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5 }} align="left" color="text.secondary">
                <b>Project ID: </b> {productId}
            </Typography>
            <LabelValueTypography label="Owner" value={productOwnerName} />
            <LabelValueTypography label="Scrum Master" value={scrumMasterName} />
            <LabelValueTypography label="Developers" value={developersList} />
            <LabelValueTypography label="Start Date" value={startDate} />
            </CardContent>
            <CardActions>
            <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        </Root>
    );
};

export default ProductCard;