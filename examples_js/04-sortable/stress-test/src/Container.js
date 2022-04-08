import Faker from 'faker'
import update from 'immutability-helper'
import { Component } from 'react'
import { Card } from './Card.js'
const style = {
  width: 400,
}
function buildCardData() {
  const cardsById = {}
  const cardsByIndex = []
  for (let i = 0; i < 1000; i += 1) {
    const card = { id: i, text: Faker.name.findName() }
    cardsById[card.id] = card
    cardsByIndex[i] = card
  }
  return {
    cardsById,
    cardsByIndex,
  }
}
export class Container extends Component {
  requestedFrame
  cardState = buildCardData()
  constructor(props) {
    super(props)
    this.state = STATE
  }
  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame)
    }
  }
  render() {
    const { cardsByIndex } = this.cardState
    return (
      <>
        <div style={style}>
          {cardsByIndex.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              moveCard={this.moveCard}
            />
          ))}
        </div>
      </>
    )
  }
  moveCard = (id, afterId) => {
    const { cardsById, cardsByIndex } = this.cardState
    const card = cardsById[id]
    const afterCard = cardsById[afterId]
    const cardIndex = cardsByIndex.indexOf(card)
    const afterIndex = cardsByIndex.indexOf(afterCard)
    this.cardState = update(this.cardState, {
      cardsByIndex: {
        $splice: [
          [cardIndex, 1],
          [afterIndex, 0, card],
        ],
      },
    })
    this.scheduleUpdate()
  }
  scheduleUpdate() {
    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame)
    }
  }
  drawFrame = () => {
    this.setState(STATE)
    this.requestedFrame = undefined
  }
}
const STATE = {}
