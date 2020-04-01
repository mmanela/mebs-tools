import React from 'react';
import {
  Box,
  Grommet,
  ResponsiveContext
} from 'grommet';
import { BirthPlanGrid } from './BirthPlanGrid';
import styled from "styled-components";
import { GlobalTheme } from './Theme';

const StyledMainBox = styled(Box)`
  margin-bottom: 10px;
`;
const App = () => {
  return (
    <Grommet theme={GlobalTheme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <StyledMainBox direction='row' flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align='center' justify='center'>
                <BirthPlanGrid />
              </Box>
            </StyledMainBox>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );

}
export default App;