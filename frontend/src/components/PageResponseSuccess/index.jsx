import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PageResponseSuccess () {
  const navigate = useNavigate();

  const [go, setGo] = useState(false);

  const pid = useParams().listingId;

  setTimeout(() => {
    setGo(true);
  }, 3000);

  useEffect(() => {
    if (go) {
      if (pid) navigate(`/property/${pid}`);
      else navigate('/');
    }
  }, [go])

  return (
    <>
      <h1>Action Succeeded!</h1>
      <p>redirect in 3 seconds...</p>
    </>
  )
}

export default PageResponseSuccess;
