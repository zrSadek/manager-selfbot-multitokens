# Manager SelfBot MultiTokens V0.2

# Other commands will be published in the coming days 

A simple selfbot manager written in typeScript 


## Features

    Multiple Connectivity (Tokens): Connect multiple Discord selfbots.
    Easy configuration: customizable configurations for each user, with a json database.
    Easily editable template..

## Prerequisites

    Node.js
    npm (Node Package Manager) or yarn
    TypeScript

## Installation

## Clone this repository

    git clone https://github.com/4x0n4s/manager-selfbot-multitokens.git
## Install dependencies.

    cd manager-selfbot-multitokens
    npm i -g ts-node typescript 
    npm i discord.js discord.js-selfbot-v13 fs colors @discordjs/voice 
## Start the project

     ts-node src/index
## Configure the settings.

    export const token: string = 'Your bot token here', service: string = 'dvwp', prefix: string = '!', url: string = 'https://discord.gg/';
    export const ownersID: string[] = ['Owners'], guildID: string = 'guild id', afkID: string = 'Your afk channel id (voc)';
