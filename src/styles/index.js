import styled from 'styled-components';

export const Title = styled.span`
  font-family: leChant , sans-serif;
  font-size: ${(props) => props.fontSize};
  color: var(--base-color);
`;

export const Subtitle = styled.span`
  font-family: bebas , sans-serif;
  font-size: ${(props) => props.fontSize};
`;

export const Paragraph = styled.p`
  padding: 15px;
`;

export const FixElementFixed = styled.div`
  margin-top: 90px;
`;
