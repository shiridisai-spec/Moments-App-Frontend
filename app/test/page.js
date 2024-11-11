"use client";

const films = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genres: ["Sci-Fi", "Thriller"],
    rating: 8.8,
    cast: [
      { name: "Leonardo DiCaprio", role: "Cobb" },
      { name: "Joseph Gordon-Levitt", role: "Arthur" },
    ],
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    genres: ["Sci-Fi", "Drama"],
    rating: 8.6,
    cast: [
      { name: "Matthew McConaughey", role: "Cooper" },
      { name: "Anne Hathaway", role: "Brand" },
    ],
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne" },
      { name: "Heath Ledger", role: "Joker" },
    ],
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski",
    year: 1999,
    genres: ["Sci-Fi", "Action"],
    rating: 8.7,
    cast: [
      { name: "Keanu Reeves", role: "Neo" },
      { name: "Laurence Fishburne", role: "Morpheus" },
    ],
  },
];

const newFilms = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genres: ["Sci-Fi", "Thriller"],
    rating: 8.8,
    cast: [
      {
        name: "Leonardo DiCaprio",
        role: "Cobb",
        awards: [
          { awardName: "Oscar", year: 2011 },
          { awardName: "Golden Globe", year: 2011 },
        ],
      },
      {
        name: "Joseph Gordon-Levitt",
        role: "Arthur",
        awards: [],
      },
    ],
    production: {
      budget: 160000000,
      boxOffice: 829895144,
      studios: ["Warner Bros", "Legendary Pictures"],
    },
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    genres: ["Sci-Fi", "Drama"],
    rating: 8.6,
    cast: [
      {
        name: "Matthew McConaughey",
        role: "Cooper",
        awards: [{ awardName: "Oscar", year: 2015 }],
      },
      {
        name: "Anne Hathaway",
        role: "Brand",
        awards: [{ awardName: "BAFTA", year: 2015 }],
      },
    ],
    production: {
      budget: 165000000,
      boxOffice: 677471339,
      studios: ["Paramount Pictures", "Legendary Pictures"],
    },
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    cast: [
      {
        name: "Christian Bale",
        role: "Bruce Wayne",
        awards: [
          { awardName: "Oscar", year: 2009 },
          { awardName: "SAG", year: 2009 },
        ],
      },
      {
        name: "Heath Ledger",
        role: "Joker",
        awards: [{ awardName: "Oscar", year: 2009 }],
      },
    ],
    production: {
      budget: 185000000,
      boxOffice: 1004558444,
      studios: ["Warner Bros"],
    },
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski",
    year: 1999,
    genres: ["Sci-Fi", "Action"],
    rating: 8.7,
    cast: [
      {
        name: "Keanu Reeves",
        role: "Neo",
        awards: [],
      },
      {
        name: "Laurence Fishburne",
        role: "Morpheus",
        awards: [],
      },
    ],
    production: {
      budget: 63000000,
      boxOffice: 463517383,
      studios: ["Warner Bros", "Village Roadshow Pictures"],
    },
  },
];

// const Test = () => {
//   // Basic Array Methods
//   // Log each film’s title and rating.
//   films.forEach((film) => {
//     console.log(`Ttile: ${film.title}, Rating: ${film.rating}`);
//   });

//   // Log each actor’s name in every film’s cast array.
//   films.forEach((film) => {
//     film.cast.forEach((cast) => {
//       console.log(`Actor ${cast.name}`);
//     });
//   });

//   // Create an array of all film titles.
//   let allFilmTtiles = films.map((film) => film.title);
//   console.log("allFilmTtiles", allFilmTtiles);

//   // Create an array of objects with just the title and rating.
//   let titlesAndRatings = films.map((film) => ({
//     title: film.title,
//     rating: film.rating,
//   }));
//   console.log("titlesAndRatings", titlesAndRatings);

//   // Extract only the genres from each film into a new array of arrays.
//   let genres = films.map((film) => film.genres);
//   console.log("genres", genres);

//   // Find all films with a rating of 8.7 or higher.
//   let filmsWithRatings = films.filter((film) => film.rating >= 8.7);

//   // Get all films directed by “Christopher Nolan”.
//   let nolanFilms = films.filter(
//     (film) => film.director === "Christopher Nolan"
//   );

//   // Filter out films that have the genre “Action”.
//   let nonActionFilms = films.filter((film) => !film.genres.includes("Action"));

