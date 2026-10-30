import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="eyebrow">404 / NO MATCHING ROUTE</span>
      <h1>A little off the path.</h1>
      <p>
        The page you’re looking for isn’t here. There’s plenty to explore back at the portfolio.
      </p>
      <Link to="/" className="button button-primary">
        <ArrowLeft size={16} /> Back to the portfolio
      </Link>
    </div>
  );
}
