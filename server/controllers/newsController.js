const { User } = require("../models");
const axios = require('axios').default;

class Controller {
  static findAll(req, res, next) {
    let queryData = req.query.q
    if(queryData){
      axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ queryData +'&api-key=GEaQqj1bljwhAbSrrCBWzaM25pUFdkIy')
        .then((response)=>{ 
          console.log(response.data.response.docs)
          let findNyTimes = response.data.response.docs.map(el=>{
            return {
              web_url: el.web_url,
              image_url: el.multimedia[0].url,
              title: el.abstract,
              date: el.pub_date
            }
          })
          res.status(200).json(findNyTimes)
        })
        .catch((err)=>{
          next(err)
        })
    }else{
      let nyTimes
      let guardians
      let news
      axios.get('https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=GEaQqj1bljwhAbSrrCBWzaM25pUFdkIy ')
        .then((response) => {
          // handle success
          nyTimes = response.data.results.map(el=>{
            if(el.media.length === 0){
              return {
                web_url: el.url,
                image_url: "",
                title: el.title,
                date: el.published_date
              }
            }else {
              return {
                web_url: el.url,
                image_url: el.media[0]['media-metadata'][0].url,
                title: el.title,
                date: el.published_date
              }
            }          
          })
          return axios.get('https://api.currentsapi.services/v1/latest-news?&language=en&apiKey=vp47S4EQZGk7M7X-5ohHdNFKBA8tKZzpzc2M05yA1d1t36ZL')
        })
        .then((response)=>{
          guardians = response.data.news.map(el=> {
              return {
              web_url: el.url,
              image_url: el.image,
              title: el.title,
              date: el.published}
          })
          return axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=27634ce3d5884b9bb2d45db983c54b7a ')
        })
        .then((response)=>{
          news = response.data.articles.map(el=>{
            return {
              web_url: el.url,
              image_url: el.urlToImage,
              title: el.title,
              date: el.publishedAt}
          })
          res.status(200).json({nyTimes, guardians, news})
        })
        .catch((error) => {
          // handle error
          next(error)
        })
      }
    }    
}

module.exports = Controller;
