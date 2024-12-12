import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';

const ListingDetail = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListingDetail = async () => {
      try {
        const response = await api.get(`/listings/${id}`);
        setListing(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch listing details');
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetail();
  }, [id]);

  const handleContact = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/listings/${id}` } });
      return;
    }
    // Add contact functionality here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-96">
          {listing?.image ? (
            <img
              src={Array.isArray(listing.image) ? listing.image[0] : listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Listing Details */}
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {listing.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {listing.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">
                ₹{listing.price}/month
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {listing.aminites?.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-700"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Owner Info */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">Property Owner</h2>
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-3">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900">
                  {listing.ownerId?.name}
                </p>
                <p className="text-sm text-gray-600">
                 Email: {listing.ownerId?.email}
               </p>
               <p className="text-sm text-gray-600">
                 Phone: {listing.ownerId?.contact || 'Not provided'}
               </p>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          {user?.role === 'renter' && (
            <div className="mt-8">
              <button
                onClick={handleContact}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Contact Owner
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;