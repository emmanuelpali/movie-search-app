import React, {useState } from 'react';
import { StyledGridInfo } from './styles/StyledGrid';
import { Link } from 'react-router-dom';
import {
        IMAGE_BASE_URL, POSTER_SIZE, POPULAR_BASE_URL, SEARCH_BASE_URL
        } from '../config';
import Grid from './Grid';
import PageOptions from './PageOptions';
import MovieThumdnail from './MovieThumbnail';
import SearchBar from './SearchBar';
import Header from './Header';
import Spinner from './Spinner';
import { useHomeFetch } from './hooks/useHomeFetch';
import { Footer } from './Footer';

import NoImage from './images/no_image.jpg';

const Home = () => {

    const [{state: {movies},
            loading,
            
            },
             fetchmovies] = useHomeFetch();
        
    const [searchItem, setSearchItem] = useState(' ');

    const searchMovies = search => {

        const endpoint = search ? `${SEARCH_BASE_URL}${search}` : `${POPULAR_BASE_URL}`; 

        setSearchItem(search);
        fetchmovies(endpoint);

    }


    return (
        <>
            <Header />
            <SearchBar callback={searchMovies}/>
            <PageOptions />
            <Grid header={searchItem ? 'Search Result' : 'Popular Movies'} > 
                {
                    movies.slice(0, 12).map(movie => ( 
                        <div className="movie-display-grid" key={movie.id}>
                            {console.log(movie)}
                            <MovieThumdnail
                                clickable
                                image= {movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                        : NoImage}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                title={movie.title} />
        
                            <StyledGridInfo>
                                <Link to={`/${movie.id}`}>
                                    <h4>Movie Rating <div className="score">{movie.vote_average}</div></h4>
                                    <h4>PLOT</h4>
                                    <p>{movie.overview.slice(0, 50)+',,,Read more'}</p>
                                    <p>{movie.release_date}</p>
                                </Link>
                            </StyledGridInfo>
                        </div>
                    ))
                }
            </Grid>
            {loading && <Spinner />}
            <Footer />
        </>
    
    );
}
 

export default Home;