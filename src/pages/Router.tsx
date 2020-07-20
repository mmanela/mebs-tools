import React from "react";
import { CardSort } from "../components/CardSort";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";
import { CardSortStore, CardSortConfig } from "../stores/cardSortStore";

// Config files
import cardSortConfig from "../configurations/cardSortConfig.json";
import flipBoardConfig from "../configurations/flipBoardConfig.json";
import { FlipBoardStore, FlipBoardConfig } from "../stores/flipBoardStore";
import { FlipBoard } from "../components/FlipBoard";

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

export const CardSortRouter = () => {

    let { path, url } = useRouteMatch();

    const cardSortSection = getCardSorts(path, url);
    const flipBoardSection = getFlipBoards(path, url);

    return (
        <StyledBox fill={true} flex align='center'  >
            <Switch>
                {flipBoardSection.routes}
                {cardSortSection.routes}
                <Route path="/">
                    <h1>Directory</h1>
                    {flipBoardSection.section}
                    {cardSortSection.section}
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
    const routes = configs.map(x => <Route key={x.name} path={`${path}/${x.name}`}>
        <CardSort configuration={x} store={CardSortStore.Instance} />
    </Route>);

    const links = configs.map(x => <li style={{ marginBottom: '8px' }} key={x.name}><StyledLink key={x.name} to={`${url}/${x.name}`}>
        {x.title}
    </StyledLink></li>);

    const section = <SectionBox><h2>Card Sorts</h2>
        <ul>
            {links}
        </ul>
    </SectionBox>;

    return { routes, section };
}


const getFlipBoards = (path: string, url: string) => {
    const configs: FlipBoardConfig[] = flipBoardConfig;
    if (!configs || configs.length <= 0) {
        return {};
    }
    const routes = configs.map(x => <Route key={x.name} path={`${path}/${x.name}`}>
        <FlipBoard configuration={x} store={FlipBoardStore.Instance} />
    </Route>);

    const links = configs.map(x => <li style={{ marginBottom: '8px' }} key={x.name}><StyledLink key={x.name} to={`${url}/${x.name}`}>
        {x.title}
    </StyledLink></li>);

    const section = <SectionBox><h2>Flip Boards</h2>
        <ul>
            {links}
        </ul>
    </SectionBox>;

    return { routes, section };
}