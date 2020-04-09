import React, { useState } from 'react';
import {
  Box,
  Grommet,
  Nav,
  Anchor
} from 'grommet';
import { BirthPlanGrid } from './pages/BirthPlanGrid';
import styled from "styled-components";
import { GlobalTheme } from './Theme';
import { SignsOfLabor } from './pages/SignsOfLabor';

const StyledMainBox = styled(Box)`
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left:30px;
  margin-right:30px;
`;
enum Pages {
  BirthPlan,
  LaborSigns
}
const App = () => {
  const [page, setPage] = useState<Pages>(Pages.BirthPlan);

  return (
    <Grommet theme={GlobalTheme} full>
      <Box fill>
        <Nav direction="row" background="white" pad="small" gap="small">
          <Anchor onClick={() => setPage(Pages.BirthPlan)}>Birth Plan</Anchor>
          <Anchor onClick={() => setPage(Pages.LaborSigns)}>Signs of Labor</Anchor>
        </Nav>
        <StyledMainBox direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <Box flex align='center' justify='center'>
            {page === Pages.BirthPlan && <BirthPlanGrid />}
            {page === Pages.LaborSigns && <SignsOfLabor />}
          </Box>
        </StyledMainBox>
      </Box>
    </Grommet>
  );

}
export default App;