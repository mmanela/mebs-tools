import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext
} from 'grommet';
import { FormClose, Menu } from 'grommet-icons';
import { BirthPlanGrid } from './BirthPlanGrid';
import styled from "styled-components";

const theme = {
  global: {
    colors: {
      brand: '#6600cc',
    },
    font: {
      family: 'Helvetica',
      size: '14px',
      height: '20px',
    },
    breakpoints: {
      xsmall: {
        value: 650
      },
      small: {
        value: 950
      },
      medium: {
        value: 1200
      },
      large: {
        value: 1500
      },
      xlarge: {
        value: 3000
      }
    }
  },
};

const AppBar = (props: any) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
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
  const [showSidebar, setShowSidebar] = useState(false);
  // var sideBar = (!showSidebar || size !== 'small') ? (
  //   <Collapsible direction="horizontal" open={showSidebar}>
  //     <Box
  //       flex
  //       width='medium'
  //       background='light-2'
  //       elevation='small'
  //       align='center'
  //       justify='center'
  //     >
  //       sidebar
  //       </Box>
  //   </Collapsible>
  // ) : (
  //     <Layer>
  //       <Box
  //         background='light-2'
  //         tag='header'
  //         justify='end'
  //         align='center'
  //         direction='row'
  //       >
  //         <Button
  //           icon={<FormClose />}
  //           onClick={() => setShowSidebar(false)}
  //         />
  //       </Box>
  //       <Box
  //         fill
  //         background='light-2'
  //         align='center'
  //         justify='center'
  //       >
  //         sidebar
  //       </Box>
  //     </Layer>
  //   );
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <Heading level='3' margin='none'>Birth Board <span role="img" aria-label="Pregnant person">🤰</span></Heading>
              {/* <Button
                icon={<Menu />}
                onClick={() => setShowSidebar(!showSidebar)}
              /> */}
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