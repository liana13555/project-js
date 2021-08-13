const KEY_USER = '2fa9e4bbaa008ede70ee7a4ceca0d3a2';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=2fa9e4bbaa008ede70ee7a4ceca0d3a2&query=furious';
const BASE_URL = 'https://api.themoviedb.org/3/';





export default class QueryService {
    constructor() {
        this.time_window = 'day';
        this.media_type = '/all/';
        this.home = 'trending';
        // this.searchQuery = '';
        // this.page = 1;
        //  this.id = '';
    }
    
    // async fetchDate(page) {
    //     const url = `${BASE_URL}${this.home}${this.media_type}${this.time_window}?api_key=${KEY_USER}&page=${page}`;
    //     const response = await axios.get(url);
    //     return response.data;
    // };

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

     async fetchById(movie_id) {
    const url = `${BASE_URL}movie/${movie_id}?api_key=${KEY_USER}`;
     const response = await axios.get(url);
     return response.data;
    };
//  async fetchById(movie_id) {
//     const url = `${BASE_URL}movie/${movie_id}?api_key=${KEY_USER}`;
//      const response = await axios.get(url);
//        return this.fetchFilmGenre().then(genres => {
//                     return  [response].map(result => ({
//                         genres: this.filterGenres(genres, result),
//                     }));
//                 });
//     };

    async fetchSearch(query) {
        const url = `${BASE_URL}search/movie?api_key=${KEY_USER}&query=${query}`;
        const response = await axios.get(url);
        return response.data;
    }
    //Aleksandra: napisala kod nije dla paginacii tekus4ego poiska na stanicah
    async fetchSearchTest(page, query) {
        const url = `${BASE_URL}search/movie?api_key=${KEY_USER}&query=${query}&page=${page}`;
        const response = await axios.get(url);
        return response.data;
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
}

 


   
