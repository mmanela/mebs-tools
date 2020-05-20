import React from 'react';
import {
  Box,
  Grommet
} from 'grommet';
import { BirthPlanGrid } from './pages/BirthPlanGrid';
import styled from "styled-components";
import { GlobalTheme } from './Theme';
import { SignsOfLabor } from './pages/SignsOfLabor';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { NewbornConcernGrid } from './pages/NewbornConcerns';

const StyledMainBox = styled(Box)`
  margin-bottom: 10px;
  margin-top: 0;
  margin-left:0;
  margin-right:0;
  padding-top: 10px;
`;


// const StyledLink = styled(Link)`
//   font-weight: bold;
//   text-decoration: none;
//   margin-right: 5px;
//   color: ${props => props.theme.global.colors['neutral-3']};
//   &:active, &:visited {
//     color: ${props => props.theme.global.colors['neutral-3']};
//     border: none;
//   }
//   &:hover {
//     color: ${props => props.theme.global.colors['neutral-4']};

//   }
// `;

const App = () => {

  return (
    <Router>
      <Grommet theme={GlobalTheme} full>
        <Box fill>
          {/* <Nav direction="row" background="MebsLightGray" pad="small" gap="small">
            <Heading size="small" level="5" margin="0">Mallory Emerson Birth Tools</Heading>
            <StyledLink to="/birthplan">Birth Plan</StyledLink>
            <StyledLink to="/laborsigns">Signs of Labor</StyledLink>
            <StyledLink to="/newbornconcerns">Newborn Concerns</StyledLink>
          </Nav> */}
          <StyledMainBox direction='row' flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align='center' justify='center'>

              <Switch>
                <Route path="/laborsigns">
                  <SignsOfLabor />
                </Route>
                <Route path="/birthplan">
                  <BirthPlanGrid />
                </Route>
                <Route path="/newbornconcerns">
                  <NewbornConcernGrid />
                </Route>
                <Route path="/">
                  <BirthPlanGrid />
                </Route>
              </Switch>
            </Box>
          </StyledMainBox>
        </Box>
      </Grommet>
    </Router>
  );

}
export default App;