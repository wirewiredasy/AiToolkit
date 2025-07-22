import { Link } from 'wouter';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function BreadcrumbNav({ items, className = "" }: BreadcrumbNavProps) {
  return (
    <nav className={`flex mb-8 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="text-neutral-400 mr-4">/</span>
            )}
            {item.href ? (
              <Link href={item.href} className="text-neutral-600 hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-800 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
