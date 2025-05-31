import React from 'react';
import Image from 'next/image';

const HistoryVideos = () => {
  return (
    <div className="space-y-4">
      {/* Video 1 */}
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-18">
          <Image
            src="https://via.placeholder.com/128x96"
            alt="Video thumbnail"
            width={64}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium">Video Title 1</h3>
          <p className="text-xs text-gray-500">Channel Name • 1 day ago</p>
        </div>
      </div>

      {/* Video 2 */}
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-18">
          <Image
            src="https://via.placeholder.com/128x96"
            alt="Video thumbnail"
            width={64}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium">Video Title 2</h3>
          <p className="text-xs text-gray-500">Channel Name • 3 days ago</p>
        </div>
      </div>

      {/* Video 3 */}
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-18">
          <Image
            src="https://via.placeholder.com/128x96"
            alt="Video thumbnail"
            width={64}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium">Video Title 3</h3>
          <p className="text-xs text-gray-500">Channel Name • 1 week ago</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryVideos;