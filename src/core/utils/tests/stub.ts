export const movieMock = {
  id: "1",
  name: "The Great Escape",
  releasedYear: "1963",
  image: "/images/escape.jpg",
  genres: [
    { name: "Adventure", id: "6" },
    { name: "Drama", id: "7" },
  ],
  details: {
    rating: "8.2",
    duration: "2h 52m",
    description:
      "Allied prisoners of war plan for several hundred of their number to escape from a German camp during World War II.",
  },
};

export const movieListMock = [
    {
    id: '1',
    name: "The Great Escape",
    releasedYear: '1963',
    image: "/images/escape.jpg",
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
    image: "/images/lol.jpg",
    genres: [{name: 'Comedy', id: '3'}],
    details:   {
      rating: "6.8",
      duration: "1h 45m",
      description: "A light-hearted family comedy about a dad trying stand-up to reconnect with his kids."
    },
  },
]