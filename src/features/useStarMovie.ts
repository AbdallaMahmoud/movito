export default function (root: any) {
  const starMovie = (params: any) => {
    root.$store.dispatch('starMovie', params);
  };

  const star = (movie: any) => {
    starMovie({
      movie,
      star: !!movie.starred,
    });
  };

  return {
    starMovie,
    star,
  };
}
