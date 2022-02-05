import { Component } from 'react';
import Faker from 'faker';
import { Card } from './Card.js';
import update from 'immutability-helper';
const style = {
    width: 400,
};
function buildCardData() {
    const cardsById = {};
    const cardsByIndex = [];
    for (let i = 0; i < 1000; i += 1) {
        const card = { id: i, text: Faker.name.findName() };
        cardsById[card.id] = card;
        cardsByIndex[i] = card;
    }
    return {
        cardsById,
        cardsByIndex,
    };
}
export class Container extends Component {
    pendingUpdateFn;
    requestedFrame;
    constructor(props) {
        super(props);
        this.state = buildCardData();
    }
    componentWillUnmount() {
        if (this.requestedFrame !== undefined) {
            cancelAnimationFrame(this.requestedFrame);
        }
    }
    render() {
        const { cardsByIndex } = this.state;
        return (<>
				<div style={style}>
					{cardsByIndex.map((card) => (<Card key={card.id} id={card.id} text={card.text} moveCard={this.moveCard}/>))}
				</div>
			</>);
    }
    scheduleUpdate(updateFn) {
        this.pendingUpdateFn = updateFn;
        if (!this.requestedFrame) {
            this.requestedFrame = requestAnimationFrame(this.drawFrame);
        }
    }
    drawFrame = () => {
        const nextState = update(this.state, this.pendingUpdateFn);
        this.setState(nextState);
        this.pendingUpdateFn = undefined;
        this.requestedFrame = undefined;
    };
    moveCard = (id, afterId) => {
        const { cardsById, cardsByIndex } = this.state;
        const card = cardsById[id];
        const afterCard = cardsById[afterId];
        const cardIndex = cardsByIndex.indexOf(card);
        const afterIndex = cardsByIndex.indexOf(afterCard);
        this.scheduleUpdate({
            cardsByIndex: {
                $splice: [
                    [cardIndex, 1],
                    [afterIndex, 0, card],
                ],
            },
        });
    };
}
