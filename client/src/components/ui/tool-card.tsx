import { Link } from 'wouter';
import { Card, CardContent } from './card';
import { getColorClasses } from '@/lib/tools';
import ToolIcon from './tool-icon';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  toolCount?: number;
  usageCount?: string;
  isToolkit?: boolean;
  popularTools?: string[];
}

export default function ToolCard({
  id,
  name,
  description,
  icon,
  route,
  color,
  toolCount,
  usageCount,
  isToolkit = false,
  popularTools = []
}: ToolCardProps) {
  const colorClasses = getColorClasses(color);

  return (
    <Link href={route}>
      <Card className={`tool-card cursor-pointer border-2 border-neutral-200 ${colorClasses.hover} h-full`}>
        <CardContent className="p-6">
          <div className={`w-16 h-16 ${colorClasses.bg} rounded-xl flex items-center justify-center mb-6`}>
            <ToolIcon toolId={id} className={`${colorClasses.text}`} size="lg" />
          </div>
          
          <h3 className="text-xl font-bold text-neutral-800 mb-3">{name}</h3>
          <p className="text-neutral-600 mb-4 line-clamp-3">{description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">
              {isToolkit ? `${toolCount} Tools` : usageCount}
            </span>
            <ArrowRight className={`w-5 h-5 ${colorClasses.text}`} />
          </div>
          
          {isToolkit && popularTools.length > 0 && (
            <div className="pt-4 border-t border-neutral-100">
              <div className="text-sm text-neutral-500 mb-2">Popular tools:</div>
              <div className="flex flex-wrap gap-1">
                {popularTools.map((tool, index) => (
                  <span key={index} className="px-2 py-1 bg-neutral-100 text-xs rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
