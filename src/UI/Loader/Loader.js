import React from 'react';
import styled from 'styled-components';

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default function Loader() {
    return (
        <LoaderContainer>
            <div className="loader" />
        </LoaderContainer>
    )
}