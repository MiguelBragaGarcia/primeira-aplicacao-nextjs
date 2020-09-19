import React, { useState } from  "react";
import {NextPage} from 'next'
import styled from "styled-components";

import api from "../services/api";



interface GameInfo {
    match_id:number;
    average_mmr: number;
    spectators: number;
}


const Games:NextPage = ({games}) => {
    const Container = styled.div `
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    
    > h1 {
            width: 90%;
            color: #292933;
    }
    `;


    const GamesContainer = styled.div `
        box-sizing: border-box;
        width: 90vw;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-row-gap: 30px;


        justify-items: center;
        align-items: center;
        margin: 0 auto;
        padding: 10px  20px;
    `
    const GameInfo = styled.div `
        border-radius: 15px;
        box-sizing:border-box;
        width: 300px;
        height: 160px;
        background: #3e4db0;
        padding: 10px;
        transition:transform 0.2s linear;

        color: #fff;

        &:hover {
            transform: translateY(-10px)
        }
    `


    return (
        <Container>

            <h1>Partidas ao vivo no Dota 2</h1>
            <GamesContainer>

            {games?.map(game => (
             <GameInfo key={game.match_id} >

                <h1>ID {game.match_id}</h1>
                <p>MMR médio {game.average_mmr}</p>
                <p>Espectadores {game.spectators}</p>

            </GameInfo>

            ))}

            </GamesContainer>
         
        </Container>
    )
}

Games.getInitialProps = async () => {
        const response = await api.get<GameInfo[]>("live" )
        return {games:response.data}

}

export default Games;