// @flow
import React from 'react';
import styled from 'styled-components';
import DepositTableRenderer from './DepositTableRenderer';
import DepositModal from '../../components/DepositModal';
import TransferTokensModal from '../../components/TransferTokensModal';
import ConvertTokensModal from '../../components/ConvertTokensModal';

import type { Symbol, Token, TokenData } from '../../types/tokens';

type Props = {
  connected: boolean,
  toggleAllowance: Symbol => void,
  tokenData: Array<TokenData>,
  baseTokens: Array<Symbol>,
  quoteTokens: Array<Symbol>,
  redirectToTradingPage: string => void
};

type State = {
  isDepositModalOpen: boolean,
  isSendModalOpen: boolean,
  isConvertModalOpen: boolean,
  convertModalFromToken: string,
  convertModalToToken: string,
  selectedToken: ?Token,
  hideZeroBalanceToken: boolean,
  searchInput: string
};

class DepositTable extends React.PureComponent<Props, State> {
  state = {
    isDepositModalOpen: false,
    isSendModalOpen: false,
    isConvertModalOpen: false,
    selectedToken: null,
    hideZeroBalanceToken: false,
    searchInput: '',
    convertModalFromToken: 'ETH',
    convertModalToToken: 'WETH'
  };

  openDepositModal = (symbol: Symbol) => {
    let selectedToken = this.props.tokenData.filter(
      elem => elem.symbol === symbol
    )[0];

    this.setState({
      isDepositModalOpen: true,
      selectedToken: selectedToken
    });
  };

  openSendModal = (symbol: Symbol) => {
    let selectedToken = this.props.tokenData.filter(
      elem => elem.symbol === symbol
    )[0];

    this.setState({
      isSendModalOpen: true,
      selectedToken: selectedToken
    });
  };

  openConvertModal = (fromTokenSymbol: Symbol, toTokenSymbol: Symbol) => {
    this.setState((previousState, currentProps) => {
      return {
        ...previousState,
        convertModalFromToken: fromTokenSymbol,
        convertModalToToken: toTokenSymbol,
        isConvertModalOpen: true
      };
    });
  };

  closeDepositModal = () => {
    this.setState({ isDepositModalOpen: false });
  };

  closeSendModal = () => {
    this.setState({ isSendModalOpen: false });
  };

  closeConvertModal = () => {
    this.setState({ isConvertModalOpen: false });
  };

  handleSearchInputChange = (e: SyntheticInputEvent<>) => {
    this.setState({ searchInput: e.target.value });
  };

  toggleZeroBalanceToken = () => {
    this.setState({ hideZeroBalanceToken: !this.state.hideZeroBalanceToken });
  };

  filterTokens = (data: Array<TokenData>) => {
    const { searchInput, hideZeroBalanceToken } = this.state;

    if (searchInput)
      data = data.filter(
        token => token.symbol.indexOf(searchInput.toUpperCase()) > -1
      );
    if (hideZeroBalanceToken) data = data.filter(token => +token.balance !== 0);

    return data;
  };

  render() {
    let {
      connected,
      tokenData,
      quoteTokens,
      baseTokens,
      toggleAllowance,
      redirectToTradingPage
    } = this.props;
    let {
      isDepositModalOpen,
      isSendModalOpen,
      selectedToken,
      searchInput,
      hideZeroBalanceToken,
      isConvertModalOpen,
      convertModalFromToken,
      convertModalToToken
    } = this.state;

    let quoteTokenData = tokenData.filter(
      (token: Token) =>
        quoteTokens.indexOf(token.symbol) !== -1 &&
        token.symbol !== 'WETH' &&
        token.symbol !== 'ETH'
    );
    let baseTokenData = tokenData.filter(
      (token: Token) =>
        baseTokens.indexOf(token.symbol) === -1 &&
        token.symbol !== 'WETH' &&
        token.symbol !== 'ETH'
    );
    let WETHTokenData = tokenData.filter(
      (token: Token) => token.symbol === 'WETH'
    );
    let ETHTokenData = tokenData.filter(
      (token: Token) => token.symbol === 'ETH'
    );

    let filteredBaseTokenData = this.filterTokens(baseTokenData);
    let filteredQuoteTokenData = this.filterTokens(quoteTokenData);
    let filteredWETHTokenData = this.filterTokens(WETHTokenData);
    let filteredETHTokenData = this.filterTokens(ETHTokenData);

    return (
      <Wrapper>
        <DepositTableRenderer
          connected={connected}
          baseTokensData={filteredBaseTokenData}
          quoteTokensData={filteredQuoteTokenData}
          ETHTokenData={filteredETHTokenData[0]}
          WETHTokenData={filteredWETHTokenData[0]}
          tokenDataLength={tokenData.length}
          searchInput={searchInput}
          hideZeroBalanceToken={hideZeroBalanceToken}
          openDepositModal={this.openDepositModal}
          openConvertModal={this.openConvertModal}
          openSendModal={this.openSendModal}
          toggleZeroBalanceToken={this.toggleZeroBalanceToken}
          handleSearchInputChange={this.handleSearchInputChange}
          toggleAllowance={toggleAllowance}
          redirectToTradingPage={redirectToTradingPage}
        />
        <DepositModal
          isOpen={isDepositModalOpen}
          handleClose={this.closeDepositModal}
          token={selectedToken}
          tokenData={tokenData}
        />
        <TransferTokensModal
          isOpen={isSendModalOpen}
          handleClose={this.closeSendModal}
          token={selectedToken}
        />
        <ConvertTokensModal
          isOpen={isConvertModalOpen}
          handleClose={this.closeConvertModal}
          fromToken={convertModalFromToken}
          toToken={convertModalToToken}
        />
      </Wrapper>
    );
  }
}

export default DepositTable;

const Wrapper = styled.div`
  height: 100%;
`;
