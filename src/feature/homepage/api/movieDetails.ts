import axios from 'axios'
import type { LoaderFunctionArgs } from 'react-router-dom'
import type { ApiMovie } from '../interfaces/homepage.interfaces'
import { formatDuration } from './common'

export async function movieDetailsLoader({ params }: LoaderFunctionArgs) {
  const { movieId } = params
  const response = await axios.get<ApiMovie>(`http://localhost:4000/movies/${movieId}`).then(res => res.data)

return {
    id: response.id.toString(),
    image: response.poster_path,
    name: response.title,
    releasedYear: response.release_date,
    genres: response.genres,
    url: "",
    details: {
      rating: response.vote_average.toString(),
      duration: formatDuration(response.runtime),
      description: response.overview,
    },
  };
}