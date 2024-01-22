# Manager SelfBot MultiTokens
A simple selfbot manager written in typeScript 


**Features**

    Multiple Connectivity (Tokens): Connect multiple Discord selfbots.
    Easy configuration: customizable configurations for each user, with a json database.
    Easy modifications: easily editable template

**Prerequisites**

    Node.js
    npm (Node Package Manager) or yarn
    TypeScript

**Installation**

**Clone this repository**

    git clone https://github.com/4x0n4s/manager-selfbot-multitokens.git
**Install dependencies.**

    cd manager-selfbot-multitokens
    npm install
**Configure the settings.**

    export const token: string = 'Your bot token here', service: string = 'dvwp', prefix: string = '!', url: string = 'https://discord.gg/';
    export const ownersID: string[] = ['Owners'], guildID: string = 'guild id', afkID: string = 'Your afk channel id (voc)';
