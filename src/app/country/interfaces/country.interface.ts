//https://restcountries.com/v3.1/region/americas?fields=cca3,name,borders
export interface Country {
  name:    Name;
  cca3:    string;
  borders: string[];
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common:   string;
}
