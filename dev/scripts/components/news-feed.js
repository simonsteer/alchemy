import React from 'react'
import { connect } from 'react-redux'

import { getNews } from '../actions/get-news'

@connect(
  (store => {
    return {
      news: store.news
    }
  })
)
export default class NewsFeed extends React.Component {

  componentDidMount() {
    this.props.dispatch(getNews('crypto'))
  }

  render() {
    return (
      <div className="news-feed">
        {this.props.news.list.map((article, i) => {
          return <div className="news-item" key={`${article.title}${i}`}>
            <h2 className="news-item__title">{article.title}</h2>
            <p className="news-item__source">{article.source.name}</p>
            <a href={article.url} target="_blank" className="news-item__link">read more &rarr;</a>
          </div>
        })}
      </div>
    )
  }
}




nums = [1,2,7,9]

function increase(arr) {
  let newNums = []
  let n = arr[arr.length - 1] + 1
  if (n > 9) {
    n = 0
  }
  newNums.unshift(n)
  for (let i = arr.length - 1; i > 0; i = i - 1) {
    if (arr[i] === 0) {
      n = arr[i - 1] + 1
      if (n > 9) n = 0
    } else {
      n = arr[i - 1]
    }
    newNums.unshift(n)
  }
  return newNums
}