import React from "react";
import { CardSort } from "./CardSort";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";
import { CardSortStore, CardSortConfig } from "../stores/cardSortStore";


// Config files
import cardSortConfig from "../configurations/cardSortConfig.json";

import colorBoardConfig from "../configurations/colorBoardConfig.json";
import { ColorBoardStore, ColorBoardConfig } from "../stores/colorBoardStore";
import { ColorBoard } from "./ColorBoard";


const StyledBox = styled(Box)`
`;

const SectionBox = styled(Box)`
    width:500px;
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  font-size: 17px;
  color: ${props => props.theme.global.colors['neutral-3']};
  &:active, &:visited {
    color: ${props => props.theme.global.colors['neutral-3']};
    border: none;
  }
  &:hover {
    color: ${props => props.theme.global.colors['neutral-4']};
  }
`;

export const PageRouter = () => {

    let { path, url } = useRouteMatch();

    const cardSortSection = getCardSorts(path, url);
    
    const triColorBoardSection = getColorBoards(path, url);
    

    return (
        <StyledBox fill={true} flex align='center'  >
            <Switch>
                
                {cardSortSection.routes}
                {triColorBoardSection.routes}
                
                <Route path="/">
                    <h1>Directory of Tools</h1>
                    
                    {cardSortSection.section}
                    {triColorBoardSection.section}
                    
                </Route>
            </Switch></StyledBox>);
}


export interface PageSections {
    section?: JSX.Element;
    routes?: JSX.Element[];
}

const getCardSorts = (path: string, url: string) => {
    const configs: CardSortConfig[] = cardSortConfig;
    if (!configs || configs.length <= 0) {
        return {};
    }
    const routes = configs.map(x => <Route key={x.name} path={`${path}${x.name}`}>
        <CardSort configuration={x} store={CardSortStore.Instance} />
    </Route>);

    const links = configs.map(x => <li style={{ marginBottom: '8px' }} key={x.name}><StyledLink key={x.name} to={`${url}${x.name}`}>
        {x.title}
    </StyledLink></li>);

    const section = <SectionBox><h2>Card Sorts</h2>
        <ul>
            {links}
        </ul>
    </SectionBox>;

    return { routes, section };
}



const getColorBoards = (path: string, url: string) => {
    const configs: ColorBoardConfig[] = colorBoardConfig;
    if (!configs || configs.length <= 0) {
        return {};
    }
    const routes = configs.map(x => <Route key={x.name} path={`${path}${x.name}`}>
        <ColorBoard configuration={x} store={ColorBoardStore.Instance} />
    </Route>);

    const links = configs.map(x => <li style={{ marginBottom: '8px' }} key={x.name}><StyledLink key={x.name} to={`${url}${x.name}`}>
        {x.title}
    </StyledLink></li>);

    const section = <SectionBox><h2>Color Boards</h2>
        <ul>
            {links}
        </ul>
    </SectionBox>;

    return { routes, section };
}

