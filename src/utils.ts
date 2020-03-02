export const object = {
    isEmpty(obj?: {}) {

        if (typeof obj === 'undefined' || !obj) return true

        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false
        }
        return true
    }
}

export const isRelative = (path: string) => {
    return !path.includes('http')
}

export const fromStringToParams = (stringParams: string): { [key: string]: string } => {

    const withoutQOrH = stringParams.substring(1)

    if (!withoutQOrH) return {}

    const params = {}
    const vars   = withoutQOrH.split('&')

    for (let i = 0; i < vars.length; i++) {
        let pair                            = vars[i].split('=')
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
    }

    return params
}

export const fromParamsToString = (paramsObject: { [key: string]: string }) => {

    if (object.isEmpty(paramsObject)) return ''

    const params = Object
        .keys(paramsObject)
        .map(name => {
            return `${name}=${encodeURIComponent(paramsObject[name])}`
        })

    return '?' + params.join('&')
}