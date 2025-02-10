import { useEffect, useState } from 'react';

function Click() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="body">
      <div>
        <p>ewrgwer</p>
      </div>
      <div>wergwe</div>
      <div>
        <p>ewrgerg</p>
      </div>
    </div>
  );
}

export default Click;