'use strict'

import {UrlBuilder, Url} from './Url'

//export {Url, UrlBuilder}                        from 'Url'
//export {fromParamsToString, fromStringToParams} from 'utils'

const test = new UrlBuilder(new Url('http://something.com?query=querys&hash=hashs'))
console.log(test.removeQuery('hash'))

/*const url = new Url('http://something.com?query=querys&hash=hashs')

console.log(url.query)
console.log(url.query.hash = 'asd')*/
