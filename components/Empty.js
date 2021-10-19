import React from "react";
import styled from "styled-components";

export default function Empty() {
    return (
        <ComponentContainer>
            <EmptyImage source={require("../assets/images/1234.png")} />
            <EmptyText>Add Task</EmptyText>
        </ComponentContainer>
    );
}

const ComponentContainer = styled.View`
    align-items: center;
    justify-content: center;
    height: 405px;
`;

const EmptyImage = styled.Image`
    width: 405px;
    height: 300px;
    margin-top: 60px;
 
`;

const EmptyText = styled.Text`
    color: white;
    font-family: Poppins-Bold;
    margin-top: 10px;
    font-size: 30px;
`;