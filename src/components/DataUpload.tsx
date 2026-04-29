import { useState, useRef } from 'react';
import { useData } from '@/contexts/DataContext';
import { Upload, FileSpreadsheet, MessageSquare, Check, AlertCircle, RotateCcw } from 'lucide-react';

export function DataUpload() {
  const { uploadFinancialData, uploadSentimentData, isUploaded, uploadFileName, resetToDefaults } = useData();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const finRef = useRef<HTMLInputElement>(null);
  const sentRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File, type: 'financial' | 'sentiment') => {
    setUploading(true);
    setResult(null);
    const res = type === 'financial'
      ? await uploadFinancialData(file)
      : await uploadSentimentData(file);
    setUploading(false);
    setResult(res.success
      ? { type: 'success', msg: `${file.name} uploaded successfully! Dashboard updated.` }
      : { type: 'error', msg: res.error || 'Upload failed' });
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-sm flex items-center gap-2">
          <Upload className="w-4 h-4 text-primary" />
          Upload Business Data
        </h3>
        {isUploaded && (
          <button onClick={resetToDefaults} className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="w-3 h-3" /> Reset to Demo
          </button>
        )}
      </div>

      {isUploaded && (
        <div className="mb-3 p-2 rounded-lg bg-primary/10 text-xs text-primary flex items-center gap-2">
          <Check className="w-3 h-3" />
          Using uploaded data: {uploadFileName}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input ref={finRef} type="file" accept=".csv,.xlsx,.xls,.txt" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'financial')} />
        <button
          onClick={() => finRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
        >
          <FileSpreadsheet className="w-8 h-8 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium">Financial Data</p>
            <p className="text-xs text-muted-foreground">CSV / Excel with revenue, expenses</p>
          </div>
        </button>

        <input ref={sentRef} type="file" accept=".csv,.xlsx,.xls,.txt" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'sentiment')} />
        <button
          onClick={() => sentRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
        >
          <MessageSquare className="w-8 h-8 text-primary shrink-0" />
          <div>
            <p className="text-sm font-medium">Sentiment Data</p>
            <p className="text-xs text-muted-foreground">CSV / text with sentiment labels</p>
          </div>
        </button>
      </div>

      {uploading && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          Processing file...
        </div>
      )}

      {result && (
        <div className={`mt-3 p-2 rounded-lg text-xs flex items-center gap-2 ${result.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {result.type === 'success' ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
          {result.msg}
        </div>
      )}
    </div>
  );
}
