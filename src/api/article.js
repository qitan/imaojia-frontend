import request from '@/utils/request'

export function fetchArticleList (params) {
  return request({
    url: '/api/posts/',
    method: 'get',
    params: params.query
  })
}

export function fetchArticleLatest (params) {
  return request({
    url: '/api/posts/latest/',
    method: 'get'
  })
}

export function fetchArticleDetail (params) {
  return request({
    url: '/api/posts/' + params.id + '/',
    method: 'get'
  })
}

export function fetchCategoryList (params) {
  return request({
    url: '/api/category/',
    method: 'get'
  })
}

export function fetchCategoryArticle (params) {
  return request({
    url: '/api/posts/' + params.cate_url + '/category/',
    method: 'get',
    params: params.query
  })
}

export function fetchTag (params) {
  return request({
    url: '/api/tag/',
    method: 'get'
  })
}

export function fetchTagArticle (params) {
  return request({
    url: '/api/posts/' + params.name + '/tag/',
    method: 'get',
    params: params.query
  })
}

export function fetchArchive (params) {
  return request({
    url: '/api/posts/archive/',
    method: 'get'
  })
}

export function fetchArchiveArticle (params) {
  return request({
    url: '/api/posts/' + params.pub_time + '/archive/',
    method: 'get',
    params: params.query
  })
}

export function fetchSearchArticle (params) {
  return request({
    url: '/api/search/',
    method: 'get',
    params: params
  })
}

export function articleLike (params) {
  return request({
    url: '/api/posts/' + params.id + '/vote/',
    method: 'post'
  })
}
