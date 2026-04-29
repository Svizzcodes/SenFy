import { Bell, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useState } from 'react';
import type { Alert } from '@/data/mockData';
import { INITIAL_ALERTS } from '@/data/mockData';

export function AlertPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [isOpen, setIsOpen] = useState(false);

  const dismiss = (id: string) => setAlerts(prev => prev.filter(a => a.id !== id));
  const dangerCount = alerts.filter(a => a.type === 'danger').length;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
        <Bell className="w-5 h-5 text-muted-foreground" />
        {alerts.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold animate-pulse-glow">
            {alerts.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-96 max-h-[70vh] overflow-auto glass-card z-50 p-0 shadow-xl">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">Alerts</h3>
              {dangerCount > 0 && <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">{dangerCount} critical</span>}
            </div>
            {alerts.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground text-center">No alerts</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="p-3 border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start gap-2">
                    {alert.type === 'danger' && <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />}
                    {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-accent mt-0.5 shrink-0" />}
                    {alert.type === 'info' && <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <button onClick={() => dismiss(alert.id)} className="p-0.5 hover:bg-secondary rounded"><X className="w-3 h-3 text-muted-foreground" /></button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-muted-foreground">{alert.timestamp}</span>
                        {alert.value && (
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${alert.type === 'danger' ? 'bg-destructive/20 text-destructive' : alert.type === 'warning' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
                            {alert.metric}: {alert.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
