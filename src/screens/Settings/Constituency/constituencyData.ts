interface Areacode {
  code: string;
  areas: string[];
}

export interface Constituency {
  name: string;
  uuid: string;
  number: string;
  areacodes: Areacode[];
}
