import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterBarProps {
  timePeriod: string;
  onTimePeriodChange: (v: string) => void;
  region?: string;
  onRegionChange?: (v: string) => void;
  product?: string;
  onProductChange?: (v: string) => void;
  regions?: string[];
  products?: string[];
}

const TIME_PERIODS = ['Last 7 Days', 'Last 30 Days', 'Last Quarter', 'Last Year', 'All Time'];

export function FilterBar({ timePeriod, onTimePeriodChange, region, onRegionChange, product, onProductChange, regions, products }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Select value={timePeriod} onValueChange={onTimePeriodChange}>
        <SelectTrigger className="w-[160px] bg-secondary border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TIME_PERIODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
        </SelectContent>
      </Select>

      {regions && onRegionChange && (
        <Select value={region || 'all'} onValueChange={onRegionChange}>
          <SelectTrigger className="w-[160px] bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
      )}

      {products && onProductChange && (
        <Select value={product || 'all'} onValueChange={onProductChange}>
          <SelectTrigger className="w-[160px] bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {products.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
