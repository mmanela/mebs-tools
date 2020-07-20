import React from 'react';
import {
  Box,
  Grommet
} from 'grommet';
import styled from "styled-components";
import { GlobalTheme } from './Theme';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { PageRouter } from './components/PageRouter';

const StyledMainBox = styled(Box)`
  margin-bottom: 10px;
  margin-top: 0;
  margin-left:0;
  margin-right:0;
  padding-top: 10px;
`;

const getBasename = (path: string) => path.substr(0, path.lastIndexOf('/'));

const App = () => {

  return (
    <Router basename={getBasename(window.location.pathname)}>
      <Grommet theme={GlobalTheme} full>
        <Box fill>
          <StyledMainBox direction='row' flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align='center' justify='center'>
              <PageRouter />
            </Box>
          </StyledMainBox>
        </Box>
      </Grommet>
    </Router>
  );

}
export default App;