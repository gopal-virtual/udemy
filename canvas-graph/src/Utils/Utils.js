export const lerp = (norm, min, max) => {
    return (max - min) * norm + min
}

export const norm = (val, min, max) => {
    return (val - min) / (max - min)
}

export const map = (val, minA, maxA, minB, maxB, round = true) => {
    const n = norm(val, minA, maxA)
    const l = lerp(n, minB, maxB)
    return round ? Math.round(l) : l
}

const K = 1000
const M = 1000000
const B = 1000000000
export const humanize = (value) => {
    const sign = value > 0 ? '' : '-'
    const val = Math.abs(value)
    switch (true) {
        case val > B:
            return sign + (val / B).toFixed(1) + 'B'
        case val > M:
            return sign + (val / M).toFixed(1) + 'M'
        case val > K && val < M:
            return sign + (val / K).toFixed(1) + 'K'
        default:
            return sign + val.toFixed(1)
    }
}
