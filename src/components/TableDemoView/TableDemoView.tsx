import InfoTable from '../InfoTable';
import { Box, Button } from '@mui/material';

const testRows = Array(15)
  .fill(null)
  .map((_, i) => ({
    key: `KEY ${i}`,
    value: 'VALUE',
  }));

function TableDemoView() {
  return (
    <Box sx={{ textAlign: 'center' }} flex={1} flexDirection={'column'}>
      <InfoTable header="Test Table" rows={testRows} />
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
      <Button variant="contained">Hello</Button>
    </Box>
  );
}

export default TableDemoView;
