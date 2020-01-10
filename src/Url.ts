import {fromParamsToString, fromStringToParams, isRelative, object} from './utils'

type QueryHash = {
    [key: string]: string
}

export class Url {

    readonly query: QueryHash = {}
    readonly hash: QueryHash  = {}
    private readonly url: URL

    constructor(url = window.location.href) {

        if (isRelative(url)) {
            url = window.location.origin + url
        }

        this.url = new URL(url)

        if (this.url.href.includes('?')) {
            this.query = fromStringToParams(this.url.search)
        }

        if (this.url.href.includes('#')) {
            this.hash = fromStringToParams(this.url.hash)
        }
    }

    get search(): string {
        return this.url.search
    }

    includes(pathname: string) {
        return new RegExp(`${pathname}([?\/#]|$)`).test(this.pathname)
    }

    get hashString(): string {

        if (object.isEmpty(this.hash)) return ''

        return '#' + fromParamsToString(this.hash)
    }

    get hostname(): string {
        return this.url.hostname
    }

    get origin(): string {
        return this.url.origin
    }

    get pathname(): string {
        return this.url.pathname
    }

    get queryString(): string {

        if (object.isEmpty(this.query)) return ''

        return '?' + fromParamsToString(this.query)
    }

    toString() {
        return this.origin + this.pathname + this.queryString + this.hashString
    }

}

export class UrlBuilder {

    private url: Url
    private origin: string
    private pathname: string

    constructor(url: Url) {
        this.url      = url
        this.pathname = this.url.pathname
        this.origin   = this.url.origin
    }

    setOrigin(origin: string): this {
        this.origin = origin
        return this
    }

    removeOrigin(): this {
        this.origin = ''
        return this
    }

    setPathname(pathname: string): this {
        this.pathname = pathname
        return this
    }

    removePathname(pathname: string): this {
        this.pathname = this.pathname.replace(pathname, '')
        return this
    }

    addPathnameFromStart(pathname: string): this {
        this.pathname = pathname + this.pathname
        return this
    }

    addQuery(name: string, value: string): this {

        this.url.query[name] = value

        return this
    }

    addHash(name: string, value: string): this {

        this.url.hash[name] = value

        return this
    }

    removeQuery(name: string): this {
        delete this.url.query[name]
        return this
    }

    removeQueryAll(): this {

        const query = this.url.query

        for (let queryName in query) {

            if (query.hasOwnProperty(queryName)) {
                delete query[queryName]
            }
        }
        return this
    }

    removeHash(name: string): this {
        delete this.url.hash[name]
        return this
    }

    removeHashAll(): this {

        const hash = this.url.hash

        for (let queryName in hash) {

            if (hash.hasOwnProperty(queryName)) {
                delete hash[queryName]
            }
        }
        return this
    }

    build() {
        return new Url(this.getOrigin() + this.getPathname() + this.getQuery() + this.getHash())
    }

    private getQuery(): string {
        return this.url.queryString
    }

    private getHash(): string {
        return this.url.hashString
    }

    private getOrigin(): string {
        return this.origin
    }

    private getPathname(): string {
        return this.pathname
    }
}
