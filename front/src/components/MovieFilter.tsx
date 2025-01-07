import {
  SortMovieField,
  OrderByField,
  MinRatingField,
  GenreField,
} from '../../shared/enum';

type MovieFilterSelectsProps = {
  onSortFieldChange: (field: SortMovieField) => void;
  onOrderChange: (order: OrderByField) => void;
  onMinRatingChange: (rating: MinRatingField) => void;
  onGenreChange: (genre: GenreField) => void;
  desktop: boolean;
};

const MovieFilterSelects = ({
  onSortFieldChange,
  onOrderChange,
  onMinRatingChange,
  onGenreChange,
  desktop,
}: MovieFilterSelectsProps) => {
  const styles = desktop === true ? 'hidden md:flex' : 'flex md:hidden';
  return (
    <div className={`flex-col md:flex-row gap-y-4 gap-x-32  ${styles}`}>
      {/* Genre Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => onGenreChange(e.target.value as GenreField)}>
        {Object.values(GenreField).map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {/* Sort Movie Field Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => onSortFieldChange(e.target.value as SortMovieField)}>
        {Object.values(SortMovieField).map((field) => (
          <option key={field} value={field}>
            {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
          </option>
        ))}
      </select>

      {/* Order By Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => onOrderChange(e.target.value as OrderByField)}>
        {Object.values(OrderByField).map((order) => (
          <option key={order} value={order}>
            {order.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Minimum Rating Select */}
      <select
        className="bg-mainBlack p-2 border-2 border-red-600"
        onChange={(e) => onMinRatingChange(e.target.value as MinRatingField)}>
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
