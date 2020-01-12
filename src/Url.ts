import {fromParamsToString, fromStringToParams, isRelative} from './utils'

type QueryHash = {
    [key: string]: string
}

export class Url {

    readonly query: QueryHash = {}
    readonly hash: QueryHash = {}
    private readonly url: URL

    constructor(url = window.location.href) {

        if (isRelative(url)) {
            url = window.location.origin + url
        }

        this.url = new URL(url)

        if (this.url.href.includes('?')) {
            this.query = Object.freeze(fromStringToParams(this.url.search))
        }

        if (this.url.href.includes('#')) {
            this.hash = Object.freeze(fromStringToParams(this.url.hash))
        }
    }

    get search(): string {
        return this.url.search
    }

    includes(pathname: string) {
        return new RegExp(`${pathname}([?\/#]|$)`).test(this.pathname)
    }

    get hashString(): string {
        return fromParamsToString(this.hash)
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
        return fromParamsToString(this.query)
    }

    toString() {
        return this.origin + this.pathname + this.queryString + this.hashString
    }

}

export class UrlBuilder {

    private readonly query: {}
    private readonly hash: {}
    private origin: string
    private pathname: string

    constructor(url: Url) {
        this.query = {...url.query}
        this.hash = {...url.hash}
        this.pathname = url.pathname
        this.origin = url.origin
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

        this.query[name] = value

        return this
    }

    addHash(name: string, value: string): this {

        this.hash[name] = value

        return this
    }

    removeQuery(name: string): this {
        delete this.query[name]
        return this
    }

    removeQueryAll(): this {

        const query = this.query

        for (let queryName in query) {

            if (query.hasOwnProperty(queryName)) {
                delete query[queryName]
            }
        }
        return this
    }

    removeHash(name: string): this {
        delete this.hash[name]
        return this
    }

    removeHashAll(): this {

        const hash = this.hash

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
        return fromParamsToString(this.query)
    }

    private getHash(): string {
        return fromParamsToString(this.hash)
    }

    private getOrigin(): string {
        return this.origin
    }

    private getPathname(): string {
        return this.pathname
    }
}
