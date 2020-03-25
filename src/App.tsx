import React from 'react';
import {
  Box,
  Heading,
  Grommet,
  ResponsiveContext
} from 'grommet';
import { BirthPlanGrid } from './BirthPlanGrid';
import styled from "styled-components";
import { GlobalTheme } from './Theme';


const AppBar = (props: any) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='MebsDarkYellow'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

const StyledMainBox = styled(Box)`
  margin-bottom: 10px;
`;
const App = () => {
  return (
    <Grommet theme={GlobalTheme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <Heading level='3' margin='none'>Birth Planner <span role="img" aria-label="Pregnant person">🤰</span></Heading>
            </AppBar>
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