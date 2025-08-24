// components/Loader.jsx
'use client';
import { Oval } from 'react-loader-spinner';

export default function Loader({ size = 40, color = "#0c0c0cff" }) {
    return (
        <div className="absolute inset-0 bg-black/10 flex justify-center items-center z-50">
            <Oval
                height={size}
                width={size}
                color={color}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="loading"
                secondaryColor="#CBD5E1"
                strokeWidth={5}
                strokeWidthSecondary={2}
            />
        </div>
    );
}
