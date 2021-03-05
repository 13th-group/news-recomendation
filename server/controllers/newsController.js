const axios = require("axios").default;

class Controller {
  static findAll(req, res, next) {
    let queryData = req.query.q;
    if (queryData) {
      axios
        .get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${queryData}&api-key=${process.env.NYT_API_KEY}`
        )
        .then((response) => {
          let findNyTimes = response.data.response.docs.map((el) => {
            const tempArr = el.web_url.split("/");
            const titleTemp = tempArr[tempArr.length - 1];
            const title = titleTemp.split(".")[0];
            const clearTitle = title.split("-").join(" ");

            const pubDate = new Date(el.pub_date);
            const month = pubDate.getMonth() + 1;
            const date = pubDate.getDate();
            const fullDate = `${pubDate.getFullYear()}-${
              month <= 9 ? "0" + month : month
            }-${date <= 9 ? "0" + date : date}`;
            return {
              web_url: el.web_url,
              image_url: `https://static01.nyt.com/${el.multimedia[0].url}`,
              title: clearTitle,
              date: fullDate,
            };
          });
          res.status(200).json({ news: findNyTimes });
        })
        .catch((err) => {
          next({
            code: 401,
            message: "Request Data Failed",
          });
        });
    } else {
      let nyTimes;
      let guardians;
      let news;
      axios
        .get(
          `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${process.env.NYT_API_KEY}`
        )
        .then((response) => {
          // handle success
          nyTimes = response.data.results.map((el) => {
            if (el.media.length === 0) {
              return {
                web_url: el.url,
                image_url: "",
                title: el.title,
                date: el.published_date,
              };
            } else {
              return {
                web_url: el.url,
                image_url: el.media[0]["media-metadata"][0].url,
                title: el.title,
                date: el.published_date,
              };
            }
          });
          return axios.get(
            `https://api.currentsapi.services/v1/latest-news?&language=en&apiKey=${process.env.CURRENTS_API_KEY}`
          );
        })
        .then((response) => {
          guardians = response.data.news.map((el) => {
            return {
              web_url: el.url,
              image_url: el.image,
              title: el.title,
              date: el.published,
            };
          });
          return axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
          );
        })
        .then((response) => {
          news = response.data.articles.map((el) => {
            return {
              web_url: el.url,
              image_url: el.urlToImage,
              title: el.title,
              date: el.publishedAt,
            };
          });

          const arrNews = [...nyTimes, ...guardians, ...news];
          res.status(200).json({ news: arrNews });
        })
        .catch((err) => {
          next({
            data: err,
          });
        });
    }
  }
}

module.exports = Controller;
