import {
  SortMovieField,
  OrderByField,
  MinRatingField,
  GenreField,
} from '../../shared/enum'; // Update path as needed

const MovieFilterSelects = ({
  onSortFieldChange,
  onOrderChange,
  onMinRatingChange,
  onGenreChange,
  resetPage
}) => {
  return (
    <div className="flex gap-x-32">
      {/* Genre Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => {resetPage; onGenreChange(e.target.value as GenreField)}}>
        {Object.values(GenreField).map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {/* Sort Movie Field Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => {resetPage;onSortFieldChange(e.target.value as SortMovieField)}}>
        {Object.values(SortMovieField).map((field) => (
          <option key={field} value={field}>
            {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
          </option>
        ))}
      </select>

      {/* Order By Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => {resetPage; onOrderChange(e.target.value as OrderByField)}}>
        {Object.values(OrderByField).map((order) => (
          <option key={order} value={order}>
            {order.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Minimum Rating Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => {resetPage; onMinRatingChange(e.target.value as MinRatingField)}}>
        {Object.values(MinRatingField).map((rating) => (
          <option key={rating} value={rating}>
            {rating} +
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieFilterSelects;
