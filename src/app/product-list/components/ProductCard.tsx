import React, { useState } from "react";

interface ProductCardProps {
  name: string;
  description: string;
  imageUrl?: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  imageUrl,
  price,
}) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const handleError = () => {
    setImageFailed(true);
  };

  return (
    <div className="max-w-lg bg-white rounded-lg shadow-md p-4 flex items-center">
      {imageUrl && !imageFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          onError={handleError}
          alt={name}
          className="w-16 h-16 object-cover rounded-full mr-4"
        />
      ) : (
        <div
          className="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full mr-4 text-xs"
        >
          No Image
        </div>
      )}

      <div>
        <h2 className="text-black text-lg font-semibold mb-1">{name}</h2>
        <p className="text-gray-500 mb-1">{description}</p>
        <p className="text-gray-700 font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
