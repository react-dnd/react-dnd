import * as React from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import ItemTypes from './ItemTypes';
import update from 'immutability-helper';
const style = {
    width: 400,
};
const cardTarget = {
    drop() {
        //
    },
};
class Container extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [
                {
                    id: 1,
                    text: 'Write a cool JS library',
                },
                {
                    id: 2,
                    text: 'Make it generic enough',
                },
                {
                    id: 3,
                    text: 'Write README',
                },
                {
                    id: 4,
                    text: 'Create some examples',
                },
                {
                    id: 5,
                    text: 'Spam in Twitter and IRC to promote it',
                },
                {
                    id: 6,
                    text: '???',
                },
                {
                    id: 7,
                    text: 'PROFIT',
                },
            ],
        };
        this.moveCard = (id, atIndex) => {
            const { card, index } = this.findCard(id);
            this.setState(update(this.state, {
                cards: {
                    $splice: [[index, 1], [atIndex, 0, card]],
                },
            }));
        };
        this.findCard = (id) => {
            const { cards } = this.state;
            const card = cards.filter(c => `${c.id}` === id)[0];
            return {
                card,
                index: cards.indexOf(card),
            };
        };
    }
    render() {
        const { connectDropTarget } = this.props;
        const { cards } = this.state;
        return connectDropTarget(<div style={style}>
				{cards.map(card => (<Card key={card.id} id={`${card.id}`} text={card.text} moveCard={this.moveCard} findCard={this.findCard}/>))}
			</div>);
    }
}
export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(Container);
