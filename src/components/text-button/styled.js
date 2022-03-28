import styled from 'styled-components/native';

export const StyledText = styled.Text`
   color: ${props => props.color};
   font-size: ${props => props.size}px;
   font-weight: ${props => props.weight};
   textDecorationLine: ${props => props.underline};
   text-align: ${props => props.textAlign};
   font-family: ${props => props.heading };

`;

export const StyledTextButton = styled.View`
flex-direction: row; 
 align-items: center; 
padding-top: 5px
`;