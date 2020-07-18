import React from "react";
import configuration from "../configurations/cardSortConfig.json";
import { CardSortConfig, CardSort } from "../components/CardSort";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";


const StyledBox = styled(Box)`
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

    const configs: CardSortConfig[] = configuration;
    if (!configs || configs.length <= 0) {
        return <div>No valid card sort configs found</div>
    }
    const routes = configs.map(x => <Route key={x.name} path={`${path}/${x.name}`}>
        <CardSort configuration={x} />
    </Route>);

    const links = configs.map(x => <li style={{ marginBottom: '8px' }} key={x.name}><StyledLink key={x.name} to={`${url}/${x.name}`}>
        {x.title}
    </StyledLink></li>);

    return (
        <StyledBox fill={true} flex align='center'  >
            <Switch>
                {routes}
                <Route path="/">
                    <h2>Card Sorts</h2>
                    <ul>
                        {links}
                    </ul>
                </Route>
            </Switch></StyledBox>);
}
