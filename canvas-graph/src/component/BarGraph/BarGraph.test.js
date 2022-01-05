import React from 'react'
import { mount } from '@cypress/react'
import BarGraph from './BarGraph'
import Provider from '../Theme/Provider'

const data = [
    { sales: 14, month: 'Jan' },
    { sales: 18, month: 'Feb' },
    { sales: 16, month: 'Mar' },
    { sales: 9, month: 'Apr' },
    { sales: 12, month: 'May' },
    { sales: 13, month: 'Jun' },
]
const props = {
    data,
    yKey: 'sales',
    xKey: 'month',
    yUnit: 'M',
}

it('should render Bar graph', () => {
    mount(
        <Provider>
            <BarGraph {...props} />
        </Provider>
    )
})

it('should render light mode', () => {
    mount(
        <Provider mode="light">
            <BarGraph {...props} />
        </Provider>
    )
    cy.get('[data-testid="bar-wrapper"]').should(
        'have.css',
        'background-color',
        'rgb(253, 249, 243)'
    )
})

it('should render dark mode', () => {
    mount(
        <Provider mode="dark">
            <BarGraph {...props} />
        </Provider>
    )
    cy.get('[data-testid="bar-wrapper"]').should(
        'have.css',
        'background-color',
        'rgb(36, 36, 36)'
    )
})

it('should show correct sales figure', () => {
    mount(
        <Provider>
            <BarGraph {...props} />
        </Provider>
    )
    cy.get('[data-testid="bar-sales-figure"]').contains(
        data[data.length - 1].sales + props.yUnit
    )
})

it('should show correct delta figure', () => {
    mount(
        <Provider>
            <BarGraph {...props} />
        </Provider>
    )
    cy.get('[data-testid="bar-delta-figure"]').contains(
        data[data.length - 1].sales - data[data.length - 2].sales + props.yUnit
    )
})
