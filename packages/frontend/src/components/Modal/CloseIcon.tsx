import styled from 'styled-components'

const SvgContainer = styled.div<{
  color: string
  height?: number
  width?: number
}>`
  height: auto;
  width: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.color ? `${props.color}` : 'currentColor')};

  svg {
    fill: ${(props) => (props.color ? `${props.color}` : 'currentColor')};
    height: ${(props) => (props.height ? `${props.height}px` : '100%')};
    width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  }
`
interface IconProps {
  color?: string
  size?: number
  style?: React.CSSProperties
  children?: React.SVGProps<SVGSVGElement>
  stroke?: string
}

export function CloseIcon(props: IconProps) {
  const { color = 'currentColor', size = 14, style = {}, stroke = '' } = props

  return (
    <SvgContainer width={size} height={size} color={color} style={{ ...style, color, stroke }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7803 1.28033C16.0732 0.987437 16.0732 0.512563 15.7803 0.21967C15.4874 -0.0732233 15.0126 -0.0732233 14.7197 0.21967L8 6.93934L1.28033 0.21967C0.987438 -0.0732233 0.512564 -0.0732233 0.219671 0.21967C-0.0732226 0.512563 -0.0732226 0.987437 0.219671 1.28033L6.93934 8L0.21967 14.7197C-0.0732231 15.0126 -0.0732234 15.4874 0.21967 15.7803C0.512563 16.0732 0.987437 16.0732 1.28033 15.7803L8 9.06066L14.7197 15.7803C15.0126 16.0732 15.4874 16.0732 15.7803 15.7803C16.0732 15.4874 16.0732 15.0126 15.7803 14.7197L9.06066 8L15.7803 1.28033Z" />
      </svg>
    </SvgContainer>
  )
}
