import images from "../../../assets";
import type { Genre, Movie } from "../interfaces/homepage.interfaces";

export const genreList: Genre[] = [
    {name: 'All', id: '1'}, 
    {name: 'Documentary', id: '2'},
    {name: 'Comedy', id: '3'},
    {name: 'Horror', id: '4'},
    {name: 'Crime', id: '5'}
]

export const movieData: Movie[] = [
  {
    id: '1',
    name: "The Great Escape",
    releasedYear: '1963',
    image: images.escape,
    genres: [{name: 'Adventure', id: '6'}, {name: 'Drama', id: '7'}],
    details:   {
      rating: "8.2",
      duration: "2h 52m",
      description: "Allied prisoners of war plan for several hundred of their number to escape from a German camp during World War II."
    },
  },
  {
    id: '2',
    name: "Laugh Out Loud",
    releasedYear: '2012',
    image: images.lol,
    genres: [{name: 'Comedy', id: '3'}],
    details:   {
      rating: "6.8",
      duration: "1h 45m",
      description: "A light-hearted family comedy about a dad trying stand-up to reconnect with his kids."
    },
  },
  {
    id: '3',
    name: "Edge of Tomorrow",
    releasedYear: '2014',
    image: images.edge,
    genres: [{name: 'Action', id: '8'}, {name: 'Sci-Fi', id: '9'}, {name: 'Thriller', id: '10'}],
    details:   {
      rating: "7.9",
      duration: "1h 53m",
      description: "A soldier caught in a time loop must relive the same day in a war against aliens, improving his skills with each loop."
    },
  },
    {
    id: '4',
    name: "Big Momma's House 2",
    releasedYear: '2006',
    image: images.big,
    genres: [{name: 'Comedy', id: '3'}],
    details:   {
      rating: "7.1",
      duration: "1h 40m",
      description: "A romantic comedy set in a late-night sketch show studio, where laughter sparks love."
    }
  },
];