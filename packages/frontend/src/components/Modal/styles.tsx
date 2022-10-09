import styled, { css } from 'styled-components'

import { getHexOpacity } from '../../utils/getHexOpacity'
import colors from "../../styles/colors";

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  width: inherit;
  min-width: 375px;

  @media screen and (max-width: ${(props) => colors.breakpoints.sm}) {
    max-width: 375px;
    width: 95%;
    min-width: 0;
  }
`
export const Backdrop = styled.div<{ isStacked?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme, isStacked }) => (isStacked ? getHexOpacity(theme.colors.BigStone, 0.6) : '#141625')};
  opacity: 0.9;
  z-index: 40;
`
export const StyledModal = styled.div`
  background: white;
  border-radius: 4px;
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 10px 12px 24px;
  border-bottom: solid #e7eaf3 1px;

  @media screen and (max-width: ${(props) => colors.breakpoints.xs}) {
    padding: 19px 10px 18px 18px;
  }
`
export const HeaderText = styled.div`
  align-self: center;
  color: #141625;
  max-width: 18rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 3px;
  background: none;
  align-self: center;
  :active {
    outline: none;
    border: none;
  }
  :focus {
    border: solid 2px ${(props) => colors.colors.brandLight};
    outline: none;
  }
`
export const Content = styled.div`
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80vh;

  @media screen and (max-width: ${(props) => colors.breakpoints.xs}) {
    padding: 18px 14px;
  }
`
export const GiftIconDiv = styled.div`
  width: 230px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -70px;
`
export const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  margin: 0px 0px 0px -3px;
`
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0px;
  margin: 0px 8px 0px 0px;
  border: none;
  border-radius: 3px;
  outline: none;
  background: transparent;
  :focus {
    border: solid 2px ${(props) => colors.colors.brandLight};
    outline: none;
  }
`
