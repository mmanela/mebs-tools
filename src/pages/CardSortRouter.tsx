import React from "react";
import configuration from "../configurations/cardSortConfig.json";
import { CardSortConfig, CardSort } from "../components/CardSort";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { Box } from "grommet";
import styled from "styled-components";


const StyledBox = styled(Box)`
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

    const links = configs.map(x => <Link key={x.name} to={`${url}/${x.name}`}>
        {x.title}
    </Link>);

    return (
        <StyledBox fill={true} flex align='center'  >
            <Switch>
                {routes}
                <Route path="/">
                    <h2>Card Sorts</h2>
                    {links}
                </Route>
            </Switch></StyledBox>);
}