//   // Calculate the average rating of all films.
//   let avgRating = Math.round(
//     films.reduce((acc, film) => acc + film.rating, 0) / films.length
//   );
//   console.log("avgRating", avgRating);

//   // Create an object where keys are directors and values are arrays of films they directed.
//   let groupByDirectors = films.reduce((acc, film) => {
//     acc[film.director] = acc[film.director] || [];
//     acc[film.director].push(film);
//     return acc;
//   }, {});
//   console.log("groupByDirectors", groupByDirectors);

//   // Count how many times each genre appears across all films.
//   let genreCount = films.reduce((acc, film) => {
//     film.genres.forEach((genre) => {
//       acc[genre] = (acc[genre] || 0) + 1;
//     });
//     return acc;
//   }, {});
//   console.log("genreCount", genreCount);

//   // Find the first film that has “Sci-Fi” as a genre.
//   let sciFiGenre = films.find((film) => film.genres.includes("Sci-Fi"));

//   // Find the film that starred “Heath Ledger”.
//   let filmsWithJoker = films.find((film) =>
//     film.cast.some((name) => name.name.includes("Heath Ledger"))
//   );
//   console.log("filmsWithJoker", filmsWithJoker);

//   // Find the index of the first film directed by “Lana Wachowski”.
//   let lanaIndex = films.findIndex((film) =>
//     film.director.includes("Lana Wachowski")
//   );
//   console.log("lanaIndex", lanaIndex);

//   // Check if any film has a rating below 8.5.
//   let rating = films.some((film) => film.rating < 8.5);

//   // Check if any film has “Drama” as a genre.
//   let dramaGenre = films.some((film) => film.genres.includes("Drama"));

//   // Check if all films are rated above 8.
//   let allRatingAbove8 = films.every((film) => film.rating > 8);

//   // Verify if every film has “Sci-Fi” in its genres.
//   let sciFiGenres = films.every((film) => film.genres.includes("Sci-Fi"));
//   // Basic Array Methods ends

//   // Advanced Array Methods
//   // Get a single array of all genres, with duplicates.
//   let singleGenres = films.flatMap((film) => film.genres);

//   // Create an array of all actors’ names from all films.
//   let allActorNames = films.flatMap((film) =>
//     film.cast.map((film) => film.name)
//   );
//   console.log("allActorNames", allActorNames);

//   // Sort films by rating in descending order.
//   let ratingDesc = films.sort((a, b) => b.rating - a.rating);

//   // Sort films by title alphabetically.
//   let sortyTitle = films.sort((a, b) => a.title.localeCompare(b.title));
//   console.log("sortyTitle", sortyTitle);

//   // Sort actors within each film’s cast by name.
//   films.forEach((film) => {
//     film.cast.sort((a, b) => a.name.localeCompare(b.name));
//   });
//   console.log("films", films);

//   // Combine the cast lists of “Inception” and “Interstellar” into a single array.
//   let inception = films.find((film) => film.title.includes("Inception")).cast;
//   let interstellar = films.find((film) =>
//     film.title.includes("Interstellar")
//   ).cast;
//   let combinedLists = inception.concat(interstellar);
//   console.log("combinedLists", combinedLists);

//   // Merge two arrays of film titles.
//   const additionalFilms = [
//     { title: "The Social Network" },
//     { title: "Fight Club" },
//   ];
//   let filmTitles = films.map((film) => film.title);
//   let mergedFilmTitles = filmTitles.concat(
//     additionalFilms.map((film) => film.title)
//   );

//   // Check if a specific genre exists in the genres array of each film.
//   let genreExists = films.map((film) => film.genres.includes("Horror"));

//   // Verify if “Keanu Reeves” appears in any of the cast arrays.
//   let kReeves = films.some((film) =>
//     film.cast.some((cast) => cast.name.includes("Keanu Reeves"))
//   );

//   // Join all genres in each film into a single string (e.g., “Sci-Fi, Drama”).
//   let joinGenres = films.map((film) => film.genres).join(", ");

//   // Join all film titles with a comma.
//   let joinFilmTitles = films.map((film) => film.title).join(", ");
//   console.log("joinFilmTitles", joinFilmTitles);

//   // 3. Combined Array Method Scenarios
//   // Get the titles of all films with a rating above 8.7.
//   let allTitles = films
//     .filter((film) => film.rating > 8.7)
//     .map((film) => film.title);

//   // Get a list of unique genres from all films.
//   let uniqueGenres = [...new Set(films.flatMap((film) => film.genres))];
//   console.log("uniqueGenres", uniqueGenres);

