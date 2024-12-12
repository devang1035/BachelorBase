import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing, onDelete, onEdit }) => {
  const { user } = useAuth();
  const isOwner = user?.id === listing.ownerId;

  return (
    <Link to={`/listings/${listing._id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img 
          src={listing.image || 'default-property-image.jpg'} 
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
          <p className="text-gray-600 mb-2">{listing.location}</p>
          <p className="text-gray-800 font-bold">₹{listing.price}</p>
          
          <div className="mt-2">
            <h4 className="font-semibold">Amenities:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {listing.aminites.map((amenity, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {isOwner && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onEdit(listing)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(listing._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;