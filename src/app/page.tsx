import React from 'react';

const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center  pt-24 bg-transparent">
            <h1 className="text-4xl font-bold text-white ">Welcome to Chefs Choice!</h1>
            <p className="mt-4 text-lg text-white">Explore our delicious foods and find your next favorite dish.</p>
        </div>
    );
};

export default Welcome;