/*
 * @Author: Terryzh
 * @Date: 2019-08-19 17:45:11
 * @LastEditors: Terryzh
 * @LastEditTime: 2019-08-19 17:49:42
 * @Description: add request
 */
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import fetch from 'unfetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
// 组件中使用 this.$apollo 调用 apollo
Vue.use(VueApollo)

const debug = process.env.NODE_ENV !== 'production'

let loading = 0

function newApolloClient(arg) {
  return new ApolloClient({
    link: new HttpLink({ uri: `http://47.106.13.221:89/api/${arg}/graphql`, fetch: fetch }),
    cache: new InMemoryCache(),
    connectToDevTools: debug
  })
}
const defaultClient = newApolloClient(`auth`)
const mall = newApolloClient(`menu`)

// Create the apolloProvider
export const apolloProvider = new VueApollo({
  clients: {
    mall,
  },
  defaultClient
})
