import React from 'react'
import { mount, mountHook } from '@cypress/react'
import BarGraph from './BarGraph'
import Provider from '../Theme/Provider'
import useData from './useData'

const data = [
    { sales: 14, month: 'Jan' },
    { sales: 10, month: 'Feb' },
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
const dims = {
    padding: 40,
    canvasH: 500,
    canvasW: 500,
}

describe('functional tests suite', () => {
    it('should calculate correct values of min/max y', () => {
        mountHook(() => useData(data, props.xKey, props.yKey, dims)).then(
            (result) => {
                expect(result.current.minY).to.equal(0) // min value is zero irrespective of data min
                expect(result.current.maxY).to.equal(16)
            }
        )
    })

    it('should have the same data length', () => {
        mountHook(() => useData(data, props.xKey, props.yKey, dims)).then(
            (result) => {
                expect(result.current.graphData.length).to.equal(data.length)
            }
        )
    })

    it('should not have undefined and null values', () => {
        mountHook(() => useData(data, props.xKey, props.yKey, dims)).then(
            (result) => {
                result.current.graphData.forEach((dataSet) =>
                    expect(
                        Object.values(dataSet).filter(Boolean).length
                    ).to.equal(4)
                )
            }
        )
    })
    // TODO: figure a way to compare the actual output of graph data, from the hook
    // TODO: Add long string use case
    // TODO: all negative flows
    it('should return empty array for no data', () => {
        mountHook(() => useData()).then((result) => {
            expect(result.current.graphData.length).to.equal(0)
            expect(result.current.minY).to.equal(0)
            expect(result.current.maxY).to.equal(0)
        })
    })
})

describe('visual tests suite', () => {
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
        cy.wait(500)
        cy.percySnapshot()
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
        cy.wait(500)
        cy.percySnapshot()
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
            data[data.length - 1].sales -
                data[data.length - 2].sales +
                props.yUnit
        )
    })
})