//   // Calculate the total number of unique genres across all films.
//   let totalUniqueGenres = films
//     .flatMap((film) => film.genres)
//     .reduce((acc, genre) => {
//       acc.add(genre);
//       return acc;
//     }, new Set()).size;

//   // Group all film titles by their respective director names.
//   let groupFilmsByDirector = films.reduce((acc, film) => {
//     acc[film.director] = acc[film.director] || [];
//     acc[film.director].push(film.title);
//     return acc;
//   }, {});

//   // Find all films with “Drama” and sort them by release year.
//   let allDramaFilms = films
//     .filter((film) => film.genres.includes("Drama"))
//     .sort((a, b) => a.year - b.year);
//   console.log("allDramaFilms", allDramaFilms);

//   // Find the average rating of each director’s films.
//   let avgRatingDirector = films.reduce((acc, film) => {
//     (acc + film.rating, 0) / films.length;
//   });

//   // (1. Basic Access and Transformations)
//   // Retrieve the title and box office earnings for each film.
//   let titleAndBoxOffice = newFilms.map((film) => ({
//     title: film.title,
//     boxOffice: film.production.boxOffice,
//   }));

//   // Get an array of all directors’ names.
//   let allNames = newFilms.map((film) => film.director);

//   // Extract the cast names for each film as a nested array.
//   let castNames = newFilms.map((film) => film.cast.map((cast) => cast.name));
//   console.log("castNames", castNames);

//   // Create an array of all unique genres across all films.
//   let uniqueGenresNew = [...new Set(newFilms.map((film) => film.genres))];

//   // 3.Filtering and Mapping
//   // Get all films released after the year 2000.
//   let releasedAfter2000 = newFilms.filter((film) => film.year > 2000);

//   // Create an array of titles for films that have a rating above 8.5.
//   let titles = newFilms
//     .filter((film) => film.rating > 8.5)
//     .map((film) => film.title);

//   // Filter all films to return only those with a “Drama” genre.
//   let dramaMovies = newFilms.filter((film) => film.genres.includes("Drama"));

//   // Create an array of all actors’ names, without duplicates.
//   let allUniqueActorNames = [
//     ...new Set(newFilms.flatMap((film) => film.cast.map((name) => name.name))),
//   ];

//   // Retrieve an array of all films with a box office greater than $500 million.
//   let boxOfficeFilms = newFilms.filter(
//     (film) => film.production.boxOffice > 500
//   );

//   // 4. Sorting and Ordering
//   // Sort the films by release year, oldest to newest.
//   let sortFilmsByYear = newFilms.sort((a, b) => a.year - b.year);

//   // Sort the films by rating in descending order.
//   let sortByRating = newFilms.sort((a, b) => b.rating - a.rating);

//   // Sort the films alphabetically by title.
//   let sortByTilte = newFilms.sort((a, b) => a.title.localeCompare(b.title));

//   // Sort the actors in each film by their names.
//   let sortedActorsInFilm = films.map((film) => ({
//     ...film,
//     cast: film.cast.sort((a, b) => a.name.localeCompare(b.name)),
//   }));

//   // Sort the genres in each film alphabetically.
//   let sortGenreInEachFilm = newFilms.map((film) => ({
//     ...film,
//     genres: [...film.genres].sort(),
//   }));

//   // 5. Nested Array Manipulations
//   // Retrieve all actors who have won an “Oscar” award.

//   // Create an array of objects containing each actor’s name and all their roles.
//   let actorRoles = {};
//   films.forEach((film) => {
//     film.cast.forEach((actor) => {
//       actorRoles[actor.name] = actorRoles[actor.name] || [];
//       actorRoles[actor.name].push(actor.role);
//     });
//   });

//   return (
//     <div>
//       <h1></h1>
//     </div>
//   );
// };

