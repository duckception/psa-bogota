import * as RadixModal from '@radix-ui/react-dialog'
import React, { FunctionComponent, ReactNode, useEffect, useCallback, useRef } from 'react'

import arrowLeft from '../../images/arrowLeft.svg'

import {
  Backdrop,
  CloseButton,
  Content,
  Header,
  HeaderText,
  StyledModal,
  Wrapper,
  BackButton,
  BackButtonWrapper,
} from './styles'
import {CloseIcon} from "./CloseIcon";

interface ModalProps {
  isShown: boolean | undefined
  onRequestClose: () => void
  children: ReactNode
  header?: ReactNode
  customStyles?: {
    backdrop?: React.CSSProperties
    modal?: React.CSSProperties
    header?: React.CSSProperties
    content?: React.CSSProperties
  }
  handleBackClick?: () => void
}

export const Modal: FunctionComponent<ModalProps> = ({
                                                       isShown,
                                                       onRequestClose,
                                                       children,
                                                       header,
                                                       customStyles,
                                                       handleBackClick,
                                                     }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    const focusedElementBeforeModal = document.activeElement
    if (closeButtonRef.current) closeButtonRef.current.focus()
    return () => (focusedElementBeforeModal as HTMLElement).focus()
  }, [isShown])

  const closeModal = useCallback(() => isShown && onRequestClose(), [isShown, onRequestClose])

  const modalRef = useRef<HTMLDivElement | null>(null)
  const handleFocusTrap = useCallback(
    (event: KeyboardEvent) => {
      if (isShown && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        const focusedElement = document.activeElement

        if (event.shiftKey && focusedElement === firstElement) {
          ;(lastElement as HTMLElement).focus()
          event.preventDefault()
        }
        if (!event.shiftKey && focusedElement === lastElement) {
          ;(firstElement as HTMLElement).focus()
          event.preventDefault()
        }
      }
    },
    [isShown, modalRef]
  )

  useEffect(() => {
    const keyListenersMap = new Map([
      ['Escape', closeModal],
      ['Tab', handleFocusTrap],
    ])

    const keyListener = (event: KeyboardEvent) => {
      const listener = keyListenersMap.get(event.key)
      return listener && listener(event)
    }

    document.addEventListener('keydown', keyListener)

    return () => document.removeEventListener('keydown', keyListener)
  }, [closeModal, handleFocusTrap, isShown])

  if (!isShown) return null

  const mainModal = document.getElementById('main-modal')
  const mainModalPresent = !!mainModal

  return (
    <RadixModal.Root open={isShown}>
      <RadixModal.Portal container={mainModalPresent ? mainModal : document.body}>
        <Backdrop style={customStyles?.backdrop} onClick={closeModal} isStacked={mainModalPresent} />
        <RadixModal.Content>
          <Wrapper ref={modalRef}>
            <StyledModal style={customStyles?.modal}>
              <Header style={customStyles?.header}>
                {handleBackClick ? (
                  <BackButtonWrapper>
                    <BackButton onClick={handleBackClick}>
                      <img src={arrowLeft} />
                    </BackButton>
                    <HeaderText>{header}</HeaderText>
                  </BackButtonWrapper>
                ) : (
                  <HeaderText>{header}</HeaderText>
                )}

                <CloseButton onClick={closeModal} ref={closeButtonRef}>
                  <CloseIcon size={16} />
                </CloseButton>
              </Header>

              <Content style={customStyles?.content}>{children}</Content>
            </StyledModal>
          </Wrapper>
        </RadixModal.Content>
      </RadixModal.Portal>
    </RadixModal.Root>
  )
}
