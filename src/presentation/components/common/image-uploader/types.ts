export interface ImageUploaderProps {
  file?: string | null;
  onSelect: (uri: string) => void;
  onClear: () => void;
  placeholder?: string;
}
