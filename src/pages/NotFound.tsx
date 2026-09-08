import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <span className="not-found__code">404</span>

        <h1>Page not found.</h1>

        <p>The page you’re looking for doesn’t exist or has been moved.</p>

        <Link to="/" className="not-found__link">
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