const Test = () => {
  const totalBoxOfficeRevenue = newFilms.reduce(
    (acc, film) => acc + film.production.boxOffice,
    0
  );

  const avgRatingOfAllFilms =
    newFilms.reduce((acc, film) => acc + film.rating, 0) / newFilms.length;

  const genreCount = newFilms.reduce((acc, film) => {
    film.genres.forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });
    return acc;
  }, {});

  const mostAwardsActor = newFilms.reduce((acc, film) => {
    film.cast.forEach((cast) => {
      const awardsLength = cast.awards.length;
      if (acc[cast.name]) {
        acc[cast.name] += awardsLength;
      } else {
        acc[cast.name] = awardsLength;
      }
    });
    return acc;
  }, {});

  const actorWithMostAwards = Object.keys(mostAwardsActor).reduce((a, b) =>
    mostAwardsActor[a] > mostAwardsActor[b] ? a : b
  );

  const titleAndBoxOfficeRatio = newFilms.map((film) => ({
    title: film.title,
    ratio: Math.round(film.production.boxOffice / film.production.budget),
  }));

  const groupByDirectors = newFilms.reduce((acc, film) => {
    acc[film.director] = acc[film.director] || [];
    acc[film.director].push(film);
    return acc;
  }, []);

  const allAwards = [
    ...new Set(
      newFilms.flatMap((film) =>
        film.cast.flatMap((award) =>
          award.awards.flatMap((name) => name.awardName)
        )
      )
    ),
  ];

  const uniqueProductionStudios = [
    ...new Set(newFilms.flatMap((film) => film.production.studios)),
  ];

  const uniqueGenres = [...new Set(newFilms.flatMap((film) => film.genres))];

  const actorsWithMultipleAwards = newFilms
    .flatMap((film) => film.cast)
    .filter((actor) => actor.awards.length > 1)
    .map((actor) => actor.name);

  const sciFiFilms = newFilms.filter((film) => film.genres.includes("Sci-Fi"));
  const avgBudgetOfScifiFilms =
    sciFiFilms.reduce((acc, film) => acc + film.production.budget, 0) /
    sciFiFilms.length;

  const uniqueActorNames = [
    ...new Set(newFilms.flatMap((film) => film.cast.map((cast) => cast.name))),
  ].sort();

  const groupFimsByDecade = newFilms.reduce((acc, film) => {
    const decade = Math.floor(film.year / 10) * 10;
    acc[decade] = acc[decade] || [];
    acc[decade].push(film);
    return acc;
  }, {});

  // const avgRatingOfFilmsByDecade =
  //   groupFimsByDecade?.reduce((acc, film) => acc + film.rating, 0) /
  //   groupFimsByDecade.length;

  const newRating = newFilms
    .filter((film) => film.rating > 8.7)
    .map((film) => film.title);

  const groupFilmsByDirector = newFilms.reduce((acc, film) => {
    acc[film.director] = acc[film.director] || [];
    acc[film.director].push(film.title);
    return acc;
  }, {});

  const totalBoxOfficeRevenueNew = newFilms.reduce(
    (acc, film) => acc + film.production.boxOffice,
    0
  );

  const atleastOneAwardNew = newFilms.flatMap((film) =>
    film.cast.filter((award) => award.awards.length > 0)
  );

  const filmsWithAllAwards = newFilms
    .filter((film) => film.cast.every((actor) => actor.awards.length > 0))
    .map((film) => film.title);

  const actorsWithAtleastOneAward = [
    ...new Set(atleastOneAwardNew.map((film) => film.name)),
  ].sort();

  const filmsAbove8 = newFilms.filter((film) => film.rating > 8);
  const groupByYear = filmsAbove8.reduce((acc, film) => {
    acc[film.year] = acc[film.year] || [];
    acc[film.year].push(film.title);
    return acc;
  }, {});

  // Coding exercise

  const nolanFilms = newFilms.filter(
    (film) => film.director === "Christopher Nolan" && film.rating > 8.5
  );

  const groupByGenre = newFilms.reduce((acc, film) => {
    film.genres.forEach((genre) => {
      acc[genre] = acc[genre] || [];
      acc[genre].push(film);
    });
    return acc;
  }, {});

  const oscarActors = newFilms
    .filter((film) => film.cast.some((actor) => actor.awards.includes("Oscar")))
    .flatMap((film) =>
      film.cast
        .filter((actor) => actor.awards.includes("Oscar"))
        .map((actor) => ({ name: actor.name, film: film.title }))
    );

  const avgRatingByDirector = newFilms.reduce((acc, film) => {
    const director = film.director;
    if (!acc[director]) {
      acc[director] = { totalRating: 0, count: 0, avgRating: 0 };
    }

    acc[director].totalRating += film.rating;
    acc[director].count += 1;

    acc[director].avgRating = Math.round(
      acc[director].totalRating / acc[director].count
    );

    return acc;
  }, {});

  const totalRevenueByDecade = newFilms.reduce((acc, film) => {
    const decade = Math.floor(film.year / 10) * 10;
    if (!acc[decade]) {
      acc[decade] = { totalBoxOfficeRevenue: 0 };
    }

    acc[decade].totalBoxOfficeRevenue += film.production.boxOffice;

    return acc;
  }, {});

  const avgBudgetByGenre = newFilms.reduce((acc, film) => {
    film.genres.forEach((genre) => {
      const filmGenre = genre;

      if (!acc[filmGenre]) {
        acc[filmGenre] = { totalBudget: 0, count: 0, avgBudget: 0 };
      }

      acc[filmGenre].totalBudget += film.production.budget;
      acc[filmGenre].count += 1;
      acc[filmGenre].avgBudget = Math.round(
        acc[filmGenre].totalBudget / acc[filmGenre].count
      );
    });
    return acc;
  }, {});

  const noOfFilmsInGenre = newFilms.reduce((acc, film) => {
    film.genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = { count: 0 };
      }

      acc[genre].count += 1;
    });

    return acc;
  }, {});

  const allUniqueStudios = [
    ...new Set(newFilms.flatMap((film) => film.production.studios)),
  ];

  const allCastMembers = newFilms.flatMap((cast) =>
    cast.cast.map((name) => name.name)
  );

  // 10
  const groupFilmsByCastAward = newFilms.reduce((acc, film) => {
    const hasAwardWinningCast = film.cast.some(
      (award) => award.awards.length > 0
    );

    const key = hasAwardWinningCast ? "awardWinning" : "nonAwardWinning";

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(film);

    return acc;
  }, {});

  // 12
  const filmsSummary = newFilms.reduce((acc, film) => {
    const decade = Math.floor(film.year / 10) * 10;
    if (!acc[decade]) {
      acc[decade] = {
        titles: [],
        count: 0,
        totalRating: 0,
        averageRating: 0,
        totalBoxOffice: 0,
      };
    }
    acc[decade].titles.push(film.title);
    acc[decade].count += 1;
    acc[decade].totalRating += film.rating;
    acc[decade].averageRating = Math.round(
      acc[decade].totalRating / acc[decade].count
    );
    acc[decade].totalBoxOffice += film.production.boxOffice;

    return acc;
  }, {});

  // 13
  const allFilmsWithAwards = newFilms.every((film) =>
    film.cast.some((member) => member.awards.length > 0)
  );

  // 14 Find Highest Box Office Film for Each Genre
  const highestBoxOfficeFilmGenre = newFilms.reduce((acc, film) => {
    film.genres.forEach((genre) => {
      if (
        !acc[genre] ||
        film.production.boxOffice > acc[genre].production.boxOffice
      ) {
        acc[genre] = film;
      }
    });

    return acc;
  }, {});

  // 15 Get a List of All Awards Won by a Specific Actor
  const getAllAwardsOfActor = newFilms
    .flatMap((film) => film.cast)
    .filter((actor) => actor.name.includes("Leonardo DiCaprio"))
    .flatMap((actor) => actor.awards);
  // const getAllAwardsOfActorNew = newFilms.

  // 16
  const roleNames = newFilms.reduce((acc, film) => {
    film.cast.forEach((actor) => {
      if (!acc[actor.role]) {
        acc[actor.role] = { count: 0 };
      }
      acc[actor.role].count += 1;
    });

    return acc;
  }, {});

  // 17
  const totalBudgetStudio = newFilms.reduce((acc, film) => {
    film.production.studios.forEach((studio) => {
      if (!acc[studio]) {
        acc[studio] = { totalBudget: 0 };
      }

      acc[studio].totalBudget += film.production.budget;
    });

    return acc;
  }, {});

  // 18 Flatten Awards Won by Year
  const flattenAwardsByYear = newFilms.flatMap((film) =>
    film.cast.flatMap((actor) =>
      actor.awards.map((award) => ({
        year: film.year,
        film: film.title,
        actor: actor.name,
        award: award,
      }))
    )
  );

  // 19 Top N Films by Box Office Revenue
  const top3Films = newFilms
    .sort((a, b) => b.production.boxOffice - a.production.boxOffice)
    .slice(0, 3);

  // 20 Total Awards Won by All Cast Members Across Films
  const totalAwardsByCastMembers = newFilms.reduce((acc, film) => {
    if (!acc[film.title]) {
      acc[film.title] = { totalAwards: 0 };
    }

    acc[film.title].totalAwards += film.cast.flatMap((awards) => awards.length);

    return acc;
  }, {});

  // 21 Count Genres per Director
  const genresPerDirector = newFilms.reduce((acc, film) => {
    const director = film.director;

    if (!acc[director]) {
      acc[director] = {};
    }

    film.genres.forEach((genre) => {
      if (!acc[director][genre]) {
        acc[director][genre] = 0;
      }

      acc[director][genre] += 1;
    });

    return acc;
  }, {});

  // 22 Calculate Total Production Cost vs. Revenue for Each Decade
  const eachDecade = newFilms.reduce((acc, film) => {
    const decade = Math.floor(film.year / 10) * 10;

    if (!acc[decade]) {
      acc[decade] = { totalCost: 0, totalRevenue: 0, netProfitLoss: 0 };
    }

    acc[decade].totalCost += film.production.budget;
    acc[decade].totalRevenue += film.production.boxOffice;

    acc[decade].netProfitLoss =
      acc[decade].totalRevenue - acc[decade].totalCost;

    return acc;
  }, {});

  // 23 Find Top Rated Film in Each Decade
  const topRatedFilmByDecade = newFilms.reduce((acc, film) => {
    const decade = Math.floor(film.year / 10) * 10;

    if (!acc[decade] || film.rating > acc[decade].rating) {
      acc[decade] = { title: film.title, rating: film.rating };
    }

    return acc;
  }, {});

  // 25 Actors with Awards Sorted by Count
  const actorAwards = newFilms.reduce((acc, film) => {
    film.cast.forEach((cast) => {
      if (!acc[cast.name]) {
        acc[cast.name] = { awardsCount: 0 };
      }

      acc[cast.name].awardsCount += cast.awards.length;
    });

    return acc;
  }, {});

  // 26 Calculate Average Rating of Award-Winning Films Only
  const awardWinningFilms = newFilms.filter((film) =>
    film.cast.some((cast) => cast.awards.length > 0)
  );

  // 27 Highest Rated Film by Each Director
  const highestRatedFilmByDirector = newFilms.reduce((acc, film) => {
    const director = film.director;

    if (!acc[director] || film.rating > acc[director].rating) {
      acc[director] = film;
    }
    return acc;
  }, {});

  const avgRatingOfAwardWinningFilms =
    awardWinningFilms.length > 0
      ? Math.round(
          awardWinningFilms.reduce((acc, film) => acc + film.rating, 0) /
            awardWinningFilms.length
        )
      : 0;

  console.log(
    "awardWinningFilms",
    awardWinningFilms,
    "avgRatingOfAwardWinningFilms",
    avgRatingOfAwardWinningFilms
  );

  // 28 Number of Unique Genres
  const uniqueGenresNew = [...new Set(newFilms.flatMap((film) => film.genres))];

  // 29 Directors with Highest Average Box Office Revenue

  const directorsWithHighestAvgBoxOffice = newFilms.reduce((acc, film) => {
    const director = film?.director;
    if (!acc[director]) {
      acc[director] = { count: 0, totalBoxOffice: 0, avgBoxOffice: 0 };
    }

    acc[director].count += 1;
    acc[director].totalBoxOffice += film.production.boxOffice;
    acc[director].avgBoxOffice = Math.round(
      acc[director].totalBoxOffice / acc[director].count
    );

    return acc;
  }, {});

  // 30 Total Awards by Genre

  const totalAwardsByGenre = newFilms.reduce((acc, film) => {
    film.genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = { totalAwards: 0 };
      }

      const awardsCount = film.cast
        .map((award) => award.awards.length)
        .reduce((acc, film) => acc + film, 0);

      acc[genre].totalAwards += awardsCount;
    });

    return acc;
  }, {});

  // Objects coding exercises
  // 2)

  const films = [{ title: "Inception", rating: 8.8 }];

  const updateFilmRating = (films, title, rating) => {
    return films.map((film) => {
      if (film.title === title) {
        return {
          ...film,
          rating: rating,
        };
      }
    });
  };

  const updatedFilms = updateFilmRating(films, "Inception", 9.0);

  console.log("updatedFilms", updatedFilms);

  // 6. Advanced Functional Programming with Arrays
  // a) Chaining Methods
  const getTopRatedFilms = newFilms
    .filter((film) => film.rating > 8.0)
    .map((film) => film.title)
    .sort();

  // 5. Array Manipulation with Objects

  console.log("getTopRatedFilms", getTopRatedFilms);
};

export default Test;
