const axios = require('axios').default;
const KEY_USER = '2fa9e4bbaa008ede70ee7a4ceca0d3a2';
const BASE_URL = 'https://api.themoviedb.org/3/';
export default class QueryService {
    constructor() {
        this.time_window = 'day';
        this.media_type = '/all/';
        this.home = 'trending';
        this.searchQuery = '';
        // this.page = 1;
        //  this.id = '';
    }

     async fetchDate(page) {
        const url = `${BASE_URL}${this.home}${this.media_type}${this.time_window}?api_key=${KEY_USER}&page=${page}`;
        const response = await axios.get(url);
        return this.fetchFilmGenre().then(genres => {
                    return  response.data.results.map(result => ({
                        ...result,
                        total_pages: response.data.total_pages,
                        release_date: result.release_date
                            ? result.release_date.slice(0, 4)
                            : result.release_date,
                        genres: this.filterGenres(genres, result),
                    }));
                });
    };
    
    async fetchById(movieID) {
        const url = `${BASE_URL}/movie/${movieID}/videos?api_key=${KEY_USER}`;
        const response = await axios.get(url);
        return response.data;      
    }

    async fetchByIdModal(movie_id) {
        const url = `${BASE_URL}movie/${movie_id}?api_key=${KEY_USER}`;
        const response = await axios.get(url);       
        const responseObj = response.data;
        const genres = response.data.genres;
        return {
            ...responseObj,
            release_date: response.data.release_date
                            ? response.data.release_date.slice(0, 4)
                            : response.data.release_date,
            genres: this.filterGenresModal(genres),
            popularity: response.data.popularity.toFixed(1),
        };
    }
    async fetchSearch(page) {
        const url = `${BASE_URL}search/movie?api_key=${KEY_USER}&query=${this.searchQuery}&page=${page}`;
        const response = await axios.get(url);
         return this.fetchFilmGenre().then(genres => {
                    return  response.data.results.map(result => ({
                        ...result,
                        total_pages: response.data.total_pages,
                        release_date: result.release_date
                            ? result.release_date.slice(0, 4)
                            : result.release_date,
                        genres: this.filterGenres(genres, result),
                    }));
                });
    }
    //Aleksandra: napisala kod nije dla paginacii tekus4ego poiska na stanicah
     async fetchSearchTest(page, query) {
        const url = `${BASE_URL}search/movie?api_key=${KEY_USER}&query=${query}&page=${page}`;
        const response = await axios.get(url);
         return this.fetchFilmGenre().then(genres => {
                    return  response.data.results.map(result => ({
                        ...result,
                        total_pages: response.data.total_pages,
                        release_date: result.release_date
                            ? result.release_date.slice(0, 4)
                            : result.release_date,
                        genres: this.filterGenres(genres, result),
                    }));
                });
    }

    async fetchFilmGenre() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY_USER}&language=en-US`;
    const response = await axios.get(url);
    return response.data.genres;
  }
   

    filterGenres(genres, result) {
        let genreList = result.genre_ids
            .map(id => genres.filter(genre => genre.id === id).map(genre => genre.name))
            .flat();
        if (genreList.length === 0) {
            return (genreList = [`Unknown`]);
        }
        if (genreList.length === 1) {
            return (genreList = [`${genreList[0]}`]);
        }
        if (genreList.length === 2) {
            return (genreList = [`${genreList[0]}, ${genreList[1]}`]);
        } else if (genreList.length > 2) {
            return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
        }
    }

    
  filterGenresModal(genres) {
    let genreList = genres.map(genre => genre.name).flat();
    if (genreList.length === 0) {
      return (genreList = `Unknown`);
    }
    if (genreList.length === 1) {
      return (genreList = `${genreList[0]}`);
    }
    if (genreList.length === 2) {
      return (genreList = `${genreList[0]}, ${genreList[1]}`);
    } else if (genreList.length > 2) {
      return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
    }
     return genreList 
  }
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
     this.searchQuery = newQuery;
 }
}
