import React from "react"

export default function Tabs({buttons, buttonsContainer,children}){
    const ButtonsContainer =  buttonsContainer;
    return(
        <>
            <ButtonsContainer>
                {buttons}
            </ButtonsContainer>
            {children}
        </>
    )
}