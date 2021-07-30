import styled from 'styled-components'

export const Title = styled('span')({
    fontFamily: '"Roboto", sans-serif',
    fontWeight: (props) => props.theme.text.title.fontWeight,
    fontSize: (props) => props.theme.text.title.fontSize,
})

export const Body = styled('span')({
    fontFamily: '"Roboto", sans-serif',
    fontWeight: (props) => props.theme.text.body.fontWeight,
    fontSize: (props) => props.theme.text.body.fontSize,
})

export const Box = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
})
