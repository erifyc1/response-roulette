
![RR logo](https://i.imgur.com/IYwx3bN.png)

Evan Coats, Vijay Shah, Jacob Stolker
## Inspiration

Taking inspiration from Kahoot, Jackbox, and Cards Against Humanity, Response Roulette is a simple online humor-focused social game using the Solana blockchain.

## What it does

Users can access our game though a computer or mobile device and login using a Solana wallet chromium extension or app. While the first 10 players are joining, players enter a waiting room. Once all players have joined, the game starts. One at a time, a prompt is shown with a funny or thought-provoking question. Then, one random user and two random prompts are shown (one of which was the user's response) and players wager Solana on which response the chosen user typed. Players are rewarded for choosing correctly.


## How we built it


### Architecture overview
Response Roulette Components
1. `Smart Contract`: responsible for storing state and executing game logic. Written in Rust.
2. `Web Client`: responsible for displaying game information to the end user. Written in TypeScript (with React).


## Challenges we ran into

As this was our team's first experience developing on Solana, we encountered a bunch of problems that we had to overcome. Initially, we had trouble setting up all the necessary dependencies, wallet addresses, and configuration settings. Additionally, we struggled to implement new types of transactions, as we ran into multiple errors that were difficult to debug. Finally, we had trouble figuring out how to send and receive private information on the blockchain.

## Accomplishments that we're proud of

* Ability to read & write to the blockchain!
* Getting a working voting system with near-realtime global syncing.
* Multi-lobby support for multiple simultaneous games
* Improving our skills in blockchain development

## What we learned

* We learned the processes required to deploy a custom contract on Solana and interact with it using a web app.
* We gained experience using new tools and frameworks together, such as Anchor.
* We experimented with using the Solana-Unity SDK. (Though we did not end up using it.)


## What's next?

* Variable bet amounts & multiple bet support
* Custom prompt sets
* Other game modes (quiz/trivia format)
* Modularity, scalability

![website page](https://i.imgur.com/LCnBe93.png)
![2](https://i.imgur.com/gSL1EUz.png)
