const axios = require("axios").default;

class Controller {
  static findAll(req, res, next) {
    let queryData = req.query.q;
    if (queryData) {
      axios
        .get(
          "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
            queryData +
            "&api-key=GEaQqj1bljwhAbSrrCBWzaM25pUFdkIy"
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
          // res.status(200).json(response.data.response.docs);
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
          "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=GEaQqj1bljwhAbSrrCBWzaM25pUFdkIy "
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
            "https://api.currentsapi.services/v1/latest-news?&language=en&apiKey=vp47S4EQZGk7M7X-5ohHdNFKBA8tKZzpzc2M05yA1d1t36ZL"
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
            "https://newsapi.org/v2/top-headlines?country=us&apiKey=27634ce3d5884b9bb2d45db983c54b7a "
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
          // arrNews.sort(() => {
          //   return 0.5 - Math.Random();
          // });
          // console.log(arrNews);
          res.status(200).json({ news: arrNews });
        })
        .catch((err) => {
          // handle error
          next({
            data: err,
            // code: 401,
            // message: "Request Data Failed",
          });
        });
    }
  }
}

module.exports = Controller;
