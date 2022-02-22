const K = 1000
const M = 1000000
const B = 1000000000

export const humanize = (value) => {
    const sign = value > 0 ? '' : '-'
    const abs = Math.abs(value)

    switch (true) {
        case abs > B:
            return sign + (abs / B).toFixed(1) + 'B'
        case abs > M:
            return sign + (abs / M).toFixed(1) + 'M'
        case abs > K:
            return sign + (abs / K).toFixed(1) + 'K'
        default:
            return sign + abs.toFixed(1)
    }
}

const norm = (val, min, max) => {
    return (val - min) / (max - min)
}

const lerp = (norm, min, max) => {
    return (max - min) * norm + min
}

// mapping val of range minA-maxA to range minB-maxB
export const map = (val, minA, maxA, minB, maxB) => {
    const n = norm(val, minA, maxA)
    const l = lerp(n, minB, maxB)
    return l
}
