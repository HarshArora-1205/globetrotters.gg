"use client";

import { FiAlertTriangle } from "react-icons/fi";
import { useSearchParams } from 'next/navigation'

const Errorbox = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error');

  if (!error) {
    return null;
  }

  return (
    <div className="flex bg-red-200 border border-destructive p-5 items-center justify-center gap-4 text-destructive">
      <FiAlertTriangle className="h-6 w-6" />
      {error === "OAuthAccountNotLinked" 
        ? <span>Trrr Trrrr! You used a different provider to sign up!</span>
        : <span>Trrr Trrrr! Something&apos;s off—try again!</span>
      }
    </div>
  );
};

export default Errorbox;
