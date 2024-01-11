import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

const Home = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const userName = user ? user.name : 'Invitado';
  const carteleraRef = useRef(null);

  useEffect(() => {
    const fetchMoviesInCartelera = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=cceab111&s=avengers`);
        const data = await response.json();

        if (data.Search) {
          const moviesWithDetails = await Promise.all(
            data.Search.map(async (movie) => {
              const details = await fetchMovieDetails(movie.imdbID);
              return {
                imdbID: movie.imdbID,
                title: movie.Title,
                details: details,
              };
            })
          );

          setMovies(moviesWithDetails);
        }
      } catch (error) {
        console.error('Error fetching movies in cartelera:', error);
      }
    };

    const fetchMovieDetails = async (imdbID) => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=cceab111&i=${imdbID}&plot=full`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    };

    fetchMoviesInCartelera();
  }, []);

  const handleCarteleraClick = () => {
    if (carteleraRef.current) {
      window.scrollTo({
        top: carteleraRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <header className="menu-overlay">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="logo-container">
              <img className="logo" src={`http://img.omdbapi.com/?apikey=cceab111&`} alt="Logo" />
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav">
                <div className="nav-item nav-link" onClick={handleCarteleraClick}>
                  Cartelera
                </div>
                <div className="nav-item nav-link">Lista de Reservas</div>
              </div>
            </div>
            <div className="user-info">
              Usuario: {userName}
            </div>
          </div>
        </nav>
      </header>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Carousel className="movie-carousel">
              {movies.map((movie) => (
                <Carousel.Item key={movie.imdbID}>
                  <img
                    className="d-block w-100"
                    src={movie.details.Poster}
                    alt={movie.title}
                  />
                  <Carousel.Caption>
                    <h3>{movie.title}</h3>
                    <p>{movie.details.Plot}</p>
                    <p>Género: {movie.details.Genre}</p>
                    <p>Duración: {movie.details.Runtime}</p>
                    <p>Formato: {movie.details.Type}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
      <div ref={carteleraRef} className="cartelera-container">
        <h2 className="cartelera-title">Cartelera</h2>
        <div className="cartelera-cards">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.details.Poster} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.details.Plot}</p>
                <p>Género: {movie.details.Genre}</p>
                <p>Duración: {movie.details.Runtime}</p>
                <p>Formato: {movie.details.Type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;/* Home.css */



