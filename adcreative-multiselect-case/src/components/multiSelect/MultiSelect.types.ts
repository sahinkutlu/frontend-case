export interface MultiSelectProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  options: MultiSelectOption[];
  loading: boolean;
  error: any;
  selectedOptions: MultiSelectOption[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<MultiSelectOption[]>>;
}

export interface MultiSelectOption {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface MultiSelectState {
  options: MultiSelectOption[];
  loading: boolean;
  error: any;
  selectedOptions: MultiSelectOption[];
  menuExpanded: boolean;
  searchText: string;
}
