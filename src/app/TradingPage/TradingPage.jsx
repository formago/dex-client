// @flow
import React from 'react';
import styled from 'styled-components';
import OHLCV from '../../components/OHLCV';
import OrdersTable from '../../components/OrdersTable';
import OrderForm from '../../components/OrderForm';
import TradesTable from '../../components/TradesTable';
import TokenSearcher from '../../components/TokenSearcher';
import OrderBook from '../../components/OrderBook';
import { Grid, Cell } from 'styled-css-grid';

import { Redirect } from 'react-router-dom';

type Props = {
  authenticated: boolean,
  queryDefaultData: () => void,
};

type State = {};

export default class TradingPage extends React.PureComponent<Props, State> {
  componentDidMount() {
    const { authenticated, queryDefaultData } = this.props;
    if (authenticated) queryDefaultData();
  }

  render() {
    const { authenticated } = this.props;
    if (!authenticated) return <Redirect to="/login" />;
    return (
      <TradingPageLayout>
        <Cell area="leftColumn">
          <Grid columns={1} alignContent="start">
            <TokenSearcher />
            <OrderForm side="BUY" />
            <OrderForm side="SELL" />
          </Grid>
        </Cell>

        <Cell area="middleColumn">
          <Grid columns={1} alignContent="start">
            <OHLCV />
            <OrdersTable />
            <Grid columns={2} alignContent="start">
              <OrderBook />
              <TradesTable />
            </Grid>
          </Grid>
        </Cell>
      </TradingPageLayout>
    );
  }
}

// closure css for styled.Grid
styled.Grid = styled(Grid).attrs({
  className: 'trading-page-layout',
  columns: '1fr 4fr',
  rows: 'fr',
  areas: ['leftColumn middleColumn'],
});

const TradingPageLayout = styled.Grid`
  padding: 10px;
`;
