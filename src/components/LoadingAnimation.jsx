import Lottie from 'lottie-react';
import loadingAnimation from '../animations/loading.json';

export function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-32 h-32">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
} 